import React from "react";
import {
  Table as UITable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import {
  getStatusCodeByIdApi,
  getBatchInfoByBatchNoApi,
  getMachineByIdApi,
  getMachineErrorHistoryByIdApi,
} from "../api/adminApi";

interface TableColumn {
  field: string;
  headerName: string;
  className?: string;
}

interface TableData {
  [key: string]: any;
}

interface TableProps {
  caption?: string;
  columns: TableColumn[];
  data: TableData[];
}

const Table: React.FC<TableProps> = ({ caption, columns, data }) => {
  // En state for at holde værdierne for de nye input felter.
  // Starter med et tomt objekt der passer med TableData interfacet.
  const [newRowData, setNewRowData] = React.useState<TableData>(
    columns.reduce((acc, column) => ({ ...acc, [column.field]: "" }), {})
  );

  // Funktion til at opdatere den nye række med data fra inputfelterne
  const handleInputChange = (field: string, value: string) => {
    setNewRowData({ ...newRowData, [field]: value });
  };

  return (
    <UITable>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index} className={column.className}>
              {column.headerName}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Input række */}
        <TableRow>
          {columns.map((column, colIndex) => (
            <TableCell key={colIndex} className={column.className}>
              <input
                type="text"
                value={newRowData[column.field]}
                onChange={(e) =>
                  handleInputChange(column.field, e.target.value)
                }
                className="input-class" // Du skal muligvis style dette
              />
            </TableCell>
          ))}
        </TableRow>
        {/* Eksisterende tabelrækker */}
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex} className={column.className}>
                {row[column.field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </UITable>
  );
};

export default Table;
