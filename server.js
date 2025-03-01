import express from "express";
import { config } from "dotenv";
config({ path: "./config/config.env" });
import cors from "cors";
import dbConnnection from "./db/dbConnection.js";
import userRouter from "./routes/userRoute.js";
import blogroutes from "./routes/blogRoutes.js";
import aboutMeroutes from "./routes/aboutMeRoutes.js";
import skillRouter from "./routes/SkillRoutes.js";
import chatrouter from "./routes/chatsmsRoutes.js";
import projectRouter from "./routes/projectRoute/projectCreateRoutes.js";
import herorouter from "./routes/HeroLogoRoutes.js";
import cookieParser from "cookie-parser";

const PORT = process?.env?.PORT || 8000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      process.env.PORT_FOLIO_URL,
      process.env.DASHBOARD_URL,
      process.env.OTHER_URL,
    ],
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogroutes);
app.use("/api/v1", aboutMeroutes);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/chat", chatrouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/hero", herorouter);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

app.listen(PORT, async (error) => {
  if (error) {
    console.error("Server startup error:", error);
    return;
  }

  try {
    await dbConnnection();
    console.log(`Server running on port ${PORT}`);
  } catch (dbError) {
    console.error("Database connection failed:", dbError);
  }
});
