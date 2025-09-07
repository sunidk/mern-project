import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api/userRoutes";
import "./Register.css";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [userRegisterData, setuserRegisterData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setuserRegisterData({
      ...userRegisterData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API.REGISTER_USER_URL, userRegisterData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message || "Registration failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>

        <form onSubmit={registerUser}>
          <div className="register-input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              value={userRegisterData.email}
              required
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div className="register-input-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="username"
              value={userRegisterData.username}
              required
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>

          <div className="register-input-group">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              value={userRegisterData.password}
              required
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="register-btn">
            REGISTER
          </button>

          <p className="login-text">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Register;
