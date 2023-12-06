import crypto from "crypto";

export interface IThrowError {
  httpStatus: string;
  message: string;
}

export interface ILoginResponse {
  email: string;
  token: string;
}

export const initialLoginResponse: ILoginResponse = {
  email: "",
  token: "",
};

export async function sha256(password: string) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}
