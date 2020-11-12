"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers"));
const app_config_1 = __importDefault(require("./lib/config/app.config"));
const typeorm_1 = require("typeorm");
// const app = express();
// const PORT = process.env.PORT || 5000
// mongoose.connect(process.env.DATABASE_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });
// const db = mongoose.connection
// db.on("error", () => console.log("error"))
// db.once("open", () => console.log("connected to database"))
// appConfig(app)
// Routes(app)
// app.get("/", async (req, res) => {
//   UserReactRoad.findOne({}, (err, result) => {
//     if (err) {
//       return console.log(err);
//     }
//     return res.json(result);
//   });
// });
// app.post("/", async (req, res) => {
//   console.log(req.body);
//   const user = await UserReactRoad.findOne({ username: req.body.username });
//   const newUser = recursiveSearch(user, req.body.field, !req.body.currentValue);
//   await UserReactRoad.replaceOne({ username: req.body.username }, newUser);
//   return res.json("update success");
// });`
// console.log("Test");
// app.listen(PORT, () => console.log(`server on localhost:${PORT}`));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: "mongodb",
        host: "localhost",
        database: "roadmap",
        synchronize: true,
        logging: true,
        useUnifiedTopology: true,
        entities: ["dist/entities/**/*.js"],
        migrations: ["dist/migration/**/*.js"],
    })
        .then(() => console.log("Connected db"))
        .catch((err) => console.log("db err: ", err));
    const app = express_1.default();
    const PORT = process.env.PORT || 5000;
    app_config_1.default(app);
    routers_1.default(app);
    app.listen(PORT, () => console.log(`server on localhost:${PORT}`));
});
main().catch((e) => console.log(e));
//# sourceMappingURL=index.js.map