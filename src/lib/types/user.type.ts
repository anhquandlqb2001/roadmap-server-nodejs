import { Document } from "mongoose";

export default interface IUser extends Document {
  verifyPassword(plainPwd: string): any;
  email: string;
  password?: string;
  provider: 'local' | 'facebook',
  extend?: {
    accessToken: string,
    expiresIn: number,
    name: string,
    picture: {
      data: {
        height: number,
        url: string
      }
    },
  }
}

// {
//   errors: [
//     { name: ["email"], errors: ["Incorrect email or password"] },
//     { name: ["password"], errors: ["Incorrect email or password"] },
//   ],
// }


type FormErrorField = {
  name: string[];
  errors: string[];
};

export type FormErrorResponse = {
  errors: FormErrorField[];
};