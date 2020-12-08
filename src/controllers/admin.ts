import { Request, Response } from "express";
import mongoose from "mongoose";
// import Map from "../models/map.model";
import { TVote } from "../lib/types/comment.type";
import { ReactRoad } from "../lib/util/maps";
// import User from "../models/user.model";
import recursiveSearch from "../lib/util/searchMapChange";
// import Note from "../models/note.model";

import UserModel from "../models/user";
import MapModel from "../models/map";
import CommentModel, {IReply} from "../models/comment";

export const getTest = async (req, res) => {
  console.log("hello world");
};

export const postTest = async (req, res) => {
  // const user = new UserModel({password: "123", email: "tesasdast@gmail.com", provider: "FACEBOOK"})
  // await user.save()

  // const map = new MapModel()
  // map.name = "Js"
  // map.map = "asds"
  // map.description = {mapId: map._id, detail: "asdas", title: "JAVASCRIPT"}
  // map.documentation = {mapId: map._id, text: "Asdds"}
  // await map.save()

  // const map = await MapModel.findOne({name: "Js"})
  // map.updateDescription("ahihi")

  const comment = new CommentModel()
  comment.mapId = "5fce6983ee1ad8d48e5b92c5"
  comment.text = "alo alo 123"
  comment.userId = req.session.userId
  await comment.save()

  // const comment = await CommentModel.findOne({
  //   mapId: "5fce6983ee1ad8d48e5b92c5",
  //   _id: "5fce7049de94c0df670125b8",
  // });
  // comment.replys.push({commentId: comment._id, mapId: comment.mapId, text: "sadas", userId: req.session.userId} as IReply)
  // await comment.save()
  res.json({ success: true });
};

export const addRoad = async (req: Request, res: Response) => {
  const map = new Map();
  map._id = mongoose.Types.ObjectId("5fb12e6e581d3b79b1362e13");
  map.name = "REACT";
  map.map = JSON.stringify(ReactRoad);
  await map.save();
  res.json({ success: true });
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const mapId = req.params.mapId;
    const map = await Map.findById(mapId);

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
};

export const replyComment = async (req: Request, res: Response) => {
  const { text } = req.body;

  const commentId = req.params.commentId;
  const mapId = req.params.mapId;

  if (!text || !commentId) {
    return res.json({ succesS: false });
  }

  const userId = req.session.userId;
  const map = await Map.findById(mapId);
  const currentReplys = map.comments.id(commentId).replys;

  map.comments.id(commentId).replys = [
    ...currentReplys,
    { userId, text },
  ] as any;

  map.comments.id(commentId).replys;

  await map.save();

  return res.json({ success: true });
};

export const voteComment = async (req: Request, res: Response) => {
  try {
    const type: TVote = req.body.type;
    if (!type) {
      return res.json({ succesS: false });
    }
    const mapId = req.params.mapId;
    const commentId = req.params.commentId;
    const userId = req.session.userId;
    const map = await Map.findById(mapId);

    const currentVotes = map.comments.id(commentId).votes;
    const voteIndex = currentVotes.findIndex(
      (v) => v.userId.toString() === userId
    );

    if (voteIndex !== -1) {
      // neu nguoi dung da vote
      if (type !== currentVotes[voteIndex].type) {
        // vote cua nguoi dung khac voi vote truoc do
        map.comments.id(commentId).votes = currentVotes.map((v) =>
          v.userId.toString() === userId ? { userId: v.userId, type: type } : v
        ) as any;
        // } else { otherwise
        map.comments.id(commentId).votes = map.comments
          .id(commentId)
          .votes.filter((v) => v.userId.toString() !== userId) as any;
      }
    } else {
      // nguoi dung chua vote
      map.comments.id(commentId).votes.push({ userId, type });
    }

    await map.save();
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
};

export const starMap = async (req: Request, res: Response) => {
  try {
    const mapId = req.params.mapId;
    const map = await Map.findById(mapId);
    if (!map)
      return res
        .status(404)
        .json({ success: false, message: "Khong ton tai lo trinh nay!" });

    const userId = req.session.userId;

    if (map.stars.findIndex((star) => star.toString() === userId) === -1) {
      map.stars.push(userId);
    } else {
      map.stars = map.stars.filter((star) => star.toString() !== userId);
    }

    await map.save();

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
};

export const getListRoad = async (req: Request, res: Response) => {
  try {
    const roads = await Map.find({}).select(["_id", "name", "intro"]);

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
};

export const startMap = async (req: Request, res: Response) => {
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
};

export const getMap = async (req: Request, res: Response) => {
  const userId = req.session.userId;
  const mapId = req.params.mapId;
  if (!mapId) {
    return res.status(404).json({ success: false });
  }

  const user = await User.findOne({ _id: userId, "maps.mapId": mapId });

  if (typeof userId === "undefined" || !user) {
    const map = await Map.findOne({ _id: mapId }).select(["map"]);
    return res.json({
      success: true,
      data: {
        map: JSON.parse(map.map),
      },
    });
  }

  const mapIndex = user.maps.findIndex((map) => map.mapId.toString() === mapId);

  return res.json({
    success: true,
    data: {
      map: JSON.parse(user.maps[mapIndex].map),
      ownerMapId: user.maps[mapIndex]._id,
    },
  });
};

//
export const changeFieldMap = async (req: Request, res: Response) => {
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
};

