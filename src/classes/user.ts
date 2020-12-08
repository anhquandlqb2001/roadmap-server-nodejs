import UserModel from "../models/user.model";

export class BaseUser {
  protected email: string;
  protected provider: string;
  protected maps: Array<Object>;
  constructor(email: string) {
    this.email = email;
  }

  /**
   * formErrors
   */
  public formErrorsResponse(errors: any) {
    return { success: false, errors: errors };
  }

  public formSuccessResponse(message: string) {
    return { success: true, message };
  }
}

export class LocalUser extends BaseUser {
  private password: string;
  constructor(email: string, password: string) {
    super(email);
    this.password = password;
  }

  public async login() {
    const errors = this.validate();
    if (errors) {
      return this.formErrorsResponse(errors);
    }

    const user = await UserModel.findOne({ email: this.email });
    if (!user) {
      return this.formErrorsResponse([
        { name: "email", error: "Sai tai khoan hoac mat khau" },
        { name: "password", error: "Sai tai khoan hoac mat khau" },
      ]);
    }

    // Kiem tra mat khau
    if (!(await user.verifyPassword(this.password))) {
      return this.formErrorsResponse([{ name: "password", error: "Sai mat khau" }]);
    }

    return true
  }

  public async register() {
    const errors = this.validate();
    if (errors) {
      return this.formErrorsResponse(errors);
    }

    return await this.createUser((err: any) => {
      if (err) {
        return this.formErrorsResponse(err);
      }
      return this.formSuccessResponse("Tao tai khoan thanh cong");
    });
  }

  private validate() {
    if (!this.email && !this.password) {
      return {
        errors: [
          { name: "email", error: "Email khong duoc de trong" },
          { name: "password", error: "Password khong duoc de trong" },
        ],
      };
    }

    if (!this.password) {
      return {
        errors: [{ name: "password", error: "Password khong duoc de trong" }],
      };
    }

    if (this.password.length <= 3) {
      return {
        errors: [{ name: "password", error: "Password phai dai hon 3 ki tu" }],
      };
    }

    if (!this.email) {
      return {
        errors: [{ name: "email", error: "Email khong duoc de trong" }],
      };
    }

    if (!this.email.includes("@")) {
      return {
        errors: [{ name: "email", error: "Vui long nhap dung email" }],
      };
    }

    if (this.email.slice(0, this.email.indexOf("@")).length <= 3) {
      return {
        errors: [{ name: "email", error: "Ten email phai dai hon 3 ki tu" }],
      };
    }
    return null;
  }

  private async createUser(cb: Function): Promise<any> {
    const user = new UserModel({
      password: this.password,
      email: this.email,
      provider: "LOCAL",
    });
    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        return cb([{ name: "email", error: "Email da ton tai" }]);
      }
    }
    return cb(null);
  }
}
