import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const AdminSchema: mongoose.Schema = new Schema(
  {
    password: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    collection: "admins",
    timestamps: true,
  }
);

interface IAdmin extends Document {
  email: string;
  password: string;
}

export default mongoose.model<IAdmin>("Admin", AdminSchema);
