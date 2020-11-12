"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const logout = (req, res) => {
    new Promise((_, __) => {
        req.session.destroy((err) => {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (err) {
                return res.status(500).json({ message: "fail: ", err });
            }
            return res.json({ message: "ok" });
        });
    });
};
exports.default = logout;
//# sourceMappingURL=logout.js.map