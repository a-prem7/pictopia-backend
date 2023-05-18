import express from "express";
import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    if (name && email && password) {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashPassword });
      res.json({ msg: "user registered successfully", user: user });
    } else {
      res.status(400).json({ msg: "Please fill the required field" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      res.status(404).json({ msg: "user not found" });
    }
    const comparePassword = await bcrypt.compare(password, existUser.password);
    if (!comparePassword) {
      res.status(400).json({ msg: "Wrong Credentials" });
    }
    const token = jwt.sign({ id: existUser._id }, process.env.SECRET);
    res.status(201).json({ msg: "user logged in", token: token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
export default UserRouter;
