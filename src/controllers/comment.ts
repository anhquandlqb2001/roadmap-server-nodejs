import { Request, Response } from "express";
import Comment from "../models/comment";

export const getComment = async (req: Request, res: Response) => {
  try {
    const page = req.params.page;
    const mapId = req.params.mapId;

    let skip = (parseInt(page) - 1) * 10;
    skip < 0 ? (skip = 0) : skip;
    const comments = await Comment.find({ mapId: mapId })
      .limit(10)
      .skip(skip)
      .select(["text", "userId", "createdAt", "replys"])
      .exec();

    const commentsList = comments.map(({ replys, ...comment }) => {
      if (replys?.length > 0) {
        return {
          _id: comment._doc._id,
          userId: comment._doc.userId,
          text: comment._doc.text,
          createdAt: comment._doc.createdAt,
          hasReply: true,
        };
      } else {
        return {
          _id: comment._doc._id,
          userId: comment._doc.userId,
          text: comment._doc.text,
          createdAt: comment._doc.createdAt,
          hasReply: false
        };
      }
    });

    return res.json({ success: true, comments: commentsList });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};
