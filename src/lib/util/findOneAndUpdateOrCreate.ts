// import User from "../../entities/User";
import { IUser } from "index.type";
import User from "../../models/user.model";

const findOneAndUpdateOrCreate = async (data: IUser) => {
  // kiem tra xem nguoi dung da ton tai chua
  const _user = await User.findOne({ email: data.email });
  if (!_user) {
    // neu chua ton tai
    const user = await User.create(data);
    return user;
    // await user.save();
  }

  // cap nhat thong tin nguoi dung
  const user = await User.updateOne(
    { email: data.email },
    { extend: data.extend }
  );
  return user;
  // return await User.findOne({ where: { email: data.email } });
};

export default findOneAndUpdateOrCreate;
