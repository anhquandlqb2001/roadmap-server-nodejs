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
const User_1 = __importDefault(require("../../entities/User"));
const findOneAndUpdateOrCreate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // kiem tra xem nguoi dung da ton tai chua
    const _user = yield User_1.default.findOne({ where: { email: data.email } });
    if (!_user) {
        const user = User_1.default.create(data);
        return yield user.save();
    }
    // cap nhat thong tin nguoi dung
    yield User_1.default.update({ email: data.email }, {
        extend: data.extend,
    });
    return yield User_1.default.findOne({ where: { email: data.email } });
});
exports.default = findOneAndUpdateOrCreate;
//# sourceMappingURL=findOneAndUpdateOrCreate.js.map