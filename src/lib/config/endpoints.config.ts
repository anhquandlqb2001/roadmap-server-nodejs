import * as dotenv from "dotenv";
dotenv.config();

export default {
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  DATABASE_URI: process.env.DATABASE_URI_DEV,
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET
};
