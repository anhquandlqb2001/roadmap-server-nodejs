import { Request, Response } from "express";
import { EMap } from "../lib/types/map.type";
import Road, { Comment } from "../entities/Road";
import mongoose from "mongoose";
import { getMongoRepository } from "typeorm";

class RoadMapController {
  async add_road(req: Request, res: Response) {
    const map: EMap = req.body.map;
    if (!map) {
      return res.status(404);
    }
    // kiem tra lo trinh da ton tai chua
    const road = await Road.findOne({ where: { name: map } });
    if (road) {
      return res.json({ success: false, message: "Lo trinh da ton tai" });
    }
    // tao lo trinh moi
    const _road = new Road();
    _road.name = map;
    await _road.save();
    res.json({ success: true });
  }

  async get_comments_by_page(req: Request, res: Response) {}

  async add_comment(req: Request, res: Response) {
    try {
      const { commentText, map } = req.body;

      const road = await Road.findOne({ where: { name: map } });
      const userID = req.session.userID;
      const userObjID = mongoose.Types.ObjectId(userID);

      const newComment = new Comment();
      newComment.userID = userObjID as any;
      newComment.text = commentText;

      road.comments = [...road.comments, newComment];
      await road.save();
      return res.json({ success: true });
    } catch (error) {
      return res.json({ success: false, message: "Co loi xay ra", err: error });
    }
  }

  async reply_comment(req: Request, res: Response) {
    const { commentReplyText, commentID } = req.body;

    const userID = req.session.userID;
    const userObjID = mongoose.Types.ObjectId(userID);

    const road = await Road.findOne({
      where: { "comments._id": mongoose.Types.ObjectId(commentID) },
    });

    const cmtIndex = road.comments.findIndex(
      (comment) => comment._id.toString() === commentID
    );
    const oldReply = road.comments[cmtIndex].reply;

    await getMongoRepository(Road).findOneAndUpdate(
      {
        "comments._id": mongoose.Types.ObjectId(commentID),
      },
      {
        $set: {
          "comments.$.reply": [
            ...oldReply,
            {
              _id: mongoose.Types.ObjectId(),
              userID: userObjID,
              commentText: commentReplyText,
            },
          ],
        },
      }
    );

    return res.json({ success: true });
  }

  async vote_comment(req: Request, res: Response) {
    const { commentID, type } = req.body;
    const userID = req.session.userID;
    const userObjID = mongoose.Types.ObjectId(userID);

    const road = await Road.findOne({
      where: { "comments._id": mongoose.Types.ObjectId(commentID) },
    });

    const cmtIndex = road.comments.findIndex(
      (comment) => comment._id.toString() === commentID
    );
    const oldVote = road.comments[cmtIndex].vote;

    const findIndex = oldVote.findIndex(
      (vote) => vote.userID.toString() === userID
    );

    if (findIndex === -1) {
      console.log('here');
      
      await getMongoRepository(Road).findOneAndUpdate(
        {
          "comments._id": mongoose.Types.ObjectId(commentID),
        },
        {
          $set: {
            "comments.$.vote": [...oldVote, { userID: userObjID, type: type }],
          },
        }
      );
      return res.json({ success: true });
    }

    const newVote = oldVote.map(vote => {
      if (vote.userID.toString() === userID) {
        return {...vote, type: type}
      }
      return vote
    })

    await getMongoRepository(Road).findOneAndUpdate(
      {
        "comments._id": mongoose.Types.ObjectId(commentID),
      },
      {
        $set: {
          "comments.$.vote": newVote,
        },
      }
    );
    return res.json({ success: true });
  }

  async star_map(req: Request, res: Response) {
    const userObjID = mongoose.Types.ObjectId(req.session.userID)
    
  }
}

export default new RoadMapController();
