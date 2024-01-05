import express, { Request, Response } from "express";
import RouterApp from "./routes/route";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import authRouter from "./routes/authRouter/authRouter";
const cookieParser = require("cookie-parser");
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
const { Hercai } = require("hercai");

const herc = new Hercai(); //new Hercai("your api key"); => Optional

/* Available Models */
/* "v3-beta" , "gemini" */
/* Default Model; "v3-beta" */

const connectToMongoDB = mongoose.connection;

connectToMongoDB.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
connectToMongoDB.once("open", () => {
  console.log("Connected to MongoDB");
});
require("./services/passport/passport");
app.use(cors());
app.use(
  session({
    secret: "waytobigsecret",
    resave: false,
    saveUninitialized: false,
    // Add any other configurations needed
  })
);

app.get("/ai", (req: Request, res: Response) => {
  const message = req.query.message;
  herc.question({ model: "v3-beta", content: message }).then((response) => {
    return res.json({ reply: response.reply });
    /* The module will reply based on the message! */
  });
});
app.use(cookieParser());
app.use(passport.initialize()); // init passport on every route call
app.use(passport.session()); //allow passport to use "express-session"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", express.static("docs"));
app.use("/v1", RouterApp);
app.use("/auth", authRouter);
app.get("/fetchData", async (req, res) => {
  const message = req.query.message;
  try {
    // Your code to fetch data from the Hercai API here
    // You can use axios, fetch, or any other library to make HTTP requests
    // For example, using axios:
    const axios = require("axios");
    const response = await axios.get(
      `https://hercai.onrender.com/v3-beta/hercai?question=${message}`
    );

    // Send the data received from the API as the response
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
