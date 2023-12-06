import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;
//const URL = "http://localhost:5000";
let session = "placeholder";

export const reloadToken = () => {
  let tmp = localStorage.getItem("token");
  if (tmp) session = tmp;
};

export const getCurrentOeeFromBatch = async (batchNo: number) => {
  reloadToken();
  try {
    const apiUrl = `${URL}getCurrentOeeFromBatch?batchNo=${batchNo}`;
    const response = await axios({
      method: "GET",
      url: apiUrl,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session.replace(/['"]+/g, "")}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getMostFrequentStatusForBatch = async (batchNo: number) => {
  reloadToken();
  try {
    const apiUrl = `${URL}getMostFrequentStatusForBatch?batchNo=${batchNo}`;
    const response = await axios({
      method: "GET",
      url: apiUrl,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session.replace(/['"]+/g, "")}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getMachineUpTime24HourProcentage = async (machineId: number) => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `getMachineUpTime24HourProcentage?machineId=${machineId}`,
      baseURL: URL,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session.replace(/['"]+/g, "")}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getMostFrequentStatusForMachine = async () => {
  reloadToken();
  try {
    const apiUrl = `${URL}getMostFrequentStatusForMachine`;
    const response = await axios({
      method: "GET",
      url: apiUrl,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session.replace(/['"]+/g, "")}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getMostProlematicMachine24hr = async () => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/getMostProblematicMachine24hr`,
      baseURL: URL,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session.replace(/['"]+/g, "")}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
