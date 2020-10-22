import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import endpoint from './endpoints.config'
import Routes from './routers'
import { COOKIE_NAME } from "./lib/util/constants";
import recursiveSearch from "./lib/util/searchMapChange";


const app = express();
const PORT = process.env.PORT || 5000

const RedisStore = connectRedis(session);
const redis = new Redis();
app.set("trust proxy", 1);

const db = mongoose.createConnection(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const UserReactRoad = db.collection("reactroad");

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

app.use(cors({ credentials: true, origin: endpoint.CORS_ORIGIN }));
app.use(express.json());


Routes(app)

app.get("/", async (req, res) => {
  UserReactRoad.findOne({}, (err, result) => {
    if (err) {
      return console.log(err);
    }
    return res.json(result);
  });
});


app.post("/", async (req, res) => {
  console.log(req.body);
  const user = await UserReactRoad.findOne({ username: req.body.username });
  const newUser = recursiveSearch(user, req.body.field, !req.body.currentValue);
  await UserReactRoad.replaceOne({ username: req.body.username }, newUser);

  return res.json("update success");
});


app.listen(PORT, () => console.log(`server on localhost:${PORT}`));

