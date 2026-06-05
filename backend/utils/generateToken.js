import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

const isCrossSiteDeployment = () => {
  const clientOrigins = (ENV_VARS.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return clientOrigins.some((origin) => !origin.includes("localhost"));
};

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  const useCrossSiteCookie = isCrossSiteDeployment();

  res.cookie("jwt-recipe", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: useCrossSiteCookie ? "none" : "lax",
    secure: useCrossSiteCookie,
    path: "/",
  });

  return token;
};
