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
exports.Maps = exports.Comment = exports.Star = exports.Vote = void 0;
const map_type_1 = require("../lib/types/map.type");
const typeorm_1 = require("typeorm");
class Vote {
}
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], Vote.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Vote.prototype, "type", void 0);
exports.Vote = Vote;
class Star {
}
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], Star.prototype, "_id", void 0);
exports.Star = Star;
class Comment {
}
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], Comment.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Vote)
], Comment.prototype, "vote", void 0);
exports.Comment = Comment;
class ReactMap {
}
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], ReactMap.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], ReactMap.prototype, "map", void 0);
class FrontEndMap {
}
class Maps {
}
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", ReactMap)
], Maps.prototype, "react", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", FrontEndMap)
], Maps.prototype, "frontend", void 0);
exports.Maps = Maps;
let Road = class Road extends typeorm_1.BaseEntity {
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
    typeorm_1.Column(),
    __metadata("design:type", Comment)
], Road.prototype, "comments", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Star)
], Road.prototype, "stars", void 0);
Road = __decorate([
    typeorm_1.Entity({ name: "roads" })
], Road);
exports.default = Road;
//# sourceMappingURL=Road.js.map