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
  try {
    const { title, content, image } = req.body;
    if (title && content) {
      const content = new Content({
        title,
        content,
        image,
        user: req.userId,
      });
      await blog.save();
      response(res, 200, { msg: "blog created", content: content });
    }
  } catch (error) {
    response(res, 400, { error: error });
  }
});
export default ContentRouter;
