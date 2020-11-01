import { FormErrorResponse } from "../types/user.type";

export const formValidate = (email: string, password: string) => {
  if (!email && !password) {
    return {
      errors: [
        { name: "email", errors: "Email khong duoc de trong" },
        { name: "password", errors: "Password khong duoc de trong" },
      ],
    } as FormErrorResponse;
  }

  if (!password) {
    return {
      errors: [{ name: "password", errors: "Password khong duoc de trong" }],
    } as FormErrorResponse;
  }

  if (password.length <= 3) {
    return {
      errors: [{ name: "password", errors: "Password phai dai hon 3 ki tu" }],
    } as FormErrorResponse;
  }

  if (!email) {
    return {
      errors: [{ name: "email", errors: "Email khong duoc de trong" }],
    } as FormErrorResponse;
  }

  if (!email.includes("@")) {
    return {
      errors: [{ name: "email", errors: "Vui long nhap dung email" }],
    } as FormErrorResponse;
  }

  if (email.slice(0, email.indexOf('@')).length <= 3) {
    return {
      errors: [{ name: "email", errors: "Ten email phai dai hon 3 ki tu" }],
    } as FormErrorResponse;
  }

  return null;
};
