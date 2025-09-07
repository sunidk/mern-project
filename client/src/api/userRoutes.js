const USER_API_BASE_URL = process.env.REACT_APP_USER_API_BASE_URL || "http://localhost:4000/users";

const API = {
  REGISTER_USER_URL: `${USER_API_BASE_URL}/register`,
  LOGIN_USER_URL: `${USER_API_BASE_URL}/login`,
  UPDATE_USER_PASSWORD_URL: `${USER_API_BASE_URL}/update-password`,
};

export default API;
