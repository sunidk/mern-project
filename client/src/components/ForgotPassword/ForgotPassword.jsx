import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api/userRoutes";
import "./ForgotPassword.css";
import { FaUser, FaLock } from "react-icons/fa";

function ForgotPassword() {
  const navigate = useNavigate();

  const [updatePasswordData, setUpdatePasswordData] = useState({
    username: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setUpdatePasswordData({
      ...updatePasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API.UPDATE_USER_PASSWORD_URL, updatePasswordData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Password update successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message || "Password update failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="forgotPassword-container">
      <div className="forgotPassword-box">
        <h2>Forgot Password ?</h2>

        <form onSubmit={updatePassword}>
          <div className="forgotPassword-input-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="username"
              value={updatePasswordData.username}
              required
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>

          <div className="forgotPassword-input-group">
            <FaLock className="icon" />
            <input
              type="password"
              name="newPassword"
              value={updatePasswordData.newPassword}
              required
              placeholder="Enter your new password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="forgotPassword-btn">
            Update Password
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ForgotPassword;
