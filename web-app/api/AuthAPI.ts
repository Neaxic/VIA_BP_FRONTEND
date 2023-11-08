import axios from "axios";
import { IThrowError } from "../util/HelperInterfaces";

const URL = process.env.NEXT_PUBLIC_API_URL;
let session = "lasd";

export const reloadToken = () => {
  let tmp = localStorage.getItem("jwt");
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

    return e.response.data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const createUserApi = async (
  username: string,
  password: string,
  isAdmin: boolean
) => {
  try {
    // reloadToken();
    const response = await axios({
      method: "POST",
      url: `/api/registerUser?username=${username}&password=${password}&isAdmin=${isAdmin}`,
      baseURL: URL,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session}`,
      },
    });
    if (response.data) return response.data;
  } catch (e) {
    console.log(e);
    const casted: IThrowError = e.response.data as IThrowError;
    return casted.message;
  }
};
