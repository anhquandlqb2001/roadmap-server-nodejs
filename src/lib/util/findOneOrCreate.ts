import UserModel from "../../models/user";
import IUser from "../types/user.type";

const findOneOrCreate = async (email: string, data: IUser): Promise<any> => {
  const prom = new Promise((resolve, reject) => {
    UserModel.findOne({ email: email }, async (err, result) => {
      if (err) return reject(err)
      if (!result) {
        const user = new UserModel({
          email: data.email,
          provider: data.provider,
          extend: data.extend
        } as IUser);
        
        await user.save()
        resolve(user)
      }
      resolve(result)
    });
  })
  return await prom.then(user => user)
};

export default findOneOrCreate;
