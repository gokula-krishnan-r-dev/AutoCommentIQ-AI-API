"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dev_1 = require("../config/dev");
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Get token from Authorization header
    if (!token) {
        return res.status(403).json({ message: "Token is required" });
    }
    jsonwebtoken_1.default.verify(token, dev_1.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Failed to authenticate token" });
        }
        req.user = decoded; // Set the decoded user information on the request object
        next();
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map