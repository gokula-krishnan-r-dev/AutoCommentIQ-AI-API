import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../config/dev";
import User, { IUser } from "./../../models/user.model";
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
import jwt from "jsonwebtoken";
const JWT_SECRET = "AutoCommentIQ";
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: [
        "email",
        "profile",
        "https://www.googleapis.com/auth/youtube",
        "https://www.googleapis.com/auth/youtube.force-ssl",
      ],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      console.log(accessToken);

      try {
        let user = await User.findOne({ googleId: profile?.id });

        if (!user) {
          // Create a new user if not found
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.email,
            accessToken,
            refreshToken,
            profile,
            token: "", // Initialize token field
          });

          await user.save();
        } else {
          // If the user exists, update all details
          user.username = profile.displayName;
          user.email = profile.email;
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          user.profile = profile;
          // Update any other fields as needed

          await user.save();
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: "1h",
        });

        user.token = token;
        await user.save();

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
