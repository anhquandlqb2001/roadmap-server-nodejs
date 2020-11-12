"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roadmap_1 = __importDefault(require("../controllers/roadmap"));
const router = express_1.default.Router();
router.post("/add_map", roadmap_1.default.add_map);
exports.default = router;
//# sourceMappingURL=roadmap.js.map