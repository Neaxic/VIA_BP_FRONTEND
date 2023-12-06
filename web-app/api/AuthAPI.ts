import axios from "axios";
import { IThrowError } from "../util/HelperInterfaces";

//NEEDED FOR JEST TESTS - TO LOAD FORCEFULLY ENV VARIABLES
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const URL = process.env.NEXT_PUBLIC_API_URL;
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
    if (e.response && e.response.data) {
      const casted: IThrowError = e.response.data as IThrowError;
      return casted.message;
    }
    return e.response;
  }
};

export const createUserApi = async (
  username: string,
  password: string,
  firstname: string,
  lastname: string,
  roleId: number,
) => {
  try {
    reloadToken();
    const response = await axios({
      method: "POST",
      url: `/registerUser`,
      baseURL: URL,
      data: {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        roleId: roleId,
      },
      headers: {
        accept: "application/json",
        "content-Type": "application/json",
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
