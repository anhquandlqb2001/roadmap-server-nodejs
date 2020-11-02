import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from "typeorm";
import { ProviderType } from "../lib/types/user.type";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../lib/util/constants";

type UserPictureType = {
  data: {
    height: number;
    url: string;
  };
};

export class UserExtend {
  @Column()
  accessToken: string;

  @Column()
  expiresIn: number;

  @Column()
  name: string;

  @Column()
  picture: UserPictureType;
}

@Entity({ name: "users" })
export default class User extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column()
  provider: ProviderType;

  @Column()
  maps: Object[]

  @Column()
  extend?: UserExtend;

  @BeforeInsert()
  async beforeInsert() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
  }

  async verifyPassword(plainPwd: string) {
    try {
      return await bcrypt.compare(plainPwd, this.password).then(function (result) {
        if (!result) {
          return false;
        }
        return true;
      });
    } catch (error) {
      console.log("error verifyPwd: ", error);
    }
  }
}


