"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const roadmap_1 = __importDefault(require("../controllers/roadmap"));
const router = express_1.default.Router();
// router.post("/add_map", RoadMapController.add_road)
// them binh luan
router.put("/:id/comment", isAuth_1.default, roadmap_1.default.add_comment);
// tra loi binh luan
router.put("/:id/comment/:commentID/reply", isAuth_1.default, roadmap_1.default.reply_comment);
// vote binh luan
router.put("/:id/comment/:commentID/vote", isAuth_1.default, roadmap_1.default.vote_comment);
// binh chon road
router.put("/:id/star", isAuth_1.default, roadmap_1.default.star_map);
// lay du lieu road
router.get("/list", roadmap_1.default.get_list_road);
// bat dau road moi
router.put("/:id/start", isAuth_1.default, roadmap_1.default.start_map);
//
router.get("/:id", isAuth_1.default, roadmap_1.default.get_map);
// cap nhat lo trinh
router.put("/:id/:idMap", roadmap_1.default.change_field_map);
// ghji chu
router.post("/:id/:ownerMapID/note", roadmap_1.default.note_post);
router.get("/:id/:ownerMapID", roadmap_1.default.get_note);
exports.default = router;
//# sourceMappingURL=roadmap.js.map