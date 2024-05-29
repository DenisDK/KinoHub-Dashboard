import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { collection, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { db } from "@/lib/firebase";

const columns = [
  {
    field: "profile_image",
    headerName: "Avatar",
    width: 65,
    renderCell: (params) => {
      if (!params.value) {
        return <span>No Avatar</span>;
      }
      return (
        <div style={{ width: 45, height: 45, position: "relative" }}>
          <Image
            src={params.value}
            alt="avatar"
            fill
            sizes="50px"
            style={{ borderRadius: "50%" }}
          />
        </div>
      );
    },
  },
  {
    field: "nickname",
    headerName: "Name",
    width: 130,
  },
  {
    field: "isPremium",
    headerName: "Premium",
    width: 130,
    renderCell: (params) => <span>{params.value ? "Yes" : "No"}</span>,
  },
  {
    field: "isAdmin",
    headerName: "Admin",
    width: 130,
    renderCell: (params) => <span>{params.value ? "Yes" : "No"}</span>,
  },
];

const DataTable = () => {
  const { theme } = useTheme();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Users"), (snapshot) => {
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(usersList);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

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
      />
    </div>
  );
};

export default DataTable;
