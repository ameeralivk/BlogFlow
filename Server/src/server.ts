import express from "express";
import morgan from "morgan";
import connectDB from "./config/db";
import cors from "cors";
import userAuthRouter from "./routes/userAuthRouter";
import postRouter from "./routes/postRouter";
import { errorHandler } from "./middleware/errorHandler";
import { connectRedis } from "./config/redisClient";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
// const url = process.env.FRONTED_URL;
// if (url) {
//   app.use(
//     cors({
//       origin: [url],
//       credentials: true,
//     }),
//   );
// }
app.use(cors({
  origin: [
    "https://blog-flow-three.vercel.app",
    "https://blog-flow-fw5if6ytj-ameer-ali-vks-projects.vercel.app",
  ],
  credentials: true
}));
connectDB();
connectRedis();

app.use("/api/user/auth", userAuthRouter);
app.use("/api/posts", postRouter);

app.use(errorHandler);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server created at ${port}`);
});
