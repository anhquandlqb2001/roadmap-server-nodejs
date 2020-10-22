import mongoose from "mongoose";
import bcrypt from "bcrypt";
import IUser from "../lib/types/user.type";
import { SALT_ROUNDS } from "../lib/util/constants";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

UserSchema.pre<IUser>("save", async function (next) {
  const oldPwd = this.password;
  let newPwd;
  await bcrypt.hash(oldPwd, SALT_ROUNDS).then(function (hash) {
    newPwd = hash;
  });
  this.password = newPwd;
  return next();
});

UserSchema.methods.verifyPassword = async function (plainPwd: string) {
  await bcrypt.compare(plainPwd, this.password).then(function (result) {
    // result == true
    if (!result) {
      return false;
    }
    return true;
  });
};

export default mongoose.model<IUser>("User", UserSchema);
