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

export async function sha256(password: string | undefined) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
