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
exports.UserExtend = void 0;
const typeorm_1 = require("typeorm");
const user_type_1 = require("../lib/types/user.type");
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("../lib/util/constants");
const Road_1 = require("./Road");
class UserExtend {
}
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserExtend.prototype, "accessToken", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserExtend.prototype, "expiresIn", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserExtend.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], UserExtend.prototype, "picture", void 0);
exports.UserExtend = UserExtend;
let User = class User extends typeorm_1.BaseEntity {
    beforeInsert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.password) {
                this.password = yield bcrypt_1.default.hash(this.password, constants_1.SALT_ROUNDS);
            }
        });
    }
    verifyPassword(plainPwd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt_1.default.compare(plainPwd, this.password).then(function (result) {
                    if (!result) {
                        return false;
                    }
                    return true;
                });
            }
            catch (error) {
                console.log("error verifyPwd: ", error);
            }
        });
    }
    getIdString() {
        return this._id.toString();
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], User.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "noteText", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Road_1.Maps)
], User.prototype, "maps", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", UserExtend)
], User.prototype, "extend", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "beforeInsert", null);
User = __decorate([
    typeorm_1.Entity({ name: "users" })
], User);
exports.default = User;
//# sourceMappingURL=User.js.map