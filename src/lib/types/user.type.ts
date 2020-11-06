import { UserExtend } from "../../entities/User";

type FormErrorField = {
  name: string;
  error: string;
};

// user provider
export enum EProvider {
  Local = "LOCAL",
  Facebook = "FACEBOOK"
}

export interface IResponseServer {
  success: boolean;
  message?: string;
}

export interface IResponseLoginSuccess extends IResponseServer {
  data: {
    email: string;
    jwt?: string;
  };
}

export interface IResponseError extends IResponseServer {
  errors: FormErrorField[];
}

export interface IResponseCurrentUser extends IResponseServer {
  user: {
    email: string,
    extend?: UserExtend,
    jwt?: string,
    provider: EProvider,
  },
}