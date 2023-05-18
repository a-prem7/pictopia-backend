import express from "express";
import dotenv from "dotenv";
// pull PORT from .env, give default value of 4000
// pull MONGODB_URL from .env
dotenv.config();
const { PORT = 4000, MONGODB_URL } = process.env;
// import express

// create application object
const app = express();
// import mongoose
import mongoose from "mongoose";
// import middlware
import cors from "cors";
import UserRouter from "./routes/user.js";
import ContentRouter from "./routes/content.js";
import morgan from "morgan";

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

//////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors({ credentials: true })); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies
app.use(express.urlencoded({ extended: true }));
// Using Routes
app.use("/backend/user", UserRouter);
app.use("/backend/content", ContentRouter);

// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
