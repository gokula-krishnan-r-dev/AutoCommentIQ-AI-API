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
const dev_1 = require("../../config/dev");
const user_model_1 = __importDefault(require("./../../models/user.model"));
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "AutoCommentIQ";
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: dev_1.GOOGLE_CLIENT_ID,
    clientSecret: dev_1.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: [
        "email",
        "profile",
        "https://www.googleapis.com/auth/youtube",
        "https://www.googleapis.com/auth/youtube.force-ssl",
    ],
}, (request, accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_model_1.default.findOne({ googleId: profile === null || profile === void 0 ? void 0 : profile.id });
        if (!user) {
            user = new user_model_1.default({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.email,
                accessToken,
                refreshToken,
                profile,
                token: "", // Initialize token field
            });
            yield user.save();
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: "1h",
        }); // Modify expiry as needed
        // Update user's token field and save to MongoDB
        user.token = token;
        yield user.save();
        return done(null, user);
    }
    catch (err) {
        return done(err, null);
    }
})));
//# sourceMappingURL=passport.js.map