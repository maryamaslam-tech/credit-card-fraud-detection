// pages/Prediction.jsx

import { useState } from "react";
import {
  Upload,
  FileSpreadsheet,
  ShieldCheck,
  ShieldAlert,
  Activity,
  SlidersHorizontal,
  ArrowRight,
  FileUp,
} from "lucide-react";
import { Navbar, Footer } from "../Components.jsx";
import predictTransaction, { predictCSV } from "../api.js";

const Prediction = () => {
  const [activeTab, setActiveTab] = useState("manual");
  const [error, setError] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [csvResult, setCsvResult] = useState(null);
  const [csvLoading, setCsvLoading] = useState(false);
  const [csvError, setCsvError] = useState("");
  const [formData, setFormData] = useState({
    distanceFromHome: "",
    distanceFromLastTransaction: "",
    ratioToMedianPurchasePrice: "",
    repeatRetailer: "",
    usedChip: "",
    usedPinNumber: "",
    onlineOrder: "",
  });
  const [threshold, setThreshold] = useState(0.3);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(formData).some(
      (value) => value.trim() === "",
    );

    if (isEmpty) {
      setError("All fields are required. Please fill in all fields.");
      return;
    }

    setError("");
    setResult(null);

    const payload = {
      distance_from_home: Number(formData.distanceFromHome),
      distance_from_last_transaction: Number(
        formData.distanceFromLastTransaction,
      ),
      ratio_to_median_purchase_price: Number(
        formData.ratioToMedianPurchasePrice,
      ),
      repeat_retailer: Number(formData.repeatRetailer),
      used_chip: Number(formData.usedChip),
      used_pin_number: Number(formData.usedPinNumber),
      online_order: Number(formData.onlineOrder),
      threshold: threshold,
    };

    try {
      const data = await predictTransaction(payload);
      setResult(data);
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    }
  };

  
const handleCsvSubmit = async () => {
  if (!csvFile) {
    setCsvError("Please upload a CSV file first.");
    return;
  }

  setCsvError("");
  setCsvResult(null);
  setCsvLoading(true);

  try {
    const data = await predictCSV(csvFile, threshold);
    setCsvResult(data);
  } catch (error) {
    setCsvError(error.message || "Something went wrong. Please try again.");
  } finally {
    setCsvLoading(false);
  }
};


  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-900 via-slate-900 to-emerald-950">
      <Navbar />

      <section className="px-4 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-6xl">
          {/* Page Heading */}
          <div className="mb-10">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold tracking-widest text-emerald-400">
              FRAUD ANALYSIS
            </span>

            <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Transaction Detection
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Analyze transaction details to identify potentially fraudulent
              activity using our detection system.
            </p>
          </div>

          {/* Prediction Tabs */}
          <div className="mb-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("manual")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                activeTab === "manual"
                  ? "bg-emerald-600 text-white"
                  : "border border-emerald-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Activity className="h-5 w-5" />
              Manual Prediction
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("csv")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                activeTab === "csv"
                  ? "bg-emerald-600 text-white"
                  : "border border-emerald-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <FileSpreadsheet className="h-5 w-5" />
              CSV Upload
            </button>
          </div>

          {/* Manual Prediction */}
          {activeTab === "manual" && (
            <div className="rounded-2xl border border-emerald-800 bg-slate-900/80 p-5 sm:p-8">
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-500/10 p-3">
                  <ShieldCheck className="h-6 w-6 text-emerald-400" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">
                    Transaction Details
                  </h2>
                  <p className="text-sm text-slate-400">
                    Enter the required transaction information
                  </p>
                </div>
              </div>

              {/* Input Fields */}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Distance From Home
                    </label>
                    <p className="mt-1 text-xs text-slate-400">
                      Distance between the cardholder's home and the transaction
                      location, in kilometers.
                    </p>
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter distance from home"
                      min={0}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
                      value={formData.distanceFromHome}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          distanceFromHome: e.target.value,
                        });
                        setError("");
                      }}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Distance From Last Transaction (km)
                    </label>

                    <p className="mt-1 text-xs text-slate-400">
                      Distance between the current transaction and the previous
                      transaction, in kilometers.
                    </p>
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter distance from last transaction"
                      min={0}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
                      value={formData.distanceFromLastTransaction}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          distanceFromLastTransaction: e.target.value,
                        });
                        setError("");
                      }}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Ratio To Median Purchase Price
                    </label>
                    <p className="mt-1 text-xs text-slate-400">
                      How much the transaction amount differs from the
                      cardholder's median purchase amount. For example, 2.0
                      means twice the usual purchase amount, while 0.5 means
                      half.
                    </p>
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter purchase price ratio"
                      min={0}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
                      value={formData.ratioToMedianPurchasePrice}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          ratioToMedianPurchasePrice: e.target.value,
                        });
                        setError("");
                      }}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Repeat Retailer
                    </label>
                    <select
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
                      value={formData.repeatRetailer}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          repeatRetailer: e.target.value,
                        });
                        setError("");
                      }}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="1">Yes (1)</option>
                      <option value="0">No (0)</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Used Chip
                    </label>
                    <select
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
                      value={formData.usedChip}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          usedChip: e.target.value,
                        });
                        setError("");
                      }}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="1">Yes (1)</option>
                      <option value="0">No (0)</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Used PIN Number
                    </label>
                    <select
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
                      value={formData.usedPinNumber}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          usedPinNumber: e.target.value,
                        });
                        setError("");
                      }}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="1">Yes (1)</option>
                      <option value="0">No (0)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Online Order
                    </label>
                    <select
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
                      value={formData.onlineOrder}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          onlineOrder: e.target.value,
                        });
                        setError("");
                      }}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="1">Yes (1)</option>
                      <option value="0">No (0)</option>
                    </select>
                  </div>
                </div>

                {/* Threshold */}
                <div className="mt-10 rounded-xl border border-emerald-800/70 bg-emerald-950/40 p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <SlidersHorizontal className="h-5 w-5 text-emerald-400" />
                    <div>
                      <h3 className="font-semibold text-white">
                        Detection Threshold
                      </h3>
                      <p className="text-xs text-slate-400">
                        Adjust prediction sensitivity
                      </p>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0.05"
                    max="0.95"
                    step="0.01"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />

                  <div className="mt-2 flex justify-between text-xs text-slate-400">
                    <span>0.00</span>
                    <span>Threshold: {threshold.toFixed(2)}</span>
                    <span>1.00</span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-slate-400">
                    A lower threshold makes fraud detection more sensitive, but
                    may incorrectly flag legitimate transactions. A higher
                    threshold requires stronger fraud probability, but may miss
                    some fraudulent transactions.
                  </p>
                </div>

                {/* Predict Button */}
                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-500 active:scale-[0.98] sm:w-fit"
                >
                  Analyze Transaction
                  <ArrowRight className="h-5 w-5" />
                </button>
                {error && (
                  <p className="mt-4 text-sm font-medium text-red-400">
                    {error}
                  </p>
                )}
              </form>
              {result && (
                <div className="mt-8 space-y-5">
                  {/* Prediction Status */}
                  <div
                    className={`rounded-2xl border p-6 ${
                      result.prediction === 1
                        ? "border-red-500/30 bg-red-500/10"
                        : "border-emerald-500/30 bg-emerald-500/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                          result.prediction === 1
                            ? "bg-red-500/20 text-red-400"
                            : "bg-emerald-500/20 text-emerald-400"
                        }`}
                      >
                        {result.prediction === 1 ? (
                          <ShieldAlert size={30} />
                        ) : (
                          <ShieldCheck size={30} />
                        )}
                      </div>

                      <div>
                        <p className="text-sm text-slate-400">
                          Transaction Analysis Complete
                        </p>

                        <h3
                          className={`mt-1 text-2xl font-bold ${
                            result.prediction === 1
                              ? "text-red-400"
                              : "text-emerald-400"
                          }`}
                        >
                          {result.label} Transaction
                        </h3>

                        <p className="mt-1 text-sm text-slate-300">
                          {result.prediction === 1
                            ? "This transaction has been flagged as potentially fraudulent."
                            : "This transaction has been classified as legitimate."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Result Cards */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Fraud Probability */}
                    <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                          <Activity size={23} />
                        </div>

                        <span className="text-xs text-slate-400">
                          MODEL OUTPUT
                        </span>
                      </div>

                      <p className="mt-5 text-sm text-slate-400">
                        Fraud Probability
                      </p>

                      <h3 className="mt-1 text-3xl font-bold text-white">
                        {(result.fraud_probability * 100).toFixed(2)}%
                      </h3>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700">
                        <div
                          className="h-full rounded-full bg-red-500 transition-all"
                          style={{
                            width: `${result.fraud_probability * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Threshold */}
                    <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                          <SlidersHorizontal size={23} />
                        </div>

                        <span className="text-xs text-slate-400">
                          SELECTED VALUE
                        </span>
                      </div>

                      <p className="mt-5 text-sm text-slate-400">
                        Prediction Threshold
                      </p>

                      <h3 className="mt-1 text-3xl font-bold text-white">
                        {(result.threshold * 100).toFixed(0)}%
                      </h3>

                      <p className="mt-3 text-xs text-slate-400">
                        Minimum probability required to classify a transaction
                        as fraud.
                      </p>
                    </div>
                  </div>

                  {/* Classification Cards */}
                  {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div
                      className={`rounded-2xl border p-5 ${
                        result.prediction === 1
                          ? "border-red-500/40 bg-red-500/10"
                          : "border-slate-700 bg-slate-900/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ShieldAlert className="text-red-400" size={24} />
                        <h4 className="font-semibold text-white">Fraud</h4>
                      </div>

                      <p className="mt-3 text-sm text-slate-400">
                        {result.prediction === 1
                          ? "This is the detected classification."
                          : "This transaction was not classified as fraud."}
                      </p>

                      <p className="mt-4 text-sm font-semibold text-red-400">
                        {result.prediction === 1 ? "Detected" : "Not Detected"}
                      </p>
                    </div>

                    <div
                      className={`rounded-2xl border p-5 ${
                        result.prediction === 0
                          ? "border-emerald-500/40 bg-emerald-500/10"
                          : "border-slate-700 bg-slate-900/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="text-emerald-400" size={24} />
                        <h4 className="font-semibold text-white">Legitimate</h4>
                      </div>

                      <p className="mt-3 text-sm text-slate-400">
                        {result.prediction === 0
                          ? "This is the detected classification."
                          : "This transaction was not classified as legitimate."}
                      </p>

                      <p className="mt-4 text-sm font-semibold text-emerald-400">
                        {result.prediction === 0 ? "Detected" : "Not Detected"}
                      </p>
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          )}

          {/* CSV Upload */}
          {activeTab === "csv" && (
            <div className="rounded-2xl border border-emerald-800 bg-slate-900/80 p-5 sm:p-8">
              {/* Header */}
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-500/10 p-3">
                  <FileSpreadsheet className="h-6 w-6 text-emerald-400" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">
                    Bulk Transaction Analysis
                  </h2>
                  <p className="text-sm text-slate-400">
                    Upload a CSV file to analyze multiple transactions
                  </p>
                </div>
              </div>

              {/* Upload Area */}
              <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-800 bg-emerald-950/30 px-5 py-10 text-center transition hover:border-emerald-500">
                <div className="mb-5 rounded-2xl bg-emerald-500/10 p-5">
                  <FileUp className="h-10 w-10 text-emerald-400" />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  Upload your CSV file
                </h3>

                <p className="mt-2 max-w-md text-sm text-slate-400">
                  Select a CSV file containing transaction features for bulk
                  fraud detection.
                </p>

                <label className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
                  <Upload className="h-5 w-5" />
                  Choose CSV File
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      setCsvResult(null);

                      if (file && !file.name.toLowerCase().endsWith(".csv")) {
                        setCsvError("Please select a CSV file.");
                        setCsvFile(null);
                        return;
                      }

                      setCsvError("");
                      setCsvFile(file || null);
                    }}
                  />
                </label>

                {csvFile && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400">
                    <FileSpreadsheet size={18} />
                    <span>{csvFile.name}</span>
                  </div>
                )}

                {csvError && (
                  <p className="mt-3 text-sm text-red-400">{csvError}</p>
                )}

                <p className="mt-4 text-xs text-slate-500">
                  Supported format: CSV | Maximum size: 10 MB
                </p>
              </div>

              {/* Required Columns */}
              <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                <h3 className="mb-3 text-sm font-semibold text-white">
                  Required CSV Columns
                </h3>

                <div className="flex flex-wrap gap-2">
                  {[
                    "distance_from_home (Home to transaction distance in km)",
                    "distance_from_last_transaction (Distance from previous transaction in km)",
                    "ratio_to_median_purchase_price (Purchase price ratio)",
                    "repeat_retailer (0 = No, 1 = Yes)",
                    "used_chip (0 = No, 1 = Yes)",
                    "used_pin_number (0 = No, 1 = Yes)",
                    "online_order (0 = No, 1 = Yes)",
                  ].map((column) => (
                    <span
                      key={column}
                      className="rounded-lg bg-slate-800 px-3 py-2 text-xs text-slate-300"
                    >
                      {column}
                    </span>
                  ))}
                </div>
              </div>

              {/* CSV Threshold */}
              <div className="mt-10 rounded-xl border border-emerald-800/70 bg-emerald-950/40 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <SlidersHorizontal className="h-5 w-5 text-emerald-400" />
                  <div>
                    <h3 className="font-semibold text-white">
                      Detection Threshold
                    </h3>
                    <p className="text-xs text-slate-400">
                      Adjust prediction sensitivity
                    </p>
                  </div>
                </div>

                <input
                  type="range"
                  min="0.05"
                  max="0.95"
                  step="0.01"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />

                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>0.00</span>
                  <span>Threshold: {threshold.toFixed(2)}</span>
                  <span>1.00</span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  A lower threshold makes fraud detection more sensitive, but
                  may incorrectly flag legitimate transactions. A higher
                  threshold requires stronger fraud probability, but may miss
                  some fraudulent transactions.
                </p>
              </div>

              {/* Analyze Button */}
              <button
                type="button"
                disabled={csvLoading}
                onClick={handleCsvSubmit}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
              >
                {csvLoading ? (
                  <>
                    <Activity className="h-5 w-5 animate-spin" />
                    Analyzing Transactions...
                  </>
                ) : (
                  <>
                    Analyze CSV
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              {/* CSV Results */}
              {csvResult && (
                <div className="mt-10 space-y-6">
                  {/* Heading */}
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      CSV Analysis Results
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">
                      Transaction-wise fraud detection results
                    </p>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-3 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-gray-400">
                        Total Transactions
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-white">
                        {csvResult.total_transactions}
                      </h3>
                    </div>

                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                      <p className="text-sm text-gray-400">
                        Fraud Transactions
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-red-400">
                        {csvResult.fraud_count}
                      </h3>
                    </div>

                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                      <p className="text-sm text-gray-400">
                        Legitimate Transactions
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-emerald-400">
                        {csvResult.legitimate_count}
                      </h3>
                    </div>
                  </div>

                  {/* Threshold Info */}
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-gray-300">
                      Detection Threshold:{" "}
                      <span className="font-semibold text-white">
                        {(csvResult.threshold * 100).toFixed(0)}%
                      </span>
                    </p>
                  </div>

                  {/* Results Table */}
                  <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full min-w-375 text-left text-sm">
                      <thead className="bg-white/5 text-gray-400">
                        <tr>
                          <th className="px-4 py-4">#</th>
                          <th className="px-4 py-4">Prediction</th>
                          <th className="px-4 py-4">Fraud Probability</th>
                          <th className="px-4 py-4">Distance From Home</th>
                          <th className="px-4 py-4">
                            Distance From Last Transaction
                          </th>
                          <th className="px-4 py-4">Purchase Ratio</th>
                          <th className="px-4 py-4">Repeat Retailer</th>
                          <th className="px-4 py-4">Used Chip</th>
                          <th className="px-4 py-4">Used PIN</th>
                          <th className="px-4 py-4">Online Order</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-white/10">
                        {csvResult.results.map((item, index) => {
                          // Determine prediction for the current row
                          const isFraud =
                            Number(item.prediction) === 1 ||
                            item.label === "Fraud";

                          return (
                            <tr
                              key={item.row_number ?? index}
                              className="transition hover:bg-white/5"
                            >
                              {/* Row Number */}
                              <td className="px-4 py-4 text-gray-400">
                                {index + 1}
                              </td>

                              {/* Prediction */}
                              <td className="px-4 py-4">
                                <span
                                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
                                    isFraud
                                      ? "bg-red-500/10 text-red-400"
                                      : "bg-emerald-500/10 text-emerald-400"
                                  }`}
                                >
                                  {isFraud ? (
                                    <ShieldAlert size={15} />
                                  ) : (
                                    <ShieldCheck size={15} />
                                  )}

                                  {isFraud ? "Fraud" : "Legitimate"}
                                </span>
                              </td>

                              {/* Fraud Probability */}
                              <td className="px-4 py-4 font-medium text-white">
                                {(Number(item.fraud_probability) * 100).toFixed(
                                  2,
                                )}
                                %
                              </td>

                              {/* Numeric Features */}
                              <td className="px-4 py-4 text-gray-300">
                                {item.distance_from_home}
                              </td>

                              <td className="px-4 py-4 text-gray-300">
                                {item.distance_from_last_transaction}
                              </td>

                              <td className="px-4 py-4 text-gray-300">
                                {item.ratio_to_median_purchase_price}
                              </td>

                              {/* Binary Features */}
                              <td className="px-4 py-4 text-gray-300">
                                {Number(item.repeat_retailer) === 1
                                  ? "Yes"
                                  : "No"}
                              </td>

                              <td className="px-4 py-4 text-gray-300">
                                {Number(item.used_chip) === 1 ? "Yes" : "No"}
                              </td>

                              <td className="px-4 py-4 text-gray-300">
                                {Number(item.used_pin_number) === 1
                                  ? "Yes"
                                  : "No"}
                              </td>

                              <td className="px-4 py-4 text-gray-300">
                                {Number(item.online_order) === 1 ? "Yes" : "No"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Prediction;
