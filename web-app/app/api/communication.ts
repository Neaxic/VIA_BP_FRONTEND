import axios from "axios";

const URL = "NeedThis";
const URLKAPS = "NeedThis";
const API_KEY = "IFWENEEDTHIS";

export const createUserApi = async (
  unsername: string,
  password: string,
  isAdmin: boolean
) => {
  try {
    const apiUrl = `${URLKAPS}/createUser?unsername=${unsername}&password=${password}`;
    console.log("API URL:", apiUrl); // Bliver brugt til at se hvad den sender da der ikke er en

    const response = await axios({
      method: "POST",
      url: apiUrl,
      withCredentials: false,
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

export const LoginUserApi = async (username: string, password: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${URLKAPS}/login?username=${username}&password=${password}`,
      headers: {
        accept: "application/json",
      },
    });

    const result = response.data;
    return result;
  } catch (e) {
    console.log(e);
  }
};
