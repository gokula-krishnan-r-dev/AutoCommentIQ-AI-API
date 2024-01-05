import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import User, { IUser } from "./../../models/user.model";
import { verifyToken } from "../../utils/verifyToken";
import mongoose from "mongoose";
const authRouter = express.Router();

authRouter.get("/users", async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find({}); // Fetching only specific fields
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});
authRouter.get("/users/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Check if the user ID is valid
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find the user by ID
    const user: IUser | null = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});
authRouter.delete(
  "/users/:userId",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;

      // Check if the user ID is valid
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      // Find the user by ID and remove it
      const deletedUser = await User.findByIdAndDelete({ _id: userId });

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  }
);
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

// authRouter.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["email", "profile"],
//   })
// );
authRouter.get("/google", passport.authenticate("google"), (req, res) =>
  res.send(200)
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
    successRedirect: "http://localhost:3001/dashboard",
  }),
  (req, res) => {
    console.log(req);
    res.send(200);
  }
);

authRouter.get("/logout", function (req: any, res, next: any) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default authRouter;
