# Credit Card Fraud Detection

A Machine Learning based web application that detects potentially fraudulent credit card transactions using Logistic Regression.

The project uses a React frontend and FastAPI backend. Users can enter transaction details manually or upload a CSV file to receive fraud predictions.

## Live Demo

- **Frontend:** [https://credit-card-fraud-detection-alpha-five.vercel.app/](https://credit-card-fraud-detection-alpha-five.vercel.app/)
- **Backend API:** [https://credit-card-fraud-detection.ethiodeploy.app/](https://credit-card-fraud-detection.ethiodeploy.app/)
- **API Documentation:** [https://credit-card-fraud-detection.ethiodeploy.app/docs](https://credit-card-fraud-detection.ethiodeploy.app/docs)
- **GitHub Repository:** [https://github.com/maryamaslam-tech/credit-card-fraud-detection](https://github.com/maryamaslam-tech/credit-card-fraud-detection)

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

## Dataset

This project uses the **Credit Card Fraud Detection** dataset from Kaggle.

- **Source:** [Kaggle - Credit Card Fraud Detection](https://www.kaggle.com/datasets/dhanushnarayananr/credit-card-fraud)
- **Dataset file:** `card_transdata.csv`
- **Total records:** 1,000,000
- **Input features:** 7
- **Target column:** `fraud`

The dataset contains transaction information used to identify potentially fraudulent transactions.

### Dataset Download Instructions

The original dataset is not included in this GitHub repository.

To obtain the dataset:

1. Visit the [Kaggle dataset page](https://www.kaggle.com/datasets/dhanushnarayananr/credit-card-fraud).
2. Download the dataset file `card_transdata.csv`.
3. Create a folder named `local_files` in the project root directory.
4. Place `card_transdata.csv` inside the `local_files` folder.

The expected path is:

```text
fraud_detection/
└── local_files/
    └── card_transdata.csv
```

The dataset is excluded from GitHub using `.gitignore`.

## Dataset Features

The model uses seven input features:

| Feature                        | Description                                        |
| ------------------------------ | -------------------------------------------------- |
| distance_from_home             | Distance from the cardholder's home                |
| distance_from_last_transaction | Distance from the previous transaction             |
| ratio_to_median_purchase_price | Purchase price compared with median purchase price |
| repeat_retailer                | Whether the transaction is at a repeat retailer    |
| used_chip                      | Whether a chip was used                            |
| used_pin_number                | Whether a PIN was used                             |
| online_order                   | Whether the transaction was an online order        |

**Target column:** `fraud`

The target identifies whether a transaction is fraudulent (1) or legitimate (0).

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

## Model Evaluation

The project uses Logistic Regression for binary classification.

The model was evaluated using a separate test split.

| Metric                            | Result |
| --------------------------------- | -----: |
| ROC-AUC                           | 0.9670 |
| Precision (Fraud, threshold 0.30) | 81.17% |
| Recall (Fraud, threshold 0.30)    | 77.82% |
| F1-score (Fraud, threshold 0.30)  | 79.46% |

The application uses a configurable classification threshold, with a default value of `0.30`.

A lower threshold can identify more fraudulent transactions but may also increase false positive predictions. Threshold selection involves balancing fraud detection and false alerts.

**Note:** These results are from experiments on the test split. Threshold selection should ideally be performed using a validation set for a more reliable final evaluation.

## Project Structure

```text
credit-card-fraud-detection/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── main.py
│   └── .env
│
├── local_files/                  # Excluded from Git
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

### 1. Clone the Repository

```bash
git clone https://github.com/maryamaslam-tech/credit-card-fraud-detection.git
cd credit-card-fraud-detection
```

### 2. Create and Activate a Python Virtual Environment

Windows PowerShell:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Backend Environment Variables

Create a `.env` file inside the `backend` folder:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_own_password
```

Replace `your_own_password` with your own password.

Do not commit this file to GitHub.

### 5. Run the FastAPI Backend

From the project root directory:

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

### 6. Configure the Frontend

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will be available at the local URL provided by Vite, usually:

```text
http://localhost:5173
```

## Deployment

The application is deployed using the following services:

- **Frontend:** Vercel
- **Backend:** EthioDeploy
- **Source Code:** GitHub

The React frontend communicates with the FastAPI backend through HTTP API requests.

Backend environment variables must be configured separately on the deployment platform.

## Important Notes

- The trained model file `fraud_detection_model.pkl` is required by the backend.
- The original training dataset and sample CSV files are kept locally and excluded from Git using `.gitignore`.
- The Jupyter Notebook contains the EDA, model training, and evaluation workflow.
- The dataset must be downloaded separately to run the complete training notebook.
- Backend environment variables must be configured before running the application.
- The current login implementation verifies credentials but does not provide token-based authentication or protect the prediction endpoints.
- This is an educational machine learning project and should not be treated as a production-grade financial fraud prevention system.
