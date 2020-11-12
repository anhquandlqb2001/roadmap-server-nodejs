"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const authenticateLocal = (req, res, next) => {
    passport_1.default.authenticate("local", { session: false }, function (err, user, info) {
        if (err)
            return next(err);
        if (info) {
            // console.log(info);
            req.info = info;
            return next();
        }
        if (!user)
            return res.redirect("/login");
        // return next()
        req.session.userID = user._id;
        console.log("session: ", req.session);
        console.log("user: ", req.user);
        req.logIn(user, function (err) {
            if (err)
                return next(err);
            return next();
        });
    })(req, res, next);
};
exports.default = authenticateLocal;
//# sourceMappingURL=authenticateLocal.js.map