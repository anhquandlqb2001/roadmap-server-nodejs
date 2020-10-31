// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import UserModel from "../../models/user";
// import { FormErrorResponse } from "../types/user.type";

// passport.serializeUser(function (user, done) {
//   done(null, user._id);
// });

// passport.deserializeUser(function (id, done) {
//   UserModel.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//     },
//     function (
//       email,
//       password,
//       done: (error: any, user?: any, message?: any) => void
//     ) {
//       UserModel.findOne({ email: email }, function (err, user: IUser) {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return done(null, false, {
//             errors: [
//               { name: ["email"], errors: ["Sai tai khoan hoac mat khau"] },
//               { name: ["password"], errors: ["Sai tai khoan hoac mat khau"] },
//             ],
//           } as FormErrorResponse);
//         }
//         if (!user.verifyPassword(password)) {
//           return done(null, false, {
//             errors: [{ name: ["password"], errors: ["Sai mat khau"] }],
//           } as FormErrorResponse);
//         }
//         return done(null, user);
//       });
//     }
//   )
// );
