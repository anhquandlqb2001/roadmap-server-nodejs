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
// them binh luan
router.put("/:id/comment", isAuth_1.default, roadmap_1.default.add_comment);
// tra loi binh luan
router.put("/:id/comment/:commentID/reply", isAuth_1.default, roadmap_1.default.reply_comment);
// vote binh luan
router.put("/:id/comment/:commentID/vote", isAuth_1.default, roadmap_1.default.vote_comment);
// binh chon road
router.put("/:id/star", isAuth_1.default, roadmap_1.default.star_map);
// lay du lieu road
router.get("/:id/list", roadmap_1.default.get_list_road);
exports.default = router;
//# sourceMappingURL=roadmap.js.map