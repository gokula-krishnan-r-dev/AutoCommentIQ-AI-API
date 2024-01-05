"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ytRoute_1 = __importDefault(require("./ytRouter/ytRoute"));
const bard_router_1 = __importDefault(require("./Bard-Router/bard-router"));
const RouterApp = express_1.default.Router();
RouterApp.use("/", ytRoute_1.default);
RouterApp.use("/", bard_router_1.default);
exports.default = RouterApp;
//# sourceMappingURL=route.js.map