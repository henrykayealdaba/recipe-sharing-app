import { ENV_VARS } from "../config/envVars.js";

export const isCrossSiteDeployment = () => {
  const clientOrigins = (ENV_VARS.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return clientOrigins.some((origin) => !origin.includes("localhost"));
};

export const getAuthCookieOptions = () => {
  const useCrossSiteCookie = isCrossSiteDeployment();

  return {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: useCrossSiteCookie ? "none" : "lax",
    secure: useCrossSiteCookie,
    partitioned: useCrossSiteCookie,
    path: "/",
  };
};
