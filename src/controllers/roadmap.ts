import { Request, Response } from "express";
import { EMap } from "../lib/types/map.type";
import Road, { Comment } from "../entities/Road";
import mongoose from "mongoose";
import { getMongoRepository } from "typeorm";
import getRoadByRoadName from "../lib/util/getRoadByRoadName";

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
      const roadID = req.params.id;
      const road = await Road.findOne({
        where: { _id: mongoose.Types.ObjectId(roadID) },
        select: ["comments"],
      });

      if (!road) {
        return res
          .status(404)
          .json({ success: false, message: "Khong ton tai lo tirnh nay" });
      }

      const { text } = req.body;
      const userObjID = mongoose.Types.ObjectId(req.session.userID);

      const newComment = new Comment();
      newComment.userID = userObjID as any;
      newComment.text = text;
      road.comments = [...road.comments, newComment];
      await road.save();

      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Co loi xay ra", err: error });
    }
  }

  async reply_comment(req: Request, res: Response) {
    const { text } = req.body;

    const commentID = req.params.commentID;

    if (!text || !commentID) {
      return res.json({ succesS: false });
    }

    const userID = req.session.userID;
    const userObjID = mongoose.Types.ObjectId(userID);

    // const road = await Road.findOne(
    //   { "comments._id": mongoose.Types.ObjectId(commentID) } as any,
    //   { select: ["comments.reply"] }
    // );
    
    const road = await getMongoRepository(Road).findOne({
      "comments._id": mongoose.Types.ObjectId(commentID), select: ["comments.reply"]})

    console.log("_road: ", road);

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
              text: text,
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

    const newVote = oldVote.map((vote) => {
      if (vote.userID.toString() === userID) {
        return { ...vote, type: type };
      }
      return vote;
    });

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
    const { map } = req.body;
    const userID = req.session.userID;
    const userObjID = mongoose.Types.ObjectId(userID);

    const road = await getRoadByRoadName(map);

    const oldStar = road.stars;
    const findIndex = oldStar.findIndex((star) => star.toString() === userID);

    if (findIndex === -1) {
      road.stars = [...oldStar, userObjID] as any;
      await road.save();
      return res.json({ success: true });
    }

    const newStar = oldStar.filter((star) => star.toString() !== userID);
    road.stars = newStar;

    await road.save();
    return res.json({ success: true });
  }

  async get_list_road(req: Request, res: Response) {
    try {
      const roads = await Road.find({ where: {}, select: ["_id"] });
      if (roads.length <= 0) {
        return res.json({
          success: true,
          message: "Khong co lo trinh nao ton tai!",
        });
      }
      const roadIDs = roads.map((road) => road._id);
      return res.json({ success: true, roadIDs: roadIDs });
    } catch (error) {
      console.log(error);
      res.json({ success: false, error: error });
    }
  }
}

export default new RoadMapController();
