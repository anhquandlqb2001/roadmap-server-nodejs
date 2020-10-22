import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "../../models/user";
import IUser from "../types/user.type";

passport.serializeUser(function (user: IUser, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  UserModel.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      UserModel.findOne({ email: email }, function (err, user: IUser | any) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            errors: [
              { name: ["email"], errors: ["Incorrect email or password"] },
              { name: ["password"], errors: ["Incorrect email or password"] },
            ],
          } as any);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    }
  )
);
