import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";

const getAuth = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (token) {
      console.log({ token: token });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "unauthorized" });
  }
};

export default getAuth;
