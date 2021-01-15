import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../../models/user";
import endpoints from "./endpoints.config";

passport.serializeUser(function (user, done) {
  done(null, (user as any)._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: endpoints.FACEBOOK_APP_ID,
      clientSecret: endpoints.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:5000/api/node/user/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ email: profile._json.email }, async (err, user) => {
        if (err) {
          return cb(err);
        }
        if (!user) {
          const user = new User();
          user.email = profile._json.email;
          user.provider = "FACEBOOK";
          user.facebookId = profile._json.id;
          await user.save();
          return cb(null, user);
        }
        return cb(null, user);
      });
    }
  )
);
