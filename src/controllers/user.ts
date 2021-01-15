import { Request, Response } from "express";
import { formValidate } from "../lib/util/formValidate";
import findOneAndUpdateOrCreate from "../lib/util/findOneAndUpdateOrCreate";
import { IFormDataToClientSuccess, EProvider } from "../lib/types/form.type";
import User from "../models/user";

// POST: Dang ky - Provider: local
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const errors = formValidate(email, password);
    if (errors) {
      return res.json({ success: false, errors });
    }
    const user = new User();
    user.email = email;
    user.password = password;
    user.provider = "LOCAL";
    await user.save();

    req.session.userId = user._id;
    return res.json({
      success: true,
      data: { email: user.email, provider: user.provider },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        success: false,
        errors: [{ name: "email", error: "Email da ton tai" }],
      });
    }
  }
};

// POST: Dang nhap voi tai khoan local
export const loginLocal = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const errors = formValidate(email, password);
  if (errors) {
    return res.json({ success: false, errors });
  }

  // // Kiem tra email co ton tai
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      success: false,
      errors: [
        { name: "email", error: "Sai tai khoan hoac mat khau" },
        { name: "password", error: "Sai tai khoan hoac mat khau" },
      ],
    });
  }

  // // Kiem tra mat khau
  if (!(await user.verifyPassword(password))) {
    return res.json({
      success: false,
      errors: [{ name: "password", error: "Sai mat khau" }],
    });
  }

  // dang nhap thanh cong
  req.session.userId = user._id;
  return res.json({
    success: true,
    data: { email: user.email, provider: user.provider },
  });
};

// POST: Dang nhap voi facebook
export const loginFacebook = async (req: Request, res: Response) => {
  const user = await findOneAndUpdateOrCreate(req.body);
  // dang nhap thanh cong
  req.session.userId = user._id;
  return res.json({
    success: true,
    data: { email: user.email, provider: EProvider.Facebook },
  } as IFormDataToClientSuccess);
};

// GET: Kiem tra thong tin nguoi dung trong session neu ton tai
export const current = async (req: Request, res: Response) => {
  const userId = req.session.userId;
  if (!userId) return res.json({ user: null });

  const user = await User.findById(userId);
  if (!user) {
    return res.json({ user: null });
  }

  const mapArr = user.maps.map((map) => {
    return { mapHasStarted: map.mapId, ownerMapId: map._id };
  });

  return res.json({
    success: true,
    user: {
      email: user.email,
      jwt: user?.jwt,
      provider: user.provider,
      _id: userId
    },
    map: mapArr,
  });
};
