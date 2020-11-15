"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Road_1 = __importStar(require("../entities/Road"));
const mongoose_1 = __importDefault(require("mongoose"));
const typeorm_1 = require("typeorm");
class RoadMapController {
    add_road(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = req.body.map;
            if (!map) {
                return res.status(404);
            }
            // kiem tra lo trinh da ton tai chua
            const road = yield Road_1.default.findOne({ where: { name: map } });
            if (road) {
                return res.json({ success: false, message: "Lo trinh da ton tai" });
            }
            // tao lo trinh moi
            const _road = new Road_1.default();
            _road.name = map;
            yield _road.save();
            res.json({ success: true });
        });
    }
    get_comments_by_page(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    add_comment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { commentText, map } = req.body;
                const road = yield Road_1.default.findOne({ where: { name: map } });
                const userID = req.session.userID;
                const userObjID = mongoose_1.default.Types.ObjectId(userID);
                const newComment = new Road_1.Comment();
                newComment.userID = userObjID;
                newComment.text = commentText;
                road.comments = [...road.comments, newComment];
                yield road.save();
                return res.json({ success: true });
            }
            catch (error) {
                return res.json({ success: false, message: "Co loi xay ra", err: error });
            }
        });
    }
    reply_comment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { commentReplyText, commentID } = req.body;
            const userID = req.session.userID;
            const userObjID = mongoose_1.default.Types.ObjectId(userID);
            const road = yield Road_1.default.findOne({
                where: { "comments._id": mongoose_1.default.Types.ObjectId(commentID) },
            });
            const cmtIndex = road.comments.findIndex((comment) => comment._id.toString() === commentID);
            const oldReply = road.comments[cmtIndex].reply;
            yield typeorm_1.getMongoRepository(Road_1.default).findOneAndUpdate({
                "comments._id": mongoose_1.default.Types.ObjectId(commentID),
            }, {
                $set: {
                    "comments.$.reply": [
                        ...oldReply,
                        {
                            _id: mongoose_1.default.Types.ObjectId(),
                            userID: userObjID,
                            commentText: commentReplyText,
                        },
                    ],
                },
            });
            return res.json({ success: true });
        });
    }
    vote_comment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { commentID, type } = req.body;
            const userID = req.session.userID;
            const userObjID = mongoose_1.default.Types.ObjectId(userID);
            const road = yield Road_1.default.findOne({
                where: { "comments._id": mongoose_1.default.Types.ObjectId(commentID) },
            });
            const cmtIndex = road.comments.findIndex((comment) => comment._id.toString() === commentID);
            const oldVote = road.comments[cmtIndex].vote;
            const findIndex = oldVote.findIndex((vote) => vote.userID.toString() === userID);
            if (findIndex === -1) {
                console.log('here');
                yield typeorm_1.getMongoRepository(Road_1.default).findOneAndUpdate({
                    "comments._id": mongoose_1.default.Types.ObjectId(commentID),
                }, {
                    $set: {
                        "comments.$.vote": [...oldVote, { userID: userObjID, type: type }],
                    },
                });
                return res.json({ success: true });
            }
            const newVote = oldVote.map(vote => {
                if (vote.userID.toString() === userID) {
                    return Object.assign(Object.assign({}, vote), { type: type });
                }
                return vote;
            });
            yield typeorm_1.getMongoRepository(Road_1.default).findOneAndUpdate({
                "comments._id": mongoose_1.default.Types.ObjectId(commentID),
            }, {
                $set: {
                    "comments.$.vote": newVote,
                },
            });
            return res.json({ success: true });
        });
    }
    star_map(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userObjID = mongoose_1.default.Types.ObjectId(req.session.userID);
        });
    }
}
exports.default = new RoadMapController();
//# sourceMappingURL=roadmap.js.map