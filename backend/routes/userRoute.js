import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(422)
        .send({ message: "Email and Password are required" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      email: req.body.email,
      password: hashedPassword,
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
    if (email !== existedUser.email || !isPasswordMatch) {
      return res.status(404).send({ message: "Invalid credentials" });
    }

    return res.status(200).send({ message: "User logged in successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
