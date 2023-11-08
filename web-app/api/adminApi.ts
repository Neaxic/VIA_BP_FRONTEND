import axios from "axios";
const URL = "https://via-bp-backend-delegator-bb6352f3951c.herokuapp.com";
const API_KEY = "IFWENEEDTHIS";

export const registerMachineApi = async (
  machineName: string,
  description: string,
  statusCode: string
) => {
  try {
    const apiUrl = `${URL}/registerMachine?machineName=${machineName}&description=${description}&statusCode=${statusCode}`;
    const response = await axios({
      method: "POST",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
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
  try {
    const apiUrl = `${URL}/registerBatch?batchNo=${batchNo}&machineID=${machineID}&producedItems=${producedItems}&startTime=${startTime}&endTime=${endTime}`;
    const response = await axios({
      method: "POST",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const registerStatusCodeApi = async (statusCode: string) => {
  try {
    const apiUrl = `${URL}/registerStatus?statusCode=${statusCode}`;
    const response = await axios({
      method: "POST",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const registerErrorCodeApi = async (errorCode: string) => {
  try {
    const apiUrl = `${URL}/registerErrorCodes?errorCode=${errorCode}`;
    const response = await axios({
      method: "POST",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
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
  try {
    const apiUrl = `${URL}/registerMEH?historyId=${historyId}&machineId=${machineId}&errorId=${errorId}&timeForMistake=${timeForMistake}`;
    const response = await axios({
      method: "POST",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

//                                                GET

export const getErrorCodeByIdApi = async (id: number) => {
  try {
    const apiUrl = `${URL}/getErrorCode?id=${id}`;
    const response = await axios({
      method: "GET",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getMachineErrorHistoryByIdApi = async (id: number) => {
  try {
    const apiUrl = `${URL}/getMachineErrorHistory?id=${id}`;
    const response = await axios({
      method: "GET",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getMachineByIdApi = async (id: number) => {
  try {
    const apiUrl = `${URL}/getMachine?id=${id}`;
    const response = await axios({
      method: "GET",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getBatchInfoByBatchNoApi = async (batchNo: number) => {
  try {
    const apiUrl = `${URL}/getBatchInfo?batchno=${batchNo}`;
    const response = await axios({
      method: "GET",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getStatusCodeByIdApi = async (id: number) => {
  try {
    const apiUrl = `${URL}/getStatusCode?id=${id}`;
    const response = await axios({
      method: "GET",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllUserApi = async () => {
  try {
    const apiUrl = `${URL}/FUCKDIG`;
    const response = await axios({
      method: "GET",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllStatusCodeApi = async () => {
  try {
    const apiUrl = `${URL}/getAllStatusCodes`;
    const response = await axios({
      method: "GET",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllErrorCodes = async () => {
  try {
    const apiUrl = `${URL}/getAllErrorCodes`;
    const response = await axios({
      method: "GET",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllBatchs = async () => {
  try {
    const apiUrl = `${URL}/getAllBatchs`;
    const response = await axios({
      method: "GET",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllMachines = async () => {
  try {
    const apiUrl = `${URL}/getAllMachines`;
    const response = await axios({
      method: "GET",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllMEH = async () => {
  try {
    const apiUrl = `${URL}/getAllMEH`;
    const response = await axios({
      method: "GET",
      url: apiUrl,
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
