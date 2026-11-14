# backend/main.py
from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
import joblib
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Literal
import pandas as pd
import numpy as np
import io
import json
import os
from dotenv import load_dotenv
load_dotenv(Path(__file__).resolve().parent / ".env")

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

MAX_FILE_SIZE = 50 * 1024 * 1024


# Required model features
FEATURES = [
    "distance_from_home",
    "distance_from_last_transaction",
    "ratio_to_median_purchase_price",
    "repeat_retailer",
    "used_chip",
    "used_pin_number",
    "online_order"
]


# Manual prediction input
class TransactionInput(BaseModel):
    distance_from_home: float = Field(ge=0)
    distance_from_last_transaction: float = Field(ge=0)
    ratio_to_median_purchase_price: float = Field(ge=0)

    repeat_retailer: Literal[0, 1]
    used_chip: Literal[0, 1]
    used_pin_number: Literal[0, 1]
    online_order: Literal[0, 1]

    threshold: float = Field(default=0.30, ge=0.05, le=0.95)

class LoginInput(BaseModel):
    username: str
    password: str


# Load model
MODEL_PATH = (
    Path(__file__).resolve().parent.parent
    / "fraud_detection_model.pkl"
)

model = joblib.load(MODEL_PATH)


# FastAPI application
app = FastAPI(title="Credit Card Fraud Detection API")


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://credit-card-fraud-detection-alpha-five.vercel.app"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/login")
def login(data: LoginInput):

    if not ADMIN_USERNAME or not ADMIN_PASSWORD:
        raise HTTPException(
            status_code=500,
            detail="Admin credentials are not configured."
        )

    if (
        data.username != ADMIN_USERNAME
        or data.password != ADMIN_PASSWORD
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password."
        )

    return {
        "success": True,
        "message": "Login successful."
    }

@app.get("/")
def home():
    return {"message": "Fraud Detection API is running"}


@app.get("/model-info")
def model_info():
    return {
        "model_loaded": model is not None,
        "model_type": type(model).__name__,
        "features": list(model.feature_names_in_)
    }


# Manual prediction
@app.post("/predict")
def predict(data: TransactionInput):

    transaction = data.model_dump()

    input_data = pd.DataFrame(
        [
            {
                feature: transaction[feature]
                for feature in FEATURES
            }
        ],
        columns=FEATURES
    )

    threshold = transaction["threshold"]

    probability = model.predict_proba(input_data)[0][1]

    prediction = int(probability >= threshold)

    return {
        "prediction": prediction,
        "label": "Fraud" if prediction == 1 else "Legitimate",
        "fraud_probability": float(probability),
        "threshold": threshold
    }


# Bulk CSV prediction
@app.post("/predict-csv")
async def predict_csv(
    file: UploadFile = File(...),
    threshold: float = Form(default=0.30, ge=0.05, le=0.95)
):
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed."
        )

    contents = await file.read(MAX_FILE_SIZE + 1)

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File size exceeds 50 MB limit."
        )

    try:
        df = pd.read_csv(io.BytesIO(contents))
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid CSV file."
        )

    FEATURES = [
        "distance_from_home",
        "distance_from_last_transaction",
        "ratio_to_median_purchase_price",
        "repeat_retailer",
        "used_chip",
        "used_pin_number",
        "online_order"
    ]

    missing_columns = [
        col for col in FEATURES if col not in df.columns
    ]

    if missing_columns:
        raise HTTPException(
            status_code=400,
            detail=f"Missing columns: {missing_columns}"
        )

    if df.empty:
        raise HTTPException(
            status_code=400,
            detail="CSV file contains no transactions."
        )

    df = df[FEATURES].copy()

    try:
        df = df.apply(pd.to_numeric, errors="raise")
    except (ValueError, TypeError):
        raise HTTPException(
            status_code=400,
            detail="CSV contains invalid or non-numeric values."
        )

    if df.isnull().any().any():
        raise HTTPException(
            status_code=400,
            detail="CSV contains empty values."
        )

    numeric_features = [
        "distance_from_home",
        "distance_from_last_transaction",
        "ratio_to_median_purchase_price"
    ]

    if (df[numeric_features] < 0).any().any():
        raise HTTPException(
            status_code=400,
            detail="Distance and purchase ratio values cannot be negative."
        )

    binary_features = [
        "repeat_retailer",
        "used_chip",
        "used_pin_number",
        "online_order"
    ]

    for col in binary_features:
        if not df[col].isin([0, 1]).all():
            raise HTTPException(
                status_code=400,
                detail=f"{col} must contain only 0 or 1."
            )

    probabilities = model.predict_proba(df)[..., 1]

    predictions = (probabilities >= threshold).astype(int)

    df["fraud_probability"] = probabilities
    df["label"] = [
        "Fraud" if prediction == 1 else "Legitimate"
        for prediction in predictions
    ]

    results = json.loads(
        df.to_json(orient="records")
    )

    fraud_count = int(predictions.sum())
    total = len(predictions)

    return {
        "total_transactions": total,
        "fraud_count": fraud_count,
        "legitimate_count": total - fraud_count,
        "threshold": threshold,
        "results": results
    }
