import { Request, Response } from "express";
import Comment from "../models/comment";
import User from "../models/user";

export const addComment = async (req: Request, res: Response) => {
  try {
    const mapId = req.params.mapId;
    const userId = req.session.userId;
    const text = req.body.text;
    if (!text) {
      return res.json({ success: false });
    }

    const user = await User.findById(userId).select(["email"]);
    const comment = new Comment();
    comment.userId = userId;
    comment.mapId = mapId;
    comment.text = text;
    comment.userEmail = user.email;
    await comment.save();

    return res.json({ success: true, data: {commentId: comment._id, createdAt: comment.createdAt } });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Co loi xay ra", err: error });
  }
};

export const replyComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.commentId;
    const mapId = req.params.mapId;

    const { text } = req.body;

    if (!text || !commentId) {
      return res.json({ succesS: false });
    }
    const userId = req.session.userId;

    const comment = await Comment.findOne({
      _id: commentId,
      mapId: mapId,
    }).select(["replys"]);

    const user = await User.findOne({ _id: req.session.userId }).select(
      "email"
    );

    const indexReply = comment.replys.push({
      userId,
      mapId,
      commentId,
      text,
      userEmail: user.email,
    });

    const updatedComment = await comment.save();
    const newReply = updatedComment.replys[indexReply - 1];

    return res.json({
      success: true,
      data: { replyId: newReply._id, createdAt: newReply.createdAt },
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};

// export const voteComment = async (req: Request, res: Response) => {
//   try {
//     const type: TVote = req.body.type;
//     if (!type) {
//       return res.json({ succesS: false });
//     }
//     const mapId = req.params.mapId;
//     const commentId = req.params.commentId;
//     const userId = req.session.userId;
//     const map = await Map.findById(mapId);

//     const currentVotes = map.comments.id(commentId).votes;
//     const voteIndex = currentVotes.findIndex(
//       (v) => v.userId.toString() === userId
//     );

//     if (voteIndex !== -1) {
//       // neu nguoi dung da vote
//       if (type !== currentVotes[voteIndex].type) {
//         // vote cua nguoi dung khac voi vote truoc do
//         map.comments.id(commentId).votes = currentVotes.map((v) =>
//           v.userId.toString() === userId ? { userId: v.userId, type: type } : v
//         ) as any;
//         // } else { otherwise
//         map.comments.id(commentId).votes = map.comments
//           .id(commentId)
//           .votes.filter((v) => v.userId.toString() !== userId) as any;
//       }
//     } else {
//       // nguoi dung chua vote
//       map.comments.id(commentId).votes.push({ userId, type });
//     }

//     await map.save();
//     return res.json({ success: true });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, error });
//   }
// };
