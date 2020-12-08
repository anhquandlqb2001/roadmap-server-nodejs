
export const formValidate = (email: string, password: string) => {
  if (!email && !password) {
    return [
        { name: "email", error: "Email khong duoc de trong" },
        { name: "password", error: "Password khong duoc de trong" },
      ]
  }

  if (!password) {
    return [{ name: "password", error: "Password khong duoc de trong" }]
  }

  if (password.length <= 3) {
    return [{ name: "password", error: "Password phai dai hon 3 ki tu" }]
  }

  if (!email) {
    return [{ name: "email", error: "Email khong duoc de trong" }]
  }

  if (!email.includes("@")) {
    return [{ name: "email", error: "Vui long nhap dung email" }]
  }

  if (email.slice(0, email.indexOf('@')).length <= 3) {
    return [{ name: "email", error: "Ten email phai dai hon 3 ki tu" }]
  }

  return null;
};
