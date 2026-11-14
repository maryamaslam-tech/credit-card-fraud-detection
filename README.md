# Credit Card Fraud Detection

A Machine Learning based web application that detects potentially fraudulent credit card transactions using Logistic Regression.

The project uses a React frontend and FastAPI backend. Users can enter transaction details manually or upload a CSV file to receive fraud predictions.

## Live Demo

- **Frontend:** https://credit-card-fraud-detection-alpha-five.vercel.app/
- **Backend API:** https://credit-card-fraud-detection.ethiodeploy.app/
- **API Documentation:** https://credit-card-fraud-detection.ethiodeploy.app/docs
- **GitHub Repository:** https://github.com/maryamaslam-tech/credit-card-fraud-detection

## Features

- Manual transaction fraud prediction
- CSV file upload for batch predictions
- Fraud probability calculation
- Adjustable classification threshold
- Fraud and legitimate transaction classification
- Input validation and error handling
- Interactive dashboard
- Login page

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
- Python-dotenv

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
5. Split data into training and testing sets using stratification.
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

**Target column:** `fraud`

The target identifies whether a transaction is fraudulent or legitimate.

The original dataset contains approximately one million transaction records.

## Model Evaluation

The project uses Logistic Regression for binary classification.

The model was evaluated using a separate test split.

| Metric | Result |
|---|---:|
| ROC-AUC | 0.9670 |
| Precision (Fraud, threshold 0.30) | 81.17% |
| Recall (Fraud, threshold 0.30) | 77.82% |
| F1-score (Fraud, threshold 0.30) | 79.46% |

The application uses a configurable classification threshold, with a default value of `0.30`.

A lower threshold can identify more fraudulent transactions but may also increase false positive predictions. Threshold selection involves balancing fraud detection and false alerts.

**Note:** These results are from experiments on the test split. Threshold selection should ideally be performed using a validation set for a more reliable final evaluation.

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
git clone https://github.com/maryamaslam-tech/credit-card-fraud-detection.git
cd credit-card-fraud-detection
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

### 4. Configure backend environment variables

Create a `.env` file inside the `backend` folder:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_own_password
```

Use your own password. Do not commit this file to GitHub.

### 5. Run the FastAPI backend

From the project root directory:

```bash
uvicorn backend.main:app --reload
```

Backend API:

`http://127.0.0.1:8000`

API documentation:

`http://127.0.0.1:8000/docs`

### 6. Configure the frontend

Create a `.env` file inside the `frontend` folder:

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

The application is deployed using the following services:

- **Frontend:** Vercel
- **Backend:** EthioDeploy
- **Source Code:** GitHub

The React frontend communicates with the FastAPI backend through HTTP API requests.

## Important Notes

- The trained model file `fraud_detection_model.pkl` is required by the backend.
- The original training dataset and sample CSV files are kept locally and excluded from Git using `.gitignore`.
- The Jupyter Notebook contains the EDA, model training, and evaluation workflow.
- Backend environment variables must be configured separately on the deployment platform.
- The current login implementation verifies credentials but does not provide token-based authentication or protect the prediction endpoints.
- This is an educational machine learning project and should not be treated as a production-grade financial fraud prevention system.