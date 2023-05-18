import express from "express";
import User from "../models/UserSchema.js";

const UserRouter = express.Router();
UserRouter.use(express.json());

UserRouter.get("/", async (req, res) => {
  await User.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

UserRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.json({ msg: "user registered successfully", user: user });
  } catch (error) {
    res.json({ error: error });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email, password });
    if (!existUser) {
      res.status(404).json({ msg: "user not found" });
    }
    res.status(201).json({ msg: "user logged in", user: existUser });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
export default UserRouter;
