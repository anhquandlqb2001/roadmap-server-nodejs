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
const user_model_1 = __importDefault(require("../../models/user.model"));
const findOneAndUpdateOrCreate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // kiem tra xem nguoi dung da ton tai chua
    const _user = yield user_model_1.default.findOne({ email: data.email });
    if (!_user) {
        // neu chua ton tai
        const user = yield user_model_1.default.create(data);
        return user;
        // await user.save();
    }
    // cap nhat thong tin nguoi dung
    const user = yield user_model_1.default.updateOne({ email: data.email }, { extend: data.extend });
    return user;
    // return await User.findOne({ where: { email: data.email } });
});
exports.default = findOneAndUpdateOrCreate;
//# sourceMappingURL=findOneAndUpdateOrCreate.js.map