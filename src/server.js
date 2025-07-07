import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import ConnectDB from "../src/configs/connectDB.js";
import { routers } from "./routers/index.js";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Quá nhiều request, vui lòng thử lại sau!",
});

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(limiter);
app.use("/user", routers.user);
app.use("/department", routers.department);
app.use("/handoverRecord", routers.handoverRecord);
app.use("/handoverItem", routers.handoverItem);
app.get("/", (req, res) => {
  res.send("Hello, World!!!!");
});
ConnectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
