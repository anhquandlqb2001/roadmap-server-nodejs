// import User from "../../entities/User";
import User, { IUserDocument } from "../../models/user";

const findOneAndUpdateOrCreate = async (data: IUserDocument) => {
  // kiem tra xem nguoi dung da ton tai chua
  const _user = await User.findOne({ email: data.email });
  if (!_user) {
    // neu chua ton tai
    const user = new User();
    user.email = data.email;
    user.imageUrl = data.imageUrl
    user.token = data.token
    user.provider = data.provider;
    await user.save();
    return user;
  }

  // cap nhat thong tin nguoi dung
  const user = await User.findOneAndUpdate(
    { _id: data._id },
    { token: data.token, imageUrl: data.imageUrl }
  );
  return user;
  // return await User.findOne({ where: { email: data.email } });
};

export default findOneAndUpdateOrCreate;
