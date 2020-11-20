// import User from "../../entities/User";
import { IUserDocument } from "../types/index.type";
import User from "../../models/user.model";

const findOneAndUpdateOrCreate = async (data: IUserDocument) => {
  // kiem tra xem nguoi dung da ton tai chua
  const _user = await User.findOne({ email: data.email });
  if (!_user) {
    // neu chua ton tai
    const user = new User();
    user.email = data.email;
    user.extend = data.extend;
    user.provider = data.provider;
    await user.save();
    return user;
  }

  // cap nhat thong tin nguoi dung
  const user = await User.findOneAndUpdate(
    { _id: data._id },
    { extend: data.extend }
  );
  return user;
  // return await User.findOne({ where: { email: data.email } });
};

export default findOneAndUpdateOrCreate;
