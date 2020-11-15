"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maps = exports.Comment = exports.Vote = exports.EVote = void 0;
const map_type_1 = require("../lib/types/map.type");
const typeorm_1 = require("typeorm");
const mongoose_1 = require("mongoose");
var EVote;
(function (EVote) {
    EVote["Upvote"] = "UPVOTE";
    EVote["Downvote"] = "DOWNVOTE";
})(EVote = exports.EVote || (exports.EVote = {}));
class Vote {
}
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], Vote.prototype, "userID", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Vote.prototype, "type", void 0);
exports.Vote = Vote;
class CommentBase {
    constructor() {
        this._id = new mongoose_1.mongo.ObjectId();
    }
}
__decorate([
    typeorm_1.ObjectIdColumn({ default: true }),
    __metadata("design:type", typeorm_1.ObjectID)
], CommentBase.prototype, "_id", void 0);
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], CommentBase.prototype, "userID", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CommentBase.prototype, "text", void 0);
class Comment extends CommentBase {
    constructor() {
        super(...arguments);
        this.reply = [];
        this.vote = [];
    }
}
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Array)
], Comment.prototype, "reply", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Array)
], Comment.prototype, "vote", void 0);
exports.Comment = Comment;
class Maps {
}
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Maps.prototype, "react", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Maps.prototype, "frontend", void 0);
exports.Maps = Maps;
let Road = class Road extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.comments = [];
        this.stars = [];
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], Road.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Road.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Array)
], Road.prototype, "comments", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Array)
], Road.prototype, "stars", void 0);
Road = __decorate([
    typeorm_1.Entity({ name: "roads" })
], Road);
exports.default = Road;
//# sourceMappingURL=Road.js.map