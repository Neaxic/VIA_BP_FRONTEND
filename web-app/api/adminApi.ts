import axios from "axios";
import { IThrowError } from "../util/HelperInterfaces";

//NEEDED FOR JEST TESTS - TO LOAD FORCEFULLY ENV VARIABLES
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const URL = process.env.NEXT_PUBLIC_API_URL;
//const URL = "http://localhost:5000";
let session = "placeholder";

export const reloadToken = () => {
  let tmp = localStorage.getItem("token");
  if (tmp) session = tmp;
};

export const testConnection = async (token: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: `/testConnection`,
      baseURL: URL,
      headers: {
        accept: "application/json",
        "content-Type": "application/json",
        authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
      },
    });
    return response.data;
  } catch (e: any) {
    console.log(e);
    if (e.response && e.response.data) {
      const casted: IThrowError = e.response.data as IThrowError;
      return casted.message;
    }
    return e.response;
  }
};



export const registerMachineApi = async (
  machineName: string,
  description: string,
  statusCode: string
) => {
  reloadToken();
  try {
    const apiUrl = `${URL}/registerMachine?machineName=${machineName}&description=${description}&statusCode=${statusCode}`;
    const response = await axios({
      method: "POST",
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

export const registerBatchApi = async (
  batchNo: number,
  machineID: number,
  producedItems: number,
  startTime: string,
  endTime: string
) => {
  reloadToken();
  try {
    const apiUrl = `${URL}/registerBatch?batchNo=${batchNo}&machineID=${machineID}&producedItems=${producedItems}&startTime=${startTime}&endTime=${endTime}`;
    const response = await axios({
      method: "POST",
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

export const registerStatusCodeApi = async (statusCode: string) => {
  reloadToken();
  try {
    const apiUrl = `${URL}/registerStatus?statusCode=${statusCode}`;
    const response = await axios({
      method: "POST",
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

export const registerErrorCodeApi = async (errorCode: string) => {
  reloadToken();
  try {
    const apiUrl = `${URL}/registerErrorCodes?errorCode=${errorCode}`;
    const response = await axios({
      method: "POST",
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

export const registerMachineErrorHistoryApi = async (
  historyId: number,
  machineId: number,
  errorId: number,
  timeForMistake: string
) => {
  reloadToken();
  try {
    const apiUrl = `${URL}/registerMEH?historyId=${historyId}&machineId=${machineId}&errorId=${errorId}&timeForMistake=${timeForMistake}`;
    const response = await axios({
      method: "POST",
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

//                                                GET

export const getErrorCodeByIdApi = async (id: number) => {
  reloadToken();
  try {
    const apiUrl = `${URL}/getErrorCode?id=${id}`;
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

export const getMachineErrorHistoryByIdApi = async (id: number) => {
  reloadToken();
  try {
    const apiUrl = `${URL}/getMachineErrorHistory?id=${id}`;
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

export const getMachineByIdApi = async (id: number) => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/getMachineById?id=${id}`,
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

export const getBatchInfoByBatchNoApi = async (batchNo: number) => {
  reloadToken();
  try {
    const apiUrl = `${URL}/getBatchInfo?batchno=${batchNo}`;
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

export const getStatusCodeByIdApi = async (id: number) => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/getStatusCode?id=${id}`,
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

export const getAllStatusCodeApi = async () => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/getAllStatusCodes`,
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

export const getAllErrorCodes = async () => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/getAllErrorCodes`,
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

export const getAllBatchs = async () => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/getAllBatchs`,
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

export const getAllMachines = async () => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/getAllMachines`,
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

export const getAllMEH = async () => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/getAllMEH`,
      baseURL: URL,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session.replace(/['"]+/g, "")}`,
      },
    });
    return console.log(response.data);
  } catch (e) {
    console.log(e);
  }
};

export const getAllUsers = async () => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/getAllUsers`,
      baseURL: URL,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session.replace(/['"]+/g, "")}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getAllLookupRoles = async () => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/getAllLookupRoles`,
      baseURL: URL,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session.replace(/['"]+/g, "")}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const deleteUser = async (id: number) => {
  reloadToken();
  try {
    const response = await axios({
      method: "DELETE",
      url: `/deleteUser?userId=${id}`,
      baseURL: URL,
      headers: {
        accept: "application/json",
        "content-Type": "application/json",
        authorization: `Bearer ${session.replace(/['"]+/g, "")}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};