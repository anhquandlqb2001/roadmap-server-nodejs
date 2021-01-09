import { Request, Response } from "express";
import Comment from "../models/comment";

export const getComment = async (req: Request, res: Response) => {
  const LIMIT = 10;
  try {
    const page = req.params.page;
    const mapId = req.params.mapId;

    let skip = parseInt(page) * LIMIT;
    skip < 0 ? (skip = 0) : skip;
    const comments = await Comment.find({ mapId: mapId })
      .limit(LIMIT + 1)
      .skip(skip)
      .select(["text", "userId", "createdAt", "replys", "userEmail"])
      .sort({ createdAt: -1 })
      .exec();

    const hasMore = comments.length > LIMIT ? true : false;

    hasMore && comments.pop();

    const commentsList = comments.map((comment) => {
      if (comment.replys?.length > 0) {
        return {
          commentId: comment._id,
          userId: comment.userId,
          text: comment.text,
          createdAt: comment.createdAt,
          userEmail: comment.userEmail,
          hasReply: true,
        };
      } else {
        return {
          commentId: comment._id,
          userId: comment.userId,
          text: comment.text,
          createdAt: comment.createdAt,
          userEmail: comment.userEmail,
          hasReply: false,
        };
      }
    });

    return res.json({ success: true, comments: commentsList, hasMore });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};

export const getReply = async (req: Request, res: Response) => {
  const LIMIT = 5;
  try {
    const page = req.params.page;
    const mapId = req.params.mapId;
    const commentId = req.params.commentId;

    let skip = parseInt(page) * LIMIT;
    skip < 0 ? (skip = 0) : skip;
    const comments = await Comment.findOne(
      { mapId: mapId, _id: commentId },
      { replys: { $slice: [skip, skip + LIMIT + 1] } }
    )

    const hasMore = comments.replys.length > LIMIT ? true : false;
    hasMore && comments.replys.pop();

    return res.json({ success: true, replys: comments.replys, hasMore });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};
