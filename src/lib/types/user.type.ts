import { EProvider } from "./form.type";
import { IDataToClient, IUserExtends } from "./index.type";

export interface IDataCurrentUserToClient extends IDataToClient {
  user: {
    email: string,
    extend?: IUserExtends,
    jwt?: string,
    provider: EProvider,
  },
  map: any
}

