import { IComment, ObjectID } from "./comment.type";
import { TRoadName } from "./road.type";
import { Document, Model, Types } from "mongoose";
import { TProvider } from "./form.type";

// response data to server
export interface IDataToClient {
  success: boolean;
  message?: string;
  errors?: any;
}

// kieu du lieu road luu trong db
export interface IMap extends Document {
  name: TRoadName;
  comments: Types.DocumentArray<IComment>;
  stars: ObjectID[];
  map: any
}

// kieu du lieu ghi chu luu trong db
export interface INote extends Document {
  mapId: ObjectID;
  ownerMapId: ObjectID
  userId: ObjectID
  text: string;
  createdAt: Date
  updatedAt: Date
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
export interface ISubMap extends Types.Embedded {
  mapId: ObjectID
  map: any
}

// kieu du lieu nguoi dung
export interface IUserDocument extends Document {
  email: string;
  provider: TProvider;
  jwt?: string;
  password: string;
  extend: IUserExtends;
  maps: Types.DocumentArray<ISubMap>;
}

export interface IUserModel extends IUserDocument {
  verifyPassword(plain: string): Promise<Boolean>;
}
