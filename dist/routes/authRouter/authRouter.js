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
const passport_1 = __importDefault(require("passport"));
const user_model_1 = __importDefault(require("./../../models/user.model"));
const verifyToken_1 = require("../../utils/verifyToken");
const mongoose_1 = __importDefault(require("mongoose"));
const authRouter = express_1.default.Router();
authRouter.get("/users", verifyToken_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find({}, "username email profile"); // Fetching only specific fields
        res.json(users);
    }
    catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
}));
authRouter.get("/users/:userId", verifyToken_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        // Check if the user ID is valid
        if (!userId || !mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        // Find the user by ID
        const user = yield user_model_1.default.findById(userId, "username email profile");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Failed to fetch user" });
    }
}));
authRouter.delete("/users/:userId", verifyToken_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        // Check if the user ID is valid
        if (!userId || !mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        // Find the user by ID and remove it
        const deletedUser = yield user_model_1.default.findByIdAndDelete({ _id: userId });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully", deletedUser });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Failed to delete user" });
    }
}));
authRouter.get("/", (req, res) => {
    res.json({ message: "You are not logged in" });
});
authRouter.get("/failed", (req, res) => {
    res.send("Failed");
});
authRouter.get("/success", (req, res) => {
    if (req.user && req.user.email) {
        res.send(`Welcome ${req.user.email}`);
    }
    else {
        res.send("Welcome");
    }
});
authRouter.get("/google", passport_1.default.authenticate("google", {
    scope: ["email", "profile"],
}));
authRouter.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/failed",
    successRedirect: "/success",
}), function (req, res, next) {
    return next;
});
authRouter.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map