# Credit Card Fraud Detection

A Machine Learning based web application that detects potentially fraudulent credit card transactions using Logistic Regression.

The project uses a React frontend and FastAPI backend. Users can enter transaction details manually or upload a CSV file to receive fraud predictions.

## Features

- Manual transaction fraud prediction
- CSV file upload for batch predictions
- Fraud probability calculation
- Adjustable classification threshold
- Fraud and legitimate transaction classification
- Input validation and error handling
- Interactive dashboard

## Technology Stack

### Machine Learning
- Python
- Pandas
- NumPy
- Scikit-learn
- Logistic Regression
- StandardScaler
- Joblib

### Backend
- FastAPI
- Uvicorn
- Pydantic


### Frontend
- React
- Vite
- JavaScript
- Tailwind CSS
- Lucide React


## Machine Learning Workflow

1. Load and understand the dataset.
2. Perform Exploratory Data Analysis (EDA).
3. Analyze fraud and legitimate transaction patterns.
4. Select relevant features.
5. Split data into training and testing sets.
6. Apply StandardScaler using a Scikit-learn Pipeline.
7. Train a Logistic Regression classifier.
8. Evaluate the model using:
   - Confusion Matrix
   - Precision
   - Recall
   - F1-score
   - ROC-AUC
9. Experiment with different classification thresholds.
10. Save the trained model using Joblib.

## Dataset Features

The model uses seven input features:

| Feature | Description |
|---|---|
| distance_from_home | Distance from the cardholder's home |
| distance_from_last_transaction | Distance from the previous transaction |
| ratio_to_median_purchase_price | Purchase price compared with median purchase price |
| repeat_retailer | Whether the transaction is at a repeat retailer |
| used_chip | Whether a chip was used |
| used_pin_number | Whether a PIN was used |
| online_order | Whether the transaction was an online order |

Target column: `fraud`

## Model Evaluation

The project uses Logistic Regression for binary classification.

Evaluation includes precision, recall, F1-score, confusion matrix and ROC-AUC.

The application uses a configurable classification threshold, with a default value of 0.30.

Note: Model performance and threshold selection should be interpreted in the context of fraud detection, where missing fraudulent transactions and false alerts both matter.

## Project Structure

```text
fraud_detection/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   └── main.py
│
├── local_files/                 # Excluded from Git
│   ├── card_transdata.csv
│   ├── valid_sample.csv
│   ├── invalid_sample.csv
│   ├── missing_values.csv
│   └── app.py
│
├── fraud_detection_model.pkl
├── fraud_detection.ipynb
├── requirements.txt
├── README.md
└── .gitignore
```

## Local Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd fraud_detection
```

### 2. Create and activate a Python virtual environment

Windows PowerShell:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the FastAPI backend

```bash
uvicorn backend.main:app --reload
```

Backend API:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

### 5. Configure the frontend

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

## Deployment

Planned deployment architecture:

- Frontend: Vercel
- Backend: Render
- Source code: GitHub

The React frontend communicates with the FastAPI backend through HTTP API requests.

## Important Notes

- The trained model file `fraud_detection_model.pkl` is required by the backend.
- The original training dataset and sample CSV files are kept locally and excluded from Git using `.gitignore`.
- The Jupyter Notebook contains the EDA, model training and evaluation workflow.
- The application is an educational machine learning project and should not be treated as a production-grade financial fraud prevention system.
