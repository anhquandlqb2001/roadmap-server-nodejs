import { Types } from "mongoose";
import { TRoadName } from "./road.type";

export type ObjectID = Types.ObjectId;

export type TVote = "UPVOTE" | "DOWNVOTE";

export interface ICommentBase extends Types.Embedded {
  userID: ObjectID;
  text: string;
}

export interface IVote extends Types.Embedded {
  userID: ObjectID;
  type: TVote;
}

// kieu du lieu binh luan luu trong db
export interface IComment extends ICommentBase {
  vote?: Types.DocumentArray<IVote>;
  reply?: Types.DocumentArray<ICommentBase>;
}

// du lieu gui ve server - du lieu binh luan
interface ICommentDataToServer {
  text: string;
  road: TRoadName;
}

// du lieu gui ve server - du lieu tra loi binh luan
interface ICommentReplyDataToServer extends ICommentDataToServer {
  commentID: ObjectID;
}
