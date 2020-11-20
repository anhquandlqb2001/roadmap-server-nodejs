import { IDataToClient } from "./index.type"

// cac kieu dang nhap
export type TProvider = "LOCAL" | "FACEBOOK"

export enum EProvider {
    Local = "LOCAL",
    Facebook = "FACEBOOK"
}

// du lieu dang nhap gui ve tu client
interface ILoginDataFromClient {
    email: string
    provider: TProvider
    jwt?: string
}

// du lieu dang nhap gui ve tu client - LOCAL
interface ILoginLocalDataFromClient extends ILoginDataFromClient {
    password: string
}

// du lieu dang nhap gui ve tu client - voi Provider (FACEBOOK)
interface ILoginProvDataFromClient extends ILoginDataFromClient {
    extend: {
        token: string,
        expriresIn: number
        image?: {
            width: number,
            url: string
        }
    }
}

// cac truong cua form dang nhap or dang ky
type TField = "email" | "password"

// loi form
interface IFormError {
    name: TField,
    error: string
}

// du lieu ghi dang nhap/dang ky - loi
export interface IFormDataToClientFail extends IDataToClient {
    success: false
    errors: IFormError[]
}

// du lieu ghi dang nhap/dang ky - thanh cong
export interface IFormDataToClientSuccess extends IDataToClient {
    success: true
    data: any
    jwt?: string
}
