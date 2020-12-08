import mongoose, {
  Types,
  Document,
  SchemaTimestampsConfig,
  Model,
} from "mongoose";

const Schema = mongoose.Schema;

export interface IMap {
  name: string;
  map: string;
  description: Object;
  documentation: Object;
  introduction: string;
  comments: Array<Types.ObjectId>;
  stars: Types.ObjectId[];
}

export interface IDescription {
  mapId: IMapDocument["_id"];
  title: string;
  detail: string;
}

export interface IDocumentation {
  mapId: IMapDocument["_id"];
  text: string;
}

export interface IMapDocument extends IMap, Document, SchemaTimestampsConfig {
  description: IDescription;
  documentation: IDocumentation;
}

const MapSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    map: {
      type: String,
    },
    description: { type: Object, default: {} },
    documentation: { type: Object, default: {} },
    introduction: { type: String },
    comments: {
      type: [mongoose.Types.ObjectId],
    },
    stars: {
      type: [mongoose.Types.ObjectId],
    },
  },
  {
    collection: "maps",
    timestamps: true,
  }
);

export interface IMapModel extends Model<IMapDocument> {
  insertCommentId(
    mapId: Types.ObjectId,
    commentId: Types.ObjectId
  ): Promise<boolean>;
}

MapSchema.statics.insertCommentId = async function insertCommentId(
  mapId: Types.ObjectId,
  commentId: Types.ObjectId
) {
  try {
    const map: IMapDocument = await this.findById(mapId);
    map.comments.push(commentId);
    await map.save();
  } catch (error) {}
  return true;
};

export default mongoose.model<IMapDocument, IMapModel>("MapModel", MapSchema);
