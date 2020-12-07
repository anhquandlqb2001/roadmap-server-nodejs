// import { ISubMap, IUserDocument, IUserModel } from "../lib/types/index.type";
import mongoose, { Document, Types, Model } from "mongoose";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../lib/util/constants";
import { TProvider } from "form.type";

const Schema = mongoose.Schema;

export interface IBaseUser extends Document {
  email: string;
  provider: string;
  maps: Array<Object>;
}

export interface IUser {
  email: string;
  provider: TProvider;
  password?: string;
  jwt?: string;
  maps: Array<Object>;
  token?: string;
  expiresIn?: number;
  imageUrl?: string;
}

export interface IUserDocument extends IUser, Document {
  maps: Types.Array<IMap>
}


export interface ILocalUser extends IBaseUser {
  password: string;
}

export interface IThirdPartyUser extends IBaseUser {
  token: string;
  expiresIn: Number;
  imageUrl: string;
}

export interface IMap {
  mapId: Types.ObjectId;
  map: string;
}


const MapSchema = new Schema(
  {
    mapId: { type: Schema.Types.ObjectId, required: true },
    map: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

const UserSchema: mongoose.Schema = new Schema(
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
    token: { type: String },
    expiresIn: { type: Number },
    imageUrl: { type: String },
    maps: {
      type: [MapSchema],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

UserSchema.methods.verifyPassword = async function (plainPwd: string) {
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

UserSchema.pre<ILocalUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  this.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  return next();
});

export interface IUserModel extends Model<IUserDocument> {
  verifyPassword(plainPwd: string): boolean
}

export default mongoose.model<IUserDocument, IUserModel>("UserModel", UserSchema);
