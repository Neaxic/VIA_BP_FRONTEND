import axios from "axios";

const URL = "NeedThis";
const URLKAPS = "NeedThis";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTMzMjZiMzg4MWQ3NThlMTkzOTI2YjRkOTE4NDcwMSIsInN1YiI6IjY0NjY4ZjI0MzNhMzc2MDBlNjc5NmQ3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgypCyWe-AyWmk8YCVahkl8J3Iw5HmxT8zZD7C1Czjc";

export const createUserApi = async (
  userNo: string,
  password: string,
  isAdmin: boolean
) => {
  try {
    const apiUrl = `${URLKAPS}/createUser?userNo=${userNo}&password=${password}`;
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
