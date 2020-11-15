import Road from "../../entities/Road";
import { EMap } from "../types/map.type";

 const getRoadByRoadName = async (map: EMap) => {
  let road
  switch (map) {
    case EMap.React:
      road = await Road.findOne({
        where: { name: map },
      });
      break;

    default:
      break;
  }
  return road
}

export default getRoadByRoadName