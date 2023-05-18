import Content from "../models/ContentSchema.js";
import express from "express";
import getAuth from "../middleware/auth.js";

const ContentRouter = express.Router();
ContentRouter.use(express.json());

const response = (res, status, result) => {
  res.status(status).json(result);
};

ContentRouter.get("/", async (req, res) => {
  await Content.find()
    .then((result) => {
      response(res, 200, result);
    })
    .catch((err) => {
      response(res, 400, { error: err });
    });
});

ContentRouter.post("/create", getAuth, async (req, res) => {
  const { title, content, image } = req.body;
  if (title && content) {
    response(res, 200, { msg: "blog created" });
  }
});

export default ContentRouter;
