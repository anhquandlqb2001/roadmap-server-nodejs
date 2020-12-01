import { IRoad } from "../lib/types/index.type";
import mongoose from "mongoose";
import { IComment, ICommentBase, IVote } from "../lib/types/comment.type";

const Schema = mongoose.Schema;

const replySchema = new Schema<ICommentBase>(
  {
    userId: {
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
    userId: {
      type: Schema.Types.ObjectId,
    },
    type: String,
  },
  { timestamps: true }
);

const commentSchema = new Schema<IComment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
    },
    text: { type: String },
    replys: {
      type: [replySchema],
    },
    votes: {
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
    map: {
      type: String
    }
  },
  {
    collection: "roads",
    timestamps: true,
  }
);

export default mongoose.model<IRoad>("Road", roadSchema);
