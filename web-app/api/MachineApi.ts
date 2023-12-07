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
    const response = await axios({
      method: "GET",
      url: `getCurrentOeeFromBatch?batchNo=${batchNo}`,
      baseURL: URL,
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
    const response = await axios({
      method: "GET",
      url: `getMostFrequentStatusForBatch?batchNo=${batchNo}`,
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

export const getMostFrequentStatusForMachine = async (machineId: number) => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `getMostFrequentStatusForMachine?machineId=${machineId}`,
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

export const getHistoryBatchData = async (machineId: number) => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `getHistoryBatchData?machineId=${machineId}`,
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

export const getNumBreakdowns24hr = async () => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/amountOfBreakdowns24hrForAllMachines`,
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

export const getNumBreakdowns24hrByMachineId = async (machineId: number) => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/amountOfBreakdowns24hrByMachine?machineId=${machineId}`,
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

export const getLastBreakdown = async (machineId: number) => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/getLastBreakdown?machineId=${machineId}`,
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

export const getMachineOverviewByMachineLast24 = async (machineId: number) => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/getMachineOverviewByMachineLast24?machineId=${machineId}`,
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

export const getMachineOverviewAllMachineLast24 = async () => {
  reloadToken();
  try {
    const response = await axios({
      method: "GET",
      url: `/getMachineOverviewAllMachineLast24`,
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
