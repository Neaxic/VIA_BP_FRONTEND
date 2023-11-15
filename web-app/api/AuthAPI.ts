import axios from "axios";
import { IThrowError } from "../util/HelperInterfaces";

//const URL = process.env.NEXT_PUBLIC_API_URL;
const URL = "http://localhost:5000";
let session = "placeholder";

export const reloadToken = () => {
  let tmp = localStorage.getItem("token");
  if (tmp) session = tmp;
};

export const loginApi = async (username: string, password: string) => {
  try {
    const response = await axios({
      method: "POST",
      url: `/auth/login`,
      baseURL: URL,
      headers: {
        accept: "application/json",
      },
      data: {
        email: username,
        password: password,
      },
    });

    return response.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data;
  }
};

export const verifyTokenApi = async (token: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: `/auth/verify?token=${token.replace(/['"]+/g, "")}`,
      baseURL: URL,
      headers: {
        accept: "application/json",
      },
    });
    if (response.data) return response.data;
  } catch (e: any) {
    console.log(e);
    const casted: IThrowError = e.response.data as IThrowError;
    return casted.message;
  }
};

export const createUserApi = async (
  username: string,
  password: string,
  isAdmin: boolean
) => {
  try {
    reloadToken();
    const response = await axios({
      method: "POST",
      url: `/api/registerUser?username=${username}&password=${password}&isAdmin=${isAdmin}`,
      baseURL: URL,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session.replace(/['"]+/g, "")}`,
      },
    });
    if (response.data) return response.data;
  } catch (e: any) {
    console.log(e);
    const casted: IThrowError = e.response.data as IThrowError;
    return casted.message;
  }
};
