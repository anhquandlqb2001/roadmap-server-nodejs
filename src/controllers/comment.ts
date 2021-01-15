import { Request, Response } from "express";
import Comment from "../models/comment";
import { COMMENT_LIMIT, REPLY_LIMIT } from "../lib/util/constants";
export const getComment = async (req: Request, res: Response) => {
  try {
    const page = req.params.page;
    const mapId = req.params.mapId;

    let skip = parseInt(page) * COMMENT_LIMIT;
    skip < 0 ? (skip = 0) : skip;
    const comments = await Comment.find({ mapId: mapId })
      .limit(COMMENT_LIMIT + 1)
      .skip(skip)
      .select(["text", "userId", "createdAt", "replys", "userEmail"])
      .sort({ createdAt: -1 })
      .exec();

    const hasMore = comments.length > COMMENT_LIMIT ? true : false;

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
  try {
    const page = req.params.page;
    const mapId = req.params.mapId;
    const commentId = req.params.commentId;

    let skip = parseInt(page) * REPLY_LIMIT;
    skip < 0 ? (skip = 0) : skip;
    const comments = await Comment.findOne(
      { mapId: mapId, _id: commentId },
      { replys: { $slice: [skip, skip + REPLY_LIMIT + 1] } }
    );

    const hasMore = comments.replys.length > REPLY_LIMIT ? true : false;
    hasMore && comments.replys.pop();

    return res.json({ success: true, replys: comments.replys, hasMore });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};
