import { ISubMap, IUserDocument, IUserModel } from "../lib/types/index.type";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../lib/util/constants";

const Schema = mongoose.Schema;

const roadSchema = new Schema<ISubMap>(
  {
    mapID: { type: Schema.Types.ObjectId, required: true },
    map: {
      type: Schema.Types.Mixed
    },
  },
  { timestamps: true }
);

const userSchema: mongoose.Schema = new Schema(
  {
    password: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    jwt: { type: String },
    extend: {
      accessToken: { type: String },
      expiresIn: { type: Number },
      name: { type: String },
      picture: {
        height: { type: Number },
        is_silhouette: { type: Boolean },
        url: { type: String },
        width: { type: Number },
      },
    },

    maps: {
      type: [roadSchema],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.methods.verifyPassword = async function (plainPwd: string) {
  try {
    return await bcrypt
      .compare(plainPwd, this.password)
      .then(function (result) {
        if (!result) {
          return false;
        }
        return true;
      });
  } catch (error) {
    console.log("error verifyPwd: ", error);
  }
};

userSchema.pre<IUserDocument>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  this.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  return next();
});

export default mongoose.model<IUserModel>("User", userSchema);
