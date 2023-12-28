import express, { Request, Response, NextFunction } from "express";
import passport from "passport";

const authRouter = express.Router();

authRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "You are not logged in" });
});

authRouter.get("/failed", (req: Request, res: Response) => {
  res.send("Failed");
});

authRouter.get("/success", (req: any, res: Response) => {
  if (req.user && req.user.email) {
    res.send(`Welcome ${req.user.email}`);
  } else {
    res.send("Welcome");
  }
});

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req: Request, res: Response) {
    res.redirect("/success");
  }
);

export default authRouter;
