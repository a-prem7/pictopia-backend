import Blog from "../models/BlogSchema.js";
import express from "express";

const BlogRouter = express.Router();
BlogRouter.use(express.json());

export default BlogRouter;
