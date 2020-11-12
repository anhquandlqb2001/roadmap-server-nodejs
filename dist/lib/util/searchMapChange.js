"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recursiveSearch = (obj, searchKey, valueChange) => {
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (key === searchKey && typeof value !== "object") {
            obj[key] = valueChange;
        }
        else if (typeof value === "object") {
            recursiveSearch(value, searchKey, valueChange);
        }
    });
    return obj;
};
exports.default = recursiveSearch;
//# sourceMappingURL=searchMapChange.js.map