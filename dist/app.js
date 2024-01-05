"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/route"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const authRouter_1 = __importDefault(require("./routes/authRouter/authRouter"));
const passport = require("passport");
const app = (0, express_1.default)();
const port = 3000;
// const connectToMongoDB = require("./services/db/Mongodb"); // Import the module
const MONGODB_URI = "mongodb+srv://gokula:vtEmjsXnqZrqf2rv@cluster0.klfb9oe.mongodb.net/?retryWrites=true&w=majority";
mongoose_1.default.connect(MONGODB_URI, {
// useNewUrlParser: true,
// useUnifiedTopology: true,
});
const connectToMongoDB = mongoose_1.default.connection;
connectToMongoDB.on("error", console.error.bind(console, "MongoDB connection error:"));
connectToMongoDB.once("open", () => {
    console.log("Connected to MongoDB");
});
require("./services/passport/passport");
app.use((0, express_session_1.default)({
    secret: "waytobigsecret",
    resave: false,
    saveUninitialized: false,
    // Add any other configurations needed
}));
app.use(passport.initialize()); // init passport on every route call
app.use(passport.session()); //allow passport to use "express-session"
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/v1", route_1.default);
app.use("/auth", authRouter_1.default);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map