"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formValidate = void 0;
exports.formValidate = (email, password) => {
    if (!email && !password) {
        return {
            success: false,
            errors: [
                { name: "email", error: "Email khong duoc de trong" },
                { name: "password", error: "Password khong duoc de trong" },
            ],
        };
    }
    if (!password) {
        return {
            success: false,
            errors: [{ name: "password", error: "Password khong duoc de trong" }],
        };
    }
    if (password.length <= 3) {
        return {
            success: false,
            errors: [{ name: "password", error: "Password phai dai hon 3 ki tu" }],
        };
    }
    if (!email) {
        return {
            success: false,
            errors: [{ name: "email", error: "Email khong duoc de trong" }],
        };
    }
    if (!email.includes("@")) {
        return {
            success: false,
            errors: [{ name: "email", error: "Vui long nhap dung email" }],
        };
    }
    if (email.slice(0, email.indexOf('@')).length <= 3) {
        return {
            success: false,
            errors: [{ name: "email", error: "Ten email phai dai hon 3 ki tu" }],
        };
    }
    return null;
};
//# sourceMappingURL=formValidate.js.map