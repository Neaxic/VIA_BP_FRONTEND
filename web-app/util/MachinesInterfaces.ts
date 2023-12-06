export interface IMachine {
  status: string;
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
