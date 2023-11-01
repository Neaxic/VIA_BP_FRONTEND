import axios from "axios";

const URL =
  "http://localhost:5000/registerUser?username=apiTest9&password=apiTest2&isAdmin=false";
const URLKAPS = "NeedThis";
const API_KEY = "IFWENEEDTHIS";

export const createUserApi = async (
  unsername: string,
  password: string,
  isAdmin: boolean
) => {
  try {
    console.log("CreateUserApi Bliver kaldt --> User-auth-Form");
    const apiUrl = `${URLKAPS}/registerUser?username=${unsername}&password=${password}&isAdmin=${isAdmin}`;
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
    console.log("LoginUserApi Bliver kaldt --> User-auth-Form");
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
