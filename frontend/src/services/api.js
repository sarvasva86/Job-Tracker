const API_URL = "http://localhost:5000";

// ==========================
// TOKEN HELPERS
// ==========================

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};

// ==========================
// GENERIC REQUEST HELPER
// ==========================

const request = async (endpoint, method = "GET", body = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ==========================
// AUTH ROUTES
// ==========================

export const registerUser = async (username, password) => {
  return request("/auth/register", "POST", { username, password });
};

export const loginUser = async (username, password) => {
  const data = await request("/auth/login", "POST", { username, password });
  setToken(data.token);
  return data;
};

// ==========================
// JOB ROUTES
// ==========================

export const fetchJobs = async () => {
  return request("/jobs");
};

export const createJob = async (jobData) => {
  return request("/jobs", "POST", jobData);
};

export const updateJob = async (id, jobData) => {
  return request(`/jobs/${id}`, "PATCH", jobData);
};

export const deleteJob = async (id) => {
  return request(`/jobs/${id}`, "DELETE");
};
