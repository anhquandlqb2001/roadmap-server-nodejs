import { INote } from "../lib/types/index.type";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const noteSchema = new Schema<INote>(
  {
    // id cua map
    mapId: { type: Schema.Types.ObjectId },
    ownerMapId: { type: Schema.Types.ObjectId },
    userId: { type: Schema.Types.ObjectId },
    text: { type: String },
  },
  {
    collection: "notes",
    timestamps: true,
  }
);


export default mongoose.model<INote>("Note", noteSchema);
