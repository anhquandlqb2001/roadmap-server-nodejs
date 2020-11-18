"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const user_1 = __importDefault(require("../controllers/user"));
const router = express_1.default.Router();
router.post("/note", isAuth_1.default, user_1.default.note_post);
router.post("/login_local", user_1.default.login_local);
router.post("/login_facebook", user_1.default.login_facebook);
router.post("/register", user_1.default.register);
router.get("/current", user_1.default.current);
router.post("/logout", user_1.default.logout);
router.post("/startmap", user_1.default.start_map);
router.get("/get_map/:map", user_1.default.get_map);
// router.post("/:map", UserController.change_field_map)
router.post("/react", user_1.default.change_field_react_map);
exports.default = router;
//# sourceMappingURL=user.js.map