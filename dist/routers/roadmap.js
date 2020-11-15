"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const roadmap_1 = __importDefault(require("../controllers/roadmap"));
const router = express_1.default.Router();
router.post("/add_map", roadmap_1.default.add_road);
router.post("/add_comment", isAuth_1.default, roadmap_1.default.add_comment);
router.post("/reply_comment", isAuth_1.default, roadmap_1.default.reply_comment);
router.post("/vote_comment", isAuth_1.default, roadmap_1.default.vote_comment);
router.post("/star_map", isAuth_1.default, roadmap_1.default.star_map);
exports.default = router;
//# sourceMappingURL=roadmap.js.map