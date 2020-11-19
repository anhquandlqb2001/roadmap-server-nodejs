import { IRoad } from "index.type";
import mongoose from "mongoose";
import { IComment, ICommentBase, IVote } from "../types/comment.type";

const Schema = mongoose.Schema;

const replySchema = new Schema<ICommentBase>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const voteSchema = new Schema<IVote>(
  {
    userID: {
      type: Schema.Types.ObjectId,
    },
    type: String,
  },
  { timestamps: true }
);

const commentSchema = new Schema<IComment>(
  {
    userID: {
      type: Schema.Types.ObjectId,
    },
    text: { type: String },
    reply: {
      type: [replySchema],
    },
    vote: {
      type: [voteSchema],
    },
  },
  {
    timestamps: true,
  }
);

const roadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    comments: {
      type: [commentSchema],
    },
    stars: {
      type: [Schema.Types.ObjectId],
    },
  },
  {
    collection: "roads",
    timestamps: true,
  }
);

export default mongoose.model<IRoad>("Road", roadSchema);
