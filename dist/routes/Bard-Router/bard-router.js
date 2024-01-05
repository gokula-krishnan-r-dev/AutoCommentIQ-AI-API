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
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../../utils/verifyToken");
const { BardAPI } = require("bard-api-node");
const bardRouter = express_1.default.Router();
bardRouter.get("/bard", verifyToken_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.query;
    try {
        // const response = await Bard.ask(String(message));
        function testAssistant() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const assistant = new BardAPI();
                    // Set session information for authentication
                    yield assistant.setSession("__Secure-1PSID", "eQg7cjJw8y9ZDH-BkMNYxNLoNFKmi8FjIVwqeqg7q5YHoIy07KJIW3GRf2i31evWEdgfaw.");
                    const response = yield assistant.getBardResponse(message);
                    console.log("Bard:", response.content);
                    return res.send(response);
                }
                catch (error) {
                    console.error("Error:", error);
                }
            });
        }
        testAssistant();
    }
    catch (error) {
        console.error("Error asking Bard AI:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = bardRouter;
//# sourceMappingURL=bard-router.js.map