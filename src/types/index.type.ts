import { IComment, ObjectID } from "./comment.type";
import { TRoadName } from "./road.type";
import { Document, Types } from "mongoose";
import { TProvider } from "./form.type";

// response data to server
export interface IDataToClient {
  success: boolean;
  message?: string;
  errors?: any;
}

// kieu du lieu road luu trong db
export interface IRoad extends Document {
  name: TRoadName;
  comments: Types.DocumentArray<IComment>;
  stars: ObjectID[];
}

// kieu du lieu ghi chu luu trong db
export interface INote extends Document {
  mapID: ObjectID;
  ownerMapID: ObjectID
  userID: ObjectID
  text: string;
  createdAt: Date
  updatedAt: Date
}

// method user model
interface IUserMethod {
  verifyPassword(plain: string): Promise<Boolean>;
}

//
export interface IUserExtends {
  name: string;
  token: string;
  expriresIn: number;
  picture?: {
    width: number;
    url: string;
  };
}

//
interface IMap {
  REACT: object,
  FRONT_END: object,
  BACK_END: object
}

// 
export interface ISubMap extends Types.Embedded {
  mapID: ObjectID
  map: any
}

// kieu du lieu nguoi dung
export interface IUser extends Document, IUserMethod {
  email: string;
  provider: TProvider;
  jwt?: string;
  password: string;
  extend: IUserExtends;
  maps: Types.DocumentArray<ISubMap>;
}
