import "./config/polyfills.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import recipeRoutes from "./routes/recipe.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = ENV_VARS.PORT || 3000;

const allowedOrigins = (ENV_VARS.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

const allowDevFallback =
  !allowedOrigins.length && ENV_VARS.NODE_ENV !== "production";

app.use(helmet());
app.use(morgan("dev"));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/+$/, "");

      if (allowDevFallback) {
        if (normalizedOrigin.includes("localhost")) return callback(null, true);
      }

      if (allowedOrigins.includes(normalizedOrigin))
        return callback(null, true);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

let dbConnected = false;

const startServer = async () => {
  dbConnected = await connectDB();

  app.get("/health", (req, res) => {
    res.json({ ok: true, dbConnected });
  });

  app.listen(PORT, () => {
    console.log(`Backend Server running at http://localhost:${PORT}`);
    console.log(`DB connected: ${dbConnected}`);
  });
};

startServer();
