// Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ Logged in successfully");
      onLogin(); 
    } catch (error) {
      console.error("Login error:", error.code);
      let msg = "❌ Login failed";
      if (error.code === "auth/user-not-found") msg = "❌ User not found";
      else if (error.code === "auth/wrong-password") msg = "❌ Wrong password";
      else if (error.code === "auth/invalid-email") msg = "❌ Invalid email";
      else if (error.code === "auth/too-many-requests") msg = "❌ Too many failed attempts. Try again later.";
      setMessage(msg);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
