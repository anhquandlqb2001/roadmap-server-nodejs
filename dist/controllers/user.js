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
const formValidate_1 = require("../lib/util/formValidate");
const findOneAndUpdateOrCreate_1 = __importDefault(require("../lib/util/findOneAndUpdateOrCreate"));
const user_model_1 = __importDefault(require("../models/user.model"));
const logout_1 = __importDefault(require("../lib/util/logout"));
const form_type_1 = require("../types/form.type");
/**
 * /user/...
 **/
class UserController {
    // POST: Dang nhap voi tai khoan local
    login_local(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            // kiem tra thong tin dang nhap
            const errors = formValidate_1.formValidate(email, password);
            if (errors) {
                return res.json(errors);
            }
            // Kiem tra email co ton tai
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                return res.json({
                    success: false,
                    errors: [
                        { name: "email", error: "Sai tai khoan hoac mat khau" },
                        { name: "password", error: "Sai tai khoan hoac mat khau" },
                    ],
                });
            }
            // Kiem tra mat khau
            if (!(yield user.verifyPassword(password))) {
                return res.json({
                    success: false,
                    errors: [{ name: "password", error: "Sai mat khau" }],
                });
            }
            // dang nhap thanh cong
            req.session.userID = user._id;
            return res.json({
                success: true,
                data: { email: user.email, provider: user.provider },
            });
        });
    }
    // POST: Dang nhap voi facebook
    login_facebook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield findOneAndUpdateOrCreate_1.default(req.body);
            // dang nhap thanh cong
            req.session.userID = user._id;
            return res.json({
                success: true,
                data: { email: user.email, provider: form_type_1.EProvider.Facebook },
            });
        });
    }
    // GET: Kiem tra thong tin nguoi dung trong session neu ton tai
    current(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const userID = req.session.userID;
            if (!userID)
                return res.json({ user: null });
            const user = yield user_model_1.default.findById(userID);
            if (!user) {
                return res.json({ user: null });
            }
            const extend = {
                name: (_a = user.extend) === null || _a === void 0 ? void 0 : _a.name,
                picture: (_b = user.extend) === null || _b === void 0 ? void 0 : _b.picture,
            };
            return res.json({
                success: true,
                user: {
                    email: user.email,
                    extend: extend,
                    jwt: "aloalo123",
                    provider: user.provider,
                },
            });
        });
    }
    // POST: Dang ky - Provider: local
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const errors = formValidate_1.formValidate(email, password);
            // kiem tra thong tin dang nhap
            if (errors) {
                return res.json(errors);
            }
            // kiem tra xem email da ton tai chua
            const _user = yield user_model_1.default.findOne({ email });
            if (_user) {
                return res.json({
                    success: false,
                    errors: [{ name: "email", error: "Email da ton tai" }],
                });
            }
            // thuc hien tao user moi
            const user = new user_model_1.default();
            user.email = email;
            user.password = password;
            user.provider = form_type_1.EProvider.Local;
            yield user.save();
            return res.json({
                success: true,
                message: "Dang ky tai khoan thanh cong",
            });
        });
    }
    // POST: Dang xuat
    logout(req, res) {
        return logout_1.default(req, res);
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.js.map