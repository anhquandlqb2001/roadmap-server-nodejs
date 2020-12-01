import { Request, Response } from "express";
import mongoose from "mongoose";
import Road from "../models/road.model";
import { TVote } from "../lib/types/comment.type";
import { ReactRoad } from "../lib/util/maps";
import User from "../models/user.model";
import recursiveSearch from "../lib/util/searchMapChange";
import Note from "../models/note.model";

class RoadMapController {
  async add_road(req: Request, res: Response) {
    // const map = req.body.map;
    // if (!map) {
    //   return res.status(404);
    // }
    // // kiem tra lo trinh da ton tai chua
    // const road = await Road.findOne({ where: { name: map } });
    // if (road) {
    //   return res.json({ success: false, message: "Lo trinh da ton tai" });
    // }
    // // tao lo trinh moi
    // const _road = new Road();
    // _road.name = map;
    // await _road.save();

    const road = new Road();
    road._id = mongoose.Types.ObjectId("5fb12e6e581d3b79b1362e13");
    road.name = "REACT";
    road.map = JSON.stringify(ReactRoad);
    await road.save();

    res.json({ success: true });
  }

  async get_comments_by_page(req: Request, res: Response) {}

  async add_comment(req: Request, res: Response) {
    try {
      const mapId = req.params.mapId;
      const map = await Road.findById(mapId);

      if (!map) {
        return res
          .status(404)
          .json({ success: false, message: "Khong ton tai lo tirnh nay" });
      }

      const { text } = req.body;
      const userObjId = mongoose.Types.ObjectId(req.session.userId);

      map.comments.push({ userID: userObjId, text: text });
      await map.save();

      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Co loi xay ra", err: error });
    }
  }

  async reply_comment(req: Request, res: Response) {
    const { text } = req.body;

    const commentId = req.params.commentId;
    const mapId = req.params.mapId;

    if (!text || !commentId) {
      return res.json({ succesS: false });
    }

    const userId = req.session.userId;
    const road = await Road.findById(mapId);
    const currentReplys = road.comments.id(commentId).replys;

    road.comments.id(commentId).replys = [
      ...currentReplys,
      { userId, text },
    ] as any;

    road.comments.id(commentId).replys;

    await road.save();

    return res.json({ success: true });
  }

  async vote_comment(req: Request, res: Response) {
    try {
      const type: TVote = req.body.type;
      if (!type) {
        return res.json({ succesS: false });
      }
      const mapId = req.params.mapId;
      const commentId = req.params.commentId;
      const userId = req.session.userId;
      const road = await Road.findById(mapId);

      const currentVotes = road.comments.id(commentId).votes;
      const voteIndex = currentVotes.findIndex(
        (v) => v.userId.toString() === userId
      );

      if (voteIndex !== -1) {
        // neu nguoi dung da vote
        if (type !== currentVotes[voteIndex].type) {
          // vote cua nguoi dung khac voi vote truoc do
          road.comments.id(commentId).votes = currentVotes.map((v) =>
            v.userId.toString() === userId
              ? { userId: v.userId, type: type }
              : v
          ) as any;
          // } else { otherwise
          road.comments.id(commentId).votes = road.comments
            .id(commentId)
            .votes.filter((v) => v.userId.toString() !== userId) as any;
        }
      } else {
        // nguoi dung chua vote
        road.comments.id(commentId).votes.push({ userId, type });
      }

      await road.save();
      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false, error });
    }
  }

  async star_map(req: Request, res: Response) {
    try {
      const mapId = req.params.mapId;
      const road = await Road.findById(mapId);
      if (!road)
        return res
          .status(404)
          .json({ success: false, message: "Khong ton tai lo trinh nay!" });

      const userId = req.session.userId;

      if (road.stars.findIndex((star) => star.toString() === userId) === -1) {
        road.stars.push(userId);
      } else {
        road.stars = road.stars.filter((star) => star.toString() !== userId);
      }

      await road.save();

      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false, error });
    }
  }

  async get_list_road(req: Request, res: Response) {
    try {
      const roads = await Road.find({}).select(["_id", "name", "intro"]);

      if (roads.length <= 0) {
        return res.json({
          success: true,
          message: "Khong co lo trinh nao ton tai!",
        });
      }

      return res.json({ success: true, roads });
    } catch (error) {
      console.log(error);
      res.json({ success: false, error: error });
    }
  }

  async start_map(req: Request, res: Response) {
    try {
      const mapId = req.params.mapId;
      if (!mapId) {
        return res.status(404);
      }
      const user = await User.findById(req.session.userId);

      if (user.maps.findIndex((map) => map.mapId.toString() === mapId) !== -1) {
        return res.json({
          success: false,
          message: "Ban da bat dau lo trinh nay roi!",
        });
      }

      user.maps.push({
        mapId: mongoose.Types.ObjectId(mapId),
        map: JSON.stringify(ReactRoad),
      });
      await user.save();

      return res.json({
        success: true,
        message: "Bat dau lo trinh moi thanh cong",
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false, error });
    }
  }

  //
  async get_map(req: Request, res: Response) {
    const userId = req.session.userId;
    const mapId = req.params.mapId;
    if (!mapId) {
      return res.status(404).json({ success: false });
    }

    const user = await User.findOne({ _id: userId, "maps.mapId": mapId });

    if (typeof userId === "undefined" || !user) {
      const road = await Road.findOne({ _id: mapId }).select(["map"]);
      return res.json({
        success: true,
        data: {
          map: JSON.parse(road.map),
        },
      });
    }

    const mapIndex = user.maps.findIndex(
      (map) => map.mapId.toString() === mapId
    );

    return res.json({
      success: true,
      data: {
        map: JSON.parse(user.maps[mapIndex].map),
        ownerMapId: user.maps[mapIndex]._id,
      },
    });
  }

  async change_field_map(req: Request, res: Response) {
    try {
      const userId = req.session.userId;
      const mapId = req.params.mapId;
      const ownerMapId = req.params.ownerMapId;

      if (ownerMapId === "null") {
        return res.json({
          success: false,
          message: "Ban phai bat dau lo trinh nay",
        });
      }

      if (!mapId) {
        return res.status(404).json({ success: false });
      }

      const user = await User.findOne({ _id: userId, "maps._id": ownerMapId });
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "Nguoi dung khong ton tai" });

      const { fieldChange, currentValue } = req.body;

      const newMap = recursiveSearch(
        JSON.parse(user.maps.id(ownerMapId).map),
        fieldChange,
        !currentValue
      );

      user.maps.id(ownerMapId).map = JSON.stringify(newMap);
      await user.save();

      return res.json({
        success: true,
        message: "Cap nhat thanh cong",
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false, error });
    }
  }

  async note_post(req: Request, res: Response) {
    try {
      const { text } = req.body;
      const mapId = req.params.mapId;
      const ownerMapId = req.params.ownerMapId;
      if (!mapId || !text) {
        return res.status(404).json({ success: false });
      }

      const userID = req.session.userId;

      const user = await User.findOne({
        _id: userID,
        "maps._id": ownerMapId,
        "maps.mapId": mapId,
      });
      console.log("user: ", user);

      if (!user) {
        return res.status(404).json({ success: false });
      }

      const note = await Note.findOne({ userID, ownerMapId, mapId });

      if (!note) {
        const _note = new Note();
        (_note.userId = mongoose.Types.ObjectId(userID)),
          (_note.mapId = mongoose.Types.ObjectId(mapId));
        _note.ownerMapId = mongoose.Types.ObjectId(ownerMapId);
        _note.text = text;
        await _note.save();
      } else {
        note.text = text;
        await note.save();
      }
      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false, error });
    }
  }

  async get_note(req: Request, res: Response) {
    try {
      const mapId = req.params.mapId;
      const ownerMapId = req.params.ownerMapId;

      const note = await Note.findOne({ mapId, ownerMapId });
      if (!note) {
        return res.status(404).json({ success: false });
      }
      return res.json({
        success: true,
        data: { text: note.text, updatedAt: note.updatedAt },
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false, error });
    }
  }
}

export default new RoadMapController();
