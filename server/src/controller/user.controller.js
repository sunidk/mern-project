const userService = require("../service/user.service");

exports.registerUser = async (req, res) => {
  try {
    await userService.registerUser(req.body);
    res.status(200).json({
      success: true,
      message: "User registration successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { token } = await userService.loginUser(req.body);
    res.status(200).json({
      success: true,
      message: "User login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    await userService.updateUserPassword(req.body);
    res.status(200).json({
      success: true,
      message: "User password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

