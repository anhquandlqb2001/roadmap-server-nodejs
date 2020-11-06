import { EMap, TReact } from "../lib/types/map.type";
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

export type IVote = "upvote" | "downvote";

export class Vote {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  type: IVote;
}

export class Star {
  @ObjectIdColumn()
  _id: ObjectID;
}

export class Comment {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  text: string;

  @Column()
  vote: Vote;
}

class ReactMap {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  map: {
    username: "quanprolazer";
    roadmap: TReact
    comments: Comment;
    stars: Star;
  };
}

class FrontEndMap {}

export class Maps {
  @Column()
  react: ReactMap;

  @Column()
  frontend: FrontEndMap;
}

@Entity({ name: "roads" })
export default class Road extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: EMap;

  @Column()
  comments: Comment;

  @Column()
  stars: Star;

  // @Column()
  // maps: Maps
}
