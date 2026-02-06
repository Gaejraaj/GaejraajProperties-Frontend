import React, { useState, useEffect } from "react";
import apiService from "../services/api";

const BackendTest = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Test GET request
  const testConnection = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await apiService.get("/api/hello");
      setMessage(result.message);
    } catch (err) {
      setError("Failed to connect to backend");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Test POST request
  const sendData = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await apiService.post("/api/data", {
        name: "John Doe",
        email: "john@example.com",
      });
      setData(result);
    } catch (err) {
      setError("Failed to send data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Check health on component mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await apiService.get("/api/health");
        console.log("Backend is connected!");
      } catch (err) {
        console.warn("Backend connection failed on mount");
      }
    };
    checkHealth();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Backend Connection Test</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={testConnection}
          disabled={loading}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          Test GET Request
        </button>

        <button
          onClick={sendData}
          disabled={loading}
          style={{ padding: "10px 20px" }}
        >
          Test POST Request
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {error && (
        <div style={{ color: "red", padding: "10px", border: "1px solid red" }}>
          Error: {error}
          <br />
          Make sure backend is running on port 5000
        </div>
      )}

      {message && (
        <div
          style={{ color: "green", padding: "10px", border: "1px solid green" }}
        >
          Message from backend: <strong>{message}</strong>
        </div>
      )}

      {data && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h3>Response Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      <div style={{ marginTop: "30px", fontSize: "14px", color: "#666" }}>
        <h4>Troubleshooting:</h4>
        <ul>
          <li>
            Ensure backend is running: <code>npm run dev</code>
          </li>
          <li>
            Check if backend is on:{" "}
            <a href="http://localhost:5000/api/health" target="_blank">
              http://localhost:5000/api/health
            </a>
          </li>
          <li>Check console for CORS errors</li>
        </ul>
      </div>
    </div>
  );
};

export default BackendTest;
