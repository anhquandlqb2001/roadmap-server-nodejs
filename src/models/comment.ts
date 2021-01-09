import { Schema, Types, model, Document, Model } from "mongoose";
import { IUserDocument } from "./user";
import { IMapDocument } from "./map";
import MapModel from "./map";

export interface IComment {
  userId: Types.ObjectId;
  mapId: Types.ObjectId;
  text: string;
  replys: IReply[];
  userEmail: string;
}

export interface ICommentDocument extends IComment, Document {
  userId: IUserDocument["_id"];
  mapId: IMapDocument["_id"];
  replys: Types.Array<IReply>;
  createdAt: Date
  updatedAt: Date
}

export interface IReply extends Document {
  userId: IUserDocument["_id"];
  mapId: IMapDocument["_id"];
  commentId: ICommentDocument["_id"];
  text: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
}

const ReplySchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    mapId: {
      type: Types.ObjectId,
    },
    commentId: {
      type: Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// const VoteSchema = new Schema(
//   {
//     userId: {
//       type: Types.ObjectId,
//     },
//     type: String,
//   },
//   { timestamps: true }
// );

const CommentSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    mapId: {
      type: Types.ObjectId,
      required: true,
    },
    text: { type: String },
    replys: {
      type: [ReplySchema],
    },
    userEmail: { type: String, required: true },
    // votes: {
    //   type: [VoteSchema],
    // },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

interface ICommentModel extends Model<ICommentDocument> {}

CommentSchema.pre<ICommentDocument>("save", async function (next) {
  await MapModel.insertCommentId(this.mapId, this._id);
  return next();
});

export default model<ICommentDocument, ICommentModel>("Comment", CommentSchema);
