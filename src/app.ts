import express, { Request, Response } from "express";
import authRouter from "./routes/authRouter/authRouter";
const passport = require("passport");
const cookieSession = require("cookie-session");
const app = express();
const port = 3000;
const connectToMongoDB = require("./services/db/Mongodb"); // Import the module
// connectToMongoDB();
require("./services/passport/passport");

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize()); // init passport on every route call
app.use(passport.session()); //allow passport to use "express-session"

app.use("/auth", authRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
