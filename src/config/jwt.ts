import dotenv from "dotenv";
dotenv.config();

export default {
  secret: process.env.JWT_SECRET || "hell0_w0rld",
  expires_in: process.env.JWT_TOKEN_EXPIRES_IN_HOURS || "1h",
};
