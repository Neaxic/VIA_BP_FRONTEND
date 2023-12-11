export interface IMachine {
  status: number;
  machineID: number;
  machineName: string;
  description: string;
  statusCode: {
    statusCodeID: number;
    statusDescription: string;
  };
  batches: IBatch[];
  machineRunning: boolean;
}

export interface IBatch {
  batchNo: number;
  batchSize: number;
  startTime: string;
  endTime: string;
  productsMade: number; // Ændret fra productsMake
}

export interface IProblemMachine extends IMachine {
  downtimePercentage?: number;
  breakdownAmount?: number;
  lastBreakdown?: {
    statusCode: number;
    timesince: number; // in minutes
  }
}

export const initialMachine: IMachine = {
  status: 0,
  machineID: 0,
  machineName: "",
  description: "",
  statusCode: {
    statusCodeID: 0,
    statusDescription: "",
  },
  batches: [],
  machineRunning: false,
};

export interface IProductErrorFreq {
  productErrorName: string;
  frequency: number;
}
export interface IErrorFreq {
  errorName: string;
  frequency: number;
}

export interface IProductProduced {
  date: string;
  ProductsMade: number;
}

export interface IMachineStatistics {
  downtimePercent: number;
  breakdownCount: number;
  lastBreakdown: { statusCode: number, timesince: number };
  errorCodeFrequency: { subject: string, A: number, fullMark: number }[];
  productErrorFrequency: { subject: string, A: number, fullMark: number }[];
  historyBatch: [];
  frequentErrors: [];
  machineData: {};
}