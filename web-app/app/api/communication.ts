import axios from "axios";

const URL = "https://via-bp-backend-delegator-bb6352f3951c.herokuapp.com";
const API_KEY = "IFWENEEDTHIS";

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
    const apiUrl = `${URL}/login?username=${username}&password=${password}`;
    console.log(apiUrl);
    console.log("LoginUserApi Bliver kaldt --> User-auth-Form");
    const response = await axios({
      method: "GET",
      url: apiUrl,
      headers: {
        accept: "application/json",
      },
    });

    const result = response.data;
    localStorage.setItem("token", JSON.stringify(result));
    console.log(response);
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
  }
};
