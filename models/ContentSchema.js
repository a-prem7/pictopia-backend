import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Content = mongoose.model("Content", contentSchema);

export default Content;
