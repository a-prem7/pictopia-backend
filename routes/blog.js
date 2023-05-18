import Blog from "../models/BlogSchema.js";
import express from "express";

const BlogRouter = express.Router();
BlogRouter.use(express.json());

const response = (res, status, result) => {
  res.status(status).json(result);
};

BlogRouter.get("/", async (req, res) => {
  await Blog.find()
    .then((result) => {
      response(res, 200, result);
    })
    .catch((err) => {
      response(res, 400, { error: err });
    });
});

export default BlogRouter;
