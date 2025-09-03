import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // helper: backend request with timeout
  const loginWithTimeout = (credentials, timeout = 3000) => {
    return Promise.race([
      api.post("/api/auth/login", credentials),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeout)
      ),
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await loginWithTimeout({ email, password }, 3000); // 3s timeout
      const data = res.data;

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          id: data.userId,
          name: data.name,
          email: email,
        })
      );

      setMessage(data.message || "Login successful!");
      setError("");

      setTimeout(() => {
        navigate("/venues");
      });
    } catch (err) {
      console.warn("Backend login failed, trying fallback:", err.message);

      // fallback: hardcoded login
      if (email === "kavya.reddy@example.com" && password === "kavya.reddy@example.com") {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            id: "440cce6d-d5b0-4f6e-82e3-08f847f7ed8d",
            name: "Kavya Reddy",
            email: email,
          })
        );

        setMessage("Login successful (fallback mode)!");
        setError("");

        setTimeout(() => {
          navigate("/venues");
        });
      } else {
        setError("Login failed: Invalid credentials or server timeout");
        setMessage("");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
