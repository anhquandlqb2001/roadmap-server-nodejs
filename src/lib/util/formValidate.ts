import { IResponseServer } from "../../controllers/user";

export const formValidate = (email: string, password: string) => {
  if (!email && !password) {
    return {
      success: false,
      errors: [
        { name: "email", error: "Email khong duoc de trong" },
        { name: "password", error: "Password khong duoc de trong" },
      ],
    } as IResponseServer;
  }

  if (!password) {
    return {
      success: false,
      errors: [{ name: "password", error: "Password khong duoc de trong" }],
    } as IResponseServer;
  }

  if (password.length <= 3) {
    return {
      success: false,
      errors: [{ name: "password", error: "Password phai dai hon 3 ki tu" }],
    } as IResponseServer;
  }

  if (!email) {
    return {
      success: false,
      errors: [{ name: "email", error: "Email khong duoc de trong" }],
    } as IResponseServer;
  }

  if (!email.includes("@")) {
    return {
      success: false,
      errors: [{ name: "email", error: "Vui long nhap dung email" }],
    } as IResponseServer;
  }

  if (email.slice(0, email.indexOf('@')).length <= 3) {
    return {
      success: false,
      errors: [{ name: "email", error: "Ten email phai dai hon 3 ki tu" }],
    } as IResponseServer;
  }

  return null;
};
