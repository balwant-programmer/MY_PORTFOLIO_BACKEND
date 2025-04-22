import express from "express";
import { config } from "dotenv";
config({ path: "./config/config.env" });
import cors from "cors";
import dbConnnection from "./db/dbConnection.js";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import blogroutes from "./routes/blogRoutes.js";
import aboutMeroutes from "./routes/aboutMeRoutes.js";
import skillRouter from "./routes/SkillRoutes.js";
import chatrouter from "./routes/chatsmsRoutes.js";
import projectRouter from "./routes/projectRoute/projectCreateRoutes.js";
import herorouter from "./routes/HeroLogoRoutes.js";

const PORT = process?.env?.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware
app.use(
  cors({
    origin: [
      process.env.PORT_FOLIO_URL,
      process.env.DASHBOARD_URL,

      "https://balwantgupta.netlify.app",
      "http://localhost:5173",
      "http://192.168.1.18:5173",
      "https://balwant-admin.netlify.app",
    ],
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
// API Endpoint
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogroutes);
app.use("/api/v1", aboutMeroutes);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/chat", chatrouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/hero", herorouter);
// Server Listener sm
app.listen(PORT, async (error) => {
  if (error) return console.error(error);
  await dbConnnection();
  console.log(`Server running on port ${process?.env?.PORT}`);
});
