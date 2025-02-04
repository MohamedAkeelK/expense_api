import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Expense from "../models/Expense.js";
import Income from "../models/Income.js";
import Goal from "../models/Goal.js";

// for development purposes
let SALT_ROUNDS = 11;
let TOKEN_KEY = "areallylonggoodkey";

// for production
if (`${process.env.NODE_ENV}` === "production") {
  SALT_ROUNDS = Number(`${process.env.SALT_ROUNDS}`);
  TOKEN_KEY = `${process.env.TOKEN_KEY}`;
}

// for JWT expiration
const today = new Date();
const exp = new Date(today);
exp.setDate(today.getDate() + 30);

export const Register = async (req, res) => {
  try {
    console.log("signing up");

    //save user data to db
    const { username, email, password_digest, dob, totalMoney } = req.body;
    const password_hashed = await bcrypt.hash(password_digest, SALT_ROUNDS);

    const user = new User({
      username,
      email,
      password_digest: password_hashed,
      profielPicture:
        "https://www.pngkey.com/png/detail/839-8393808_user-male-silhouette-comments-blank-person.png",
      dob,
      totalMoney,
    });

    await user.save();

    // send data(payload)
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      dob: user.dob,
      totalMoney: user.totalMoney,
      exp: parseInt(exp.getTime() / 1000),
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    res.status(201).json({
      token,
      userId: user._id,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

// Sign in

export const Login = async (req, res) => {
  try {
    const { email, password_digest } = req.body;
    console.log(req.body);
    if (!email || !password_digest) {
      return res.status(400).send("Email and password are required");
    }

    console.log("Incoming sign-in request:", req.body);

    const user = await User.findOne({ email }).select(
      "username email password_digest totalMoney"
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(
      password_digest,
      user.password_digest
    );
    if (!passwordMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 30);

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      exp: parseInt(exp.getTime() / 1000), // JWT expiration time
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    res.status(201).json({
      token: token,
      userId: user._id,
      username: user.username,
      email: user.email,
      dob: user.dob,
      totalMoney: user.totalMoney || 0, // Default to 0 if undefined
    });
  } catch (error) {
    console.error("Error in signIn:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Verify
export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);
    if (payload) {
      res.json({ payload, token: token });
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).send("Not Authorized");
  }
};
// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Use authenticated user's ID from restrict middleware

    // Find user details without password
    const user = await User.findById(userId).select("-password_digest");

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Fetch user's expenses, incomes, and goals
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    const goals = await Goal.find({ userId }).sort({ createdAt: -1 });

    // Send combined response
    res.status(200).json({
      userId: user._id,
      username: user.username,
      email: user.email,
      dob: user.dob,
      totalMoney: user.totalMoney,
      expenses,
      incomes,
      goals,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ error: error.message });
  }
};
