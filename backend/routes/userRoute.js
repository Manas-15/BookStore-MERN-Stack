//userRoute
import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, canLogin } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .send({ message: "Email and Password are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(422).send({ message: "Email already exists" });
    }

    const newUser = {
      email: email,
      password: hashedPassword,
      role: "owner",
      canLogin: canLogin ?? true,
    };

    const user = await User.create(newUser);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(422)
        .send({ message: "Email and Password are required" });
    }

    // Find the user
    const existedUser = await User.findOne({ email });

    if (!existedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existedUser.password
    );

    // Check credentials (NOTE: Insecure — see bcrypt below)
    if (!existedUser.canLogin) {
      return res.status(403).send({ message: "User is not allowed to login" });
    } else if (email !== existedUser.email || !isPasswordMatch) {
      return res.status(404).send({ message: "Invalid credentials" });
    }

    return res.status(200).send({ message: "User logged in successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
