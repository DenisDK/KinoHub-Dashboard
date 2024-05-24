"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 130,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 130,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => {
      const firstName = params.row.firstName || "";
      const lastName = params.row.lastName || "";
      return `${firstName} ${lastName}`;
    },
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const DataTable = () => {
  const { theme } = useTheme();
  return (
    <div className="w-full h-auto bg-[#cccccc] dark:bg-[#272727] mt-5 duration-300 rounded-lg p-5">
      <DataGrid
        sx={() => ({
          border: 1,
          borderColor: theme === "dark" ? "#cccccc" : "#5c5c5c",
          "& .MuiDataGrid-cell:hover": {
            color: theme === "dark" ? "#c4c4c4" : "#525252",
          },
          "& .MuiDataGrid-cell": {
            color: theme === "dark" ? "#e0e0e0" : "#000",
          },
          "& .MuiDataGrid-columnHeaders": {
            color: theme === "dark" ? "#e0e0e0" : "#000",
          },
          "& .MuiIconButton-root": {
            color: theme === "dark" ? "#e0e0e0" : "#000",
          },
          "& .MuiSelect-iconStandard": {
            color: theme === "dark" ? "#e0e0e0" : "#6e6e6e",
          },
          //  "& .MuiTablePagination-actions": {
          //    color: theme === "dark" ? "#e0e0e0" : "#6e6e6e",
          //  },
          "& .MuiTablePagination-root": {
            color: theme === "dark" ? "#e0e0e0" : "#6e6e6e",
          },
          "& .MuiDataGrid-selectedRowCount": {
            color: theme === "dark" ? "#e0e0e0" : "#6e6e6e",
          },
          "& .MuiCheckbox-colorPrimary": {
            color: theme === "dark" ? "#e0e0e0" : "#6e6e6e",
          },
          "& .Mui-disabled": {
            color: theme === "dark" ? "#4f4f4f" : "#a1a1a1",
          },
        })}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        //   className="border border-[#5c5c5c] dark:text-white"
      />
    </div>
  );
};

export default DataTable;
