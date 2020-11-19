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
const mongoose_1 = __importDefault(require("mongoose"));
const road_model_1 = __importDefault(require("../models/road.model"));
const maps_1 = require("../lib/util/maps");
const user_model_1 = __importDefault(require("../models/user.model"));
const searchMapChange_1 = __importDefault(require("../lib/util/searchMapChange"));
const note_model_1 = __importDefault(require("../models/note.model"));
class RoadMapController {
    // async add_road(req: Request, res: Response) {
    //   const map = req.body.map;
    //   if (!map) {
    //     return res.status(404);
    //   }
    //   // kiem tra lo trinh da ton tai chua
    //   const road = await Road.findOne({ where: { name: map } });
    //   if (road) {
    //     return res.json({ success: false, message: "Lo trinh da ton tai" });
    //   }
    //   // tao lo trinh moi
    //   const _road = new Road();
    //   _road.name = map;
    //   await _road.save();
    //   res.json({ success: true });
    // }
    get_comments_by_page(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    add_comment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roadID = req.params.id;
                const road = yield road_model_1.default.findById(roadID);
                if (!road) {
                    return res
                        .status(404)
                        .json({ success: false, message: "Khong ton tai lo tirnh nay" });
                }
                const { text } = req.body;
                const userObjID = mongoose_1.default.Types.ObjectId(req.session.userID);
                road.comments.push({ userID: userObjID, text: text });
                // road.comments = [...road.comments, {userID: userObjID, text: text}]
                yield road.save();
                return res.json({ success: true });
            }
            catch (error) {
                console.log(error);
                return res.json({ success: false, message: "Co loi xay ra", err: error });
            }
        });
    }
    reply_comment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { text } = req.body;
            const commentID = req.params.commentID;
            const mapID = req.params.id;
            if (!text || !commentID) {
                return res.json({ succesS: false });
            }
            const userID = req.session.userID;
            const road = yield road_model_1.default.findById(mapID);
            const currentReplys = road.comments.id(commentID).reply;
            road.comments.id(commentID).reply = [
                ...currentReplys,
                { userID, text },
            ];
            road.comments.id(commentID).reply;
            yield road.save();
            return res.json({ success: true });
        });
    }
    vote_comment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const type = req.body.type;
                if (!type) {
                    return res.json({ succesS: false });
                }
                const mapID = req.params.id;
                const commentID = req.params.commentID;
                const userID = req.session.userID;
                const road = yield road_model_1.default.findById(mapID);
                const currentVotes = road.comments.id(commentID).vote;
                const voteIndex = currentVotes.findIndex((v) => v.userID.toString() === userID);
                if (voteIndex !== -1) {
                    // neu nguoi dung da vote
                    if (type !== currentVotes[voteIndex].type) {
                        // vote cua nguoi dung khac voi vote truoc do
                        road.comments.id(commentID).vote = currentVotes.map((v) => v.userID.toString() === userID
                            ? { userID: v.userID, type: type }
                            : v);
                        // } else { otherwise
                        road.comments.id(commentID).vote = road.comments
                            .id(commentID)
                            .vote.filter((v) => v.userID.toString() !== userID);
                    }
                }
                else {
                    // nguoi dung chua vote
                    road.comments.id(commentID).vote.push({ userID, type });
                }
                yield road.save();
                return res.json({ success: true });
            }
            catch (error) {
                console.log(error);
                res.json({ success: false, error });
            }
        });
    }
    star_map(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mapID = req.params.id;
                const road = yield road_model_1.default.findById(mapID);
                if (!road)
                    return res
                        .status(404)
                        .json({ success: false, message: "Khong ton tai lo trinh nay!" });
                const userID = req.session.userID;
                if (road.stars.findIndex((star) => star.toString() === userID) === -1) {
                    road.stars.push(userID);
                }
                else {
                    road.stars = road.stars.filter((star) => star.toString() !== userID);
                }
                yield road.save();
                return res.json({ success: true });
            }
            catch (error) {
                console.log(error);
                res.json({ success: false, error });
            }
        });
    }
    get_list_road(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roads = yield road_model_1.default.find({}).select("_id");
                if (roads.length <= 0) {
                    return res.json({
                        success: true,
                        message: "Khong co lo trinh nao ton tai!",
                    });
                }
                return res.json({ success: true, roadIDs: roads.map((r) => r._id) });
            }
            catch (error) {
                console.log(error);
                res.json({ success: false, error: error });
            }
        });
    }
    start_map(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mapID = req.params.id;
                if (!mapID) {
                    return res.status(404);
                }
                const user = yield user_model_1.default.findById(req.session.userID);
                if (user.maps.findIndex((map) => map.mapID.toString() === mapID) !== -1) {
                    return res.json({
                        success: false,
                        message: "Ban da bat dau lo trinh nay roi!",
                    });
                }
                user.maps.push({
                    mapID: mongoose_1.default.Types.ObjectId(mapID),
                    map: JSON.stringify(maps_1.ReactRoad),
                });
                yield user.save();
                return res.json({
                    success: true,
                    message: "Bat dau lo trinh moi thanh cong",
                });
            }
            catch (error) {
                console.log(error);
                res.json({ success: false, error });
            }
        });
    }
    //
    get_map(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = req.session.userID;
            const mapID = req.params.id;
            if (!mapID) {
                return res.status(404).json({ success: false });
            }
            const user = yield user_model_1.default.findById(userID);
            console.log(user.maps);
            const mapIndex = user.maps.findIndex((map) => map.mapID.toString() === mapID);
            if (mapIndex === -1) {
                return res.json({
                    success: false,
                    message: "Ban chua dang ky lo trinh nay",
                });
            }
            return res.json({
                success: true,
                data: {
                    map: user.maps[mapIndex].map,
                    _idMap: user.maps[mapIndex]._id,
                },
            });
        });
    }
    change_field_map(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = req.session.userID;
                const mapID = req.params.id;
                const _idMap = req.params.idMap;
                if (!mapID) {
                    return res.status(404).json({ success: false });
                }
                const user = yield user_model_1.default.findOne({ _id: userID, "maps._id": _idMap });
                if (!user)
                    return res
                        .status(404)
                        .json({ success: false, message: "Nguoi dung khong ton tai" });
                const { field, currentValue } = req.body;
                const newMap = searchMapChange_1.default(JSON.parse(user.maps.id(_idMap).map), field, !currentValue);
                user.maps.id(_idMap).map = JSON.stringify(newMap);
                yield user.save();
                return res.json({
                    success: true,
                    message: "Cap nhat thanh cong",
                });
            }
            catch (error) {
                console.log(error);
                res.json({ success: false, error });
            }
        });
    }
    note_post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { text } = req.body;
                const mapID = req.params.id;
                const ownerMapID = req.params.ownerMapID;
                if (!mapID || !text) {
                    return res.status(404).json({ success: false });
                }
                const userID = req.session.userID;
                const user = yield user_model_1.default.findOne({
                    _id: userID,
                    "maps._id": ownerMapID,
                    "maps.mapID": mapID,
                });
                console.log("user: ", user);
                if (!user) {
                    return res.status(404).json({ success: false });
                }
                const note = yield note_model_1.default.findOne({ userID, ownerMapID, mapID });
                if (!note) {
                    const _note = new note_model_1.default();
                    (_note.userID = mongoose_1.default.Types.ObjectId(userID)),
                        (_note.mapID = mongoose_1.default.Types.ObjectId(mapID));
                    _note.ownerMapID = mongoose_1.default.Types.ObjectId(ownerMapID);
                    _note.text = text;
                    yield _note.save();
                }
                else {
                    note.text = text;
                    yield note.save();
                }
                return res.json({ success: true });
            }
            catch (error) {
                console.log(error);
                res.json({ success: false, error });
            }
        });
    }
    get_note(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mapID = req.params.id;
                const ownerMapID = req.params.ownerMapID;
                const note = yield note_model_1.default.findOne({ mapID, ownerMapID });
                if (!note) {
                    return res.status(404).json({ success: false });
                }
                return res.json({
                    success: true,
                    data: { text: note.text, updatedAt: note.updatedAt },
                });
            }
            catch (error) {
                console.log(error);
                res.json({ success: false, error });
            }
        });
    }
}
exports.default = new RoadMapController();
//# sourceMappingURL=roadmap.js.map