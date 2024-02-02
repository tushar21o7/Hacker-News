import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.options("*", cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (res) => res.send("Home"));

// import middlewares
import { verifyJWT } from "./middlewares/auth.middleware.js";

// import routes
import userRouter from "./routes/user.route.js";
import newsRouter from "./routes/news.route.js";

// use routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/news", verifyJWT, newsRouter);

export default app;
