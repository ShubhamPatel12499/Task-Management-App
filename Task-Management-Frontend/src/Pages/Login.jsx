import React, { useState } from "react";
import axios from "axios";
import "../Styles//Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Login Logic
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://task-management-backend-5wrr.onrender.com/users/login",
        {
          email,
          password,
        }
      );
      if (response.data.msg === "Login Successful") {
        localStorage.setItem("token", response.data.token);
        alert("User Logged in Successfully!");
        navigate("/viewTask");
      } else {
        setError(response.data);
        alert("Please Register First!");
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Please Register First!");
      navigate("/signup");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>
          Email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
