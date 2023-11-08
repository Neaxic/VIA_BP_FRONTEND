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
  data: TableData[]; // Ensure this is always an array
}

const Table: React.FC<TableProps> = ({ caption, columns, data = [] }) => {
  const [newRowData, setNewRowData] = React.useState<TableData>(
    columns.reduce((acc, column) => ({ ...acc, [column.field]: "" }), {})
  );

  const handleInputChange = (field: string, value: string) => {
    setNewRowData({ ...newRowData, [field]: value });
  };

  // If data is undefined or not an array, the component will return null or you can handle it as you see fit
  if (!Array.isArray(data)) {
    return null; // or some error component
  }

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
        <TableRow>
          {columns.map((column, colIndex) => (
            <TableCell key={colIndex} className={column.className}>
              <input
                type="text"
                value={newRowData[column.field]}
                onChange={(e) =>
                  handleInputChange(column.field, e.target.value)
                }
                className="input-class"
              />
            </TableCell>
          ))}
        </TableRow>
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
