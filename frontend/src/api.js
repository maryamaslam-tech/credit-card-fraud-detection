// api.js
const API_BASE_URL = import.meta.env.VITE_API_URL;

const predictTransaction = async (data) => {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Prediction request failed");
  }

  return response.json();
};

export const predictCSV = async (file, threshold) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("threshold", threshold);

  const response = await fetch(`${API_BASE_URL}/predict-csv`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "CSV prediction failed.");
  }

  return await response.json();
};
export default predictTransaction;

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed.");
  }

  return data;
};