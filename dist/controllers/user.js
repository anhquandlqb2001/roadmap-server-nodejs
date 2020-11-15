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
const user_type_1 = require("../lib/types/user.type");
const findOneAndUpdateOrCreate_1 = __importDefault(require("../lib/util/findOneAndUpdateOrCreate"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../entities/User"));
const maps_1 = require("../lib/util/maps");
const searchMapChange_1 = __importDefault(require("../lib/util/searchMapChange"));
const map_type_1 = require("../lib/types/map.type");
const logout_1 = __importDefault(require("../lib/util/logout"));
const getUserByRoadName_1 = __importDefault(require("../lib/util/getUserByRoadName"));
/**
 * /user/...
 **/
// kiem tra xem nguoi dung da dang ki lo trinh chua
// neu chua => return false
function checkStartMap(user, map) {
    var _a, _b, _c, _d;
    switch (map) {
        case map_type_1.EMap.React:
            if ((_a = user.maps) === null || _a === void 0 ? void 0 : _a.react)
                return { isTrue: true, _map: (_b = user.maps) === null || _b === void 0 ? void 0 : _b.react };
            break;
        case map_type_1.EMap.FrontEnd:
            if ((_c = user.maps) === null || _c === void 0 ? void 0 : _c.frontend)
                return { isTrue: true, _map: (_d = user.maps) === null || _d === void 0 ? void 0 : _d.frontend };
            break;
        default:
            return { isTrue: false, _map: null };
    }
}
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
            const user = yield User_1.default.findOne({ where: { email } });
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
                data: { email: user.email },
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
                data: { email: user.email },
            });
        });
    }
    // GET: Kiem tra thong tin nguoi dung trong session neu ton tai
    current(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const userID = req.session.userID;
            if (!userID)
                return res.json({ userid: null });
            const user = yield User_1.default.findOne({
                where: { _id: mongoose_1.default.Types.ObjectId(userID) },
            });
            if (!user) {
                return res.json({ success: false, user: null });
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
            const _user = yield User_1.default.findOne({ where: { email } });
            if (_user) {
                return res.json({
                    success: false,
                    errors: [{ name: "email", error: "Email da ton tai" }],
                });
            }
            // thuc hien tao user moi
            try {
                const user = User_1.default.create({ email, password, provider: user_type_1.EProvider.Local });
                yield user.save();
            }
            catch (error) {
                console.log(error);
                return error;
            }
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
    //
    start_map(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = req.body.map;
            if (!map) {
                return res.status(404);
            }
            const userID = req.session.userID;
            // let user;
            // switch (map) {
            //   case EMap.React:
            //     user = await User.findOne({
            //       where: { _id: mongoose.Types.ObjectId(userID) },
            //     });
            //     break;
            //   default:
            //     break;
            // }
            const user = yield getUserByRoadName_1.default(map, userID);
            user.maps = Object.assign(Object.assign({}, user.maps), { react: maps_1.ReactRoad });
            yield user.save();
            return res.json({
                success: true,
                message: "Bat dau lo trinh moi thanh cong",
            });
        });
    }
    get_map(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = req.session.userID;
            const user = yield User_1.default.findOne({
                where: { _id: mongoose_1.default.Types.ObjectId(userID) },
            });
            if (!user) {
                return logout_1.default(req, res);
            }
            const map = req.params.map;
            const { isTrue, _map } = checkStartMap(user, map);
            if (!isTrue) {
                return res.json({
                    success: false,
                    message: "Ban chua dang ky lo trinh nay",
                });
            }
            return res.json({
                success: true,
                map: _map,
            });
        });
    }
    change_field_react_map(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = req.session.userID;
            const userObjectID = mongoose_1.default.Types.ObjectId(userID);
            const user = yield User_1.default.findOne({ where: { _id: userObjectID } });
            const newMap = searchMapChange_1.default(user.maps.react, req.body.field, !req.body.currentValue);
            yield User_1.default.update({ _id: userObjectID }, { maps: { react: newMap } });
            return res.json("update success");
        });
    }
    change_field_map(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = req.session.userID;
            const userObjectID = mongoose_1.default.Types.ObjectId(userID);
            const map = req.params.map;
            const user = yield User_1.default.findOne({ where: { _id: userObjectID } });
            if (!user)
                return logout_1.default(req, res);
            const { isTrue, _map } = checkStartMap(user, map);
            if (!isTrue) {
                return res.json({
                    success: false,
                    message: "Ban chua dang ky lo trinh nay",
                });
            }
            const newMap = searchMapChange_1.default(_map, req.body.field, !req.body.currentValue);
            yield User_1.default.update({ _id: userObjectID }, { maps: { react: newMap } });
            return res.json({
                success: true,
                message: "Cap nhat thanh cong",
            });
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.js.map