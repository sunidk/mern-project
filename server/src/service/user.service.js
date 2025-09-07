const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

exports.registerUser = async (data) => {
  try {
    const { email, username, password } = data;

    if (!email || !username || !password) {
      throw new Error("email, username and password are required!");
    }

    if (typeof email !== "string" || typeof username !== "string" || typeof password !== "string") {
      throw new Error("email, username and password must be strings!");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists!");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    logger.info(`New user registered: ${email}`);
    return newUser;
  } catch (error) {
    logger.error("Error in registerUser", error);
    throw error;
  }
};

exports.loginUser = async (data) => {
  try {
    const { username, password } = data;

    if (!username || !password) {
      throw new Error("username and password are required!");
    }

    if (typeof username !== "string" || typeof password !== "string") {
      throw new Error("username and password must be strings!");
    }
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials!");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token };
  } catch (error) {
    logger.error("Error in loginUser", error);
    throw error;
  }
};

exports.updateUserPassword = async (data) => {
  try {
    const { username, newPassword } = data;

    if (!username || !newPassword) {
      throw new Error("username and newPassword are required!");
    }

    if (typeof username !== "string" || typeof newPassword !== "string") {
      throw new Error("username and password must be strings!");
    }

    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found!");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.updateOne(
      { username },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    return updatedUser;
  } catch (error) {
    logger.error("Error in updateUserPassword", error);
    throw error;
  }
};
