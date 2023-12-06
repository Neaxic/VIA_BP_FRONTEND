import crypto from "crypto";
import { ILoginResponse } from "./UserInterfaces";

export interface IThrowError {
  httpStatus: string;
  message: string;
}


export const initialLoginResponse: ILoginResponse = {
  username: "",
  token: "",
};

export async function sha256(password: string) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}
