import { FormErrorResponse } from "../types/user.type";

export const formValidate = (email: string, password: string) => {
  if (!email && !password) {
    return {
      errors: [
        { name: ["email"], errors: ["Email khong duoc de trong"] },
        { name: ["password"], errors: ["Password khong duoc de trong"] },
      ],
    } as FormErrorResponse;
  }

  if (!email) {
    return {
      errors: [{ name: ["email"], errors: ["Email khong duoc de trong"] }],
    } as FormErrorResponse;
  }

  if (!password) {
    return {
      errors: [{ name: ["email"], errors: ["Password khong duoc de trong"] }],
    } as FormErrorResponse;
  }

  return null
};
