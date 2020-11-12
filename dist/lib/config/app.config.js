"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
// import passport from "passport";
const endpoints_config_1 = __importDefault(require("./endpoints.config"));
const constants_1 = require("../util/constants");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const body_parser_1 = __importDefault(require("body-parser"));
const RedisStore = connect_redis_1.default(express_session_1.default);
const redis = new ioredis_1.default();
const config = (app) => {
    app.set("trust proxy", 1);
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            path: "/",
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET || "default<3",
        resave: false,
    }));
    app.use(cors_1.default({ credentials: true, origin: endpoints_config_1.default.CORS_ORIGIN }));
    app.use(express_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    // app.use(passport.initialize());
    // app.use(passport.session());
    // require("./passport.config")
};
exports.default = config;
//# sourceMappingURL=app.config.js.map