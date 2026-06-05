import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { getAuthCookieOptions } from "./cookieOptions.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  res.cookie("jwt-recipe", token, {
    ...getAuthCookieOptions(),
  });

  return token;
};
