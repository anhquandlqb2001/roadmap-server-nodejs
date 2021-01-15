import { Application } from "express";
import session from "express-session";
import { COOKIE_NAME } from "../util/constants";
import cors from 'cors'
import express from 'express'
import connectRedis from "connect-redis";
import Redis from "ioredis";
import bodyParser from 'body-parser'
import passport from "passport";


const RedisStore = connectRedis(session);
const redis = new Redis();

const config = (app: Application) => {

  app.set("trust proxy", 1);
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: false, // cookie only works in https
        path: "/",
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || "default<3",
      resave: false,
    })
  );
  app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://localhost:3001"] }));
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  require("./passport.config")
  app.use(passport.initialize());
  app.use(passport.session());
}

export default config