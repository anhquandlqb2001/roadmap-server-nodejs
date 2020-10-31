import User from "../../entities/User";

const findOneAndUpdateOrCreate = async (data: User) => {
  // kiem tra xem nguoi dung da ton tai chua
  const _user = await User.findOne({ where: { email: data.email } });
  if (!_user) {
    const user = User.create(data);
    return await user.save();
  }

  // cap nhap thong tin nguoi dung
  await User.update(
    { email: data.email },
    {
      extend: data.extend,
    }
  )

  return await User.findOne({ where: { email: data.email } });
};

export default findOneAndUpdateOrCreate;
