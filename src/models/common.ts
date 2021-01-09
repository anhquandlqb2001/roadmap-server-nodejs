import mongoose, {Document} from "mongoose";

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    heading: { type: String },
    detail: { type: String },
  },
  {
    collection: "commons",
    timestamps: true,
  }
);

interface ICommon extends Document {
  heading: string
  detail: string
}

export default mongoose.model<ICommon>("Common", noteSchema);
