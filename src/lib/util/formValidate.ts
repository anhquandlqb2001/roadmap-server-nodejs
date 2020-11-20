import { IFormDataToClientFail } from "../types/form.type";

export const formValidate = (email: string, password: string) => {
  if (!email && !password) {
    return {
      success: false,
      errors: [
        { name: "email", error: "Email khong duoc de trong" },
        { name: "password", error: "Password khong duoc de trong" },
      ],
    } as IFormDataToClientFail;
  }

  if (!password) {
    return {
      success: false,
      errors: [{ name: "password", error: "Password khong duoc de trong" }],
    } as IFormDataToClientFail;
  }

  if (password.length <= 3) {
    return {
      success: false,
      errors: [{ name: "password", error: "Password phai dai hon 3 ki tu" }],
    } as IFormDataToClientFail;
  }

  if (!email) {
    return {
      success: false,
      errors: [{ name: "email", error: "Email khong duoc de trong" }],
    } as IFormDataToClientFail;
  }

  if (!email.includes("@")) {
    return {
      success: false,
      errors: [{ name: "email", error: "Vui long nhap dung email" }],
    } as IFormDataToClientFail;
  }

  if (email.slice(0, email.indexOf('@')).length <= 3) {
    return {
      success: false,
      errors: [{ name: "email", error: "Ten email phai dai hon 3 ki tu" }],
    } as IFormDataToClientFail;
  }

  return null;
};
