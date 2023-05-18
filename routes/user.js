import express from "express";
import User from "../models/UserSchema.js";

const UserRouter = express.Router();
UserRouter.use(express.json());

UserRouter.get("/", async (req, res) => {
  await User.find();
});

UserRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.json({ msg: "user registered successfully", user: user });
  } catch (error) {
    res.json({ msg: error });
  }
});

export default UserRouter;
