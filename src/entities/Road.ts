import { EMap, TReact } from "../lib/types/map.type";
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";
import { mongo} from "mongoose";


export enum EVote {
  Upvote = "UPVOTE",
  Downvote = "DOWNVOTE"
}

export class Vote {
  @ObjectIdColumn()
  userID: ObjectID;

  @Column()
  type: EVote;
}



class CommentBase {
  @ObjectIdColumn({default: true})
  _id: ObjectID = new mongo.ObjectId() as any

  @ObjectIdColumn()
  userID: ObjectID

  @Column()
  text: string;
}

export class Comment extends CommentBase {
  @Column({ default: true })
  reply?: CommentBase[] = [];

  @Column({ default: true })
  vote?: Vote[] = [];
}


export interface IMap {
  react: string;
}

export class Maps {
  @Column()
  REACT: EMap.React;

  @Column()
  FRONT_END: EMap.FrontEnd;
}

@Entity({ name: "roads" })
export default class Road extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: EMap;

  @Column({ default: true })
  comments: Comment[] = []

  @Column({ default: true })
  stars: ObjectID[] = []

}
