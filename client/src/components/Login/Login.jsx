import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api/userRoutes";
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [userLoginData, setUserLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserLoginData({ ...userLoginData, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API.LOGIN_USER_URL, userLoginData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message || "Login successful!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(response.data.message || "Login failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={loginUser}>
          <div className="login-input-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="username"
              value={userLoginData.username}
              required
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>

          <div className="login-input-group">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              value={userLoginData.password}
              required
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>

          <div className="forgot">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="login-btn">
            LOGIN
          </button>

          <p className="signup-text">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;
