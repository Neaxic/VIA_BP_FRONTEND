export interface IMachine {
    machineID: number;
    machineName: string;
    description: string;
    statusCode: {
        statusCodeID: number;
        statusDescription: string;
    };
    currentBatch: {
        batchNo: number;
        machineID: number;
        producedItems: number;
        startTime: string;
        endTime: string;
    };
    batches: [{
        batchNo: number;
        machineID: number;
        producedItems: number;
        startTime: string;
        endTime: string;
    }];
    machineRunning: boolean;
}