import { INote } from "../lib/types/index.type";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const noteSchema = new Schema<INote>(
  {
    // id cua map
    mapID: { type: Schema.Types.ObjectId },
    ownerMapID: { type: Schema.Types.ObjectId },
    userID: { type: Schema.Types.ObjectId },
    text: { type: String },
  },
  {
    collection: "notes",
    timestamps: true,
  }
);


export default mongoose.model<INote>("Note", noteSchema);
