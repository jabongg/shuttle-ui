import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // for error messages
  const [message, setMessage] = useState(""); // for success/info messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await api.post("/api/auth/login", { email, password });
      const data = res.data;

      // Save logged-in user to localStorage
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          id: data.userId, // UUID from backend
          name: data.name,
          email: email,
        })
      );

      setMessage(data.message); // success message from backend
      setError(""); // clear any previous errors

      // Redirect after short delay to show message (optional)
      setTimeout(() => {
        navigate("/venues");
      }, 500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
      setMessage("");
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
