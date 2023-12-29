import express, { Request, Response } from "express";
import RouterApp from "./routes/route";
import mongoose from "mongoose";
import session from "express-session";
import axios from "axios";
import authRouter from "./routes/authRouter/authRouter";
const passport = require("passport");
const app = express();
const port = 3000;
// const connectToMongoDB = require("./services/db/Mongodb"); // Import the module
const MONGODB_URI =
  "mongodb+srv://gokula:vtEmjsXnqZrqf2rv@cluster0.klfb9oe.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const connectToMongoDB = mongoose.connection;

connectToMongoDB.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
connectToMongoDB.once("open", () => {
  console.log("Connected to MongoDB");
});
require("./services/passport/passport");

app.use(
  session({
    secret: "waytobigsecret",
    resave: false,
    saveUninitialized: false,
    // Add any other configurations needed
  })
);
app.use(passport.initialize()); // init passport on every route call
app.use(passport.session()); //allow passport to use "express-session"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", RouterApp);
app.use("/auth", authRouter);
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
