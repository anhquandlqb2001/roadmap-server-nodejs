import User from "../../entities/User";
import { EMap } from "../types/map.type";
import mongoose from 'mongoose'

 const getUserByRoadName = async (map: EMap, userID: string) => {
  let user
  switch (map) {
    case EMap.React:
      user = await User.findOne({
        where: { _id: mongoose.Types.ObjectId(userID) },
      });
      break;

    case EMap.FrontEnd:
      user = await User.findOne({
         where: { _id: mongoose.Types.ObjectId(userID) },
      });
      break;
    default:
      break;
  }
  return user
}

export default getUserByRoadName