import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = "IFWENEEDTHIS";


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
        password: password
      }
    });

    return response;
  } catch (e) {
    console.log(e);
  }
};

export const createUserApi = async (
  unsername: string,
  password: string,
  isAdmin: boolean
) => {
  try {
    console.log("CreateUserApi Bliver kaldt --> User-auth-Form");
    const apiUrl = `${URL}/registerUser?username=${unsername}&password=${password}&isAdmin=${isAdmin}`;
    console.log(apiUrl);
    console.log("API URL:", apiUrl); // Bliver brugt til at se hvad den sender da der ikke er en
    const response = await axios({
      method: "POST",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    if (response.data) return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }

};