import { Entity, BaseEntity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { Maps } from "./Road";

class NoteMap {
  @Column()
  map: Maps

  @Column({default: true})
  text: string = ""
}

@Entity({ name: "notes" })
export default class Note extends BaseEntity {
  @ObjectIdColumn()
  userID: ObjectID;

  @Column({default: true})
  note: {
    name: Maps
    text: string
  }[] = []
}