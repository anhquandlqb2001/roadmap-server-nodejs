import * as dotenv from "dotenv";
dotenv.config();

export default {
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  DATABASE_URI: process.env.DATABASE_URI_DEV
};
