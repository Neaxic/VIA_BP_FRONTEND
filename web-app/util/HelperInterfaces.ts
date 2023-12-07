import crypto from "crypto";
import { ILoginResponse } from "./UserInterfaces";

export interface IThrowError {
  httpStatus: string;
  message: string;
}

export type OeeData = {
  [batchNo: number]: string | number;
};
// Definerer en type for den mest hyppige produktfejlstatus
export type FrequentProductErrorData = {
  [batchNo: number]: {
    errorLookUpId: string;
    count: number;
  };
};


export const initialLoginResponse: ILoginResponse = {
  username: "",
  token: "",
};

export async function sha256(password: string) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}
