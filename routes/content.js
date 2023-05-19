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
      const newContent = new Content({
        title,
        content,
        image,
        user: req.userId,
      });
      await newContent.save();
      response(res, 200, { msg: "blog created", content: newContent });
    }
  } catch (error) {
    response(res, 400, { error: error });
  }
});

ContentRouter.delete("/delete/:id", getAuth, async (req, res) => {
  try {
    const newContent = await Content.findOneAndDelete({
      user: req.userId,
      _id: req.params.id,
    });
    if (!newContent) {
      return response(res, 404, { error: "blog not found" });
    }
    response(res, 200, { msg: "blog deleted!" });
  } catch (error) {
    response(res, 400, { error: error });
  }
});

ContentRouter.put("/update/:id", getAuth, async (req, res) => {
  const { title, content, image } = req.body;
  await Content.findOneAndUpdate(
    { user: req.userId, _id: req.params.id },
    {
      title,
      content,
      image,
    }
  )
    .then((result) =>
      response(res, 200, { msg: "blog updated", content: result })
    )
    .catch((err) => response(res, 400, err));
});
ContentRouter.get("/:id", getAuth, async (req, res) => {
  await Content.findById(req.params.id)
    .populate("user", "-password")
    .then((result) => response(res, 200, result))
    .catch((err) => response(res, 400, { error: err }));
});

export default ContentRouter;
