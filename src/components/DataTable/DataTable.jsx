import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Image from "next/image";
import { db } from "@/lib/firebase";
import Button from "@mui/material/Button";
import CustomToolbar from "./CustomToolbar";

const columns = [
  {
    field: "profile_image",
    headerName: "Аватар",
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
    headerName: "Нік",
    width: 130,
  },
  {
    field: "isPremium",
    headerName: "Преміум",
    width: 100,
    renderCell: (params) => <span>{params.value ? "Yes" : "No"}</span>,
  },
  {
    field: "isAdmin",
    headerName: "Адмін",
    width: 100,
    renderCell: (params) => <span>{params.value ? "Yes" : "No"}</span>,
  },
  {
    field: "togglePremium",
    headerName: "Преміум статус",
    width: 150,
    renderCell: (params) => {
      const handleTogglePremium = async () => {
        const userRef = doc(db, "Users", params.row.id);
        await updateDoc(userRef, {
          isPremium: !params.row.isPremium,
        });
      };

      return (
        <Button
          variant="contained"
          color="primary"
          onClick={handleTogglePremium}
        >
          {params.row.isPremium ? "Забрати" : "Видати"}
        </Button>
      );
    },
  },
  {
    field: "toggleAdmin",
    headerName: "Адмін статус",
    width: 150,
    renderCell: (params) => {
      const handleToggleAdmin = async () => {
        const userRef = doc(db, "Users", params.row.id);
        await updateDoc(userRef, {
          isAdmin: !params.row.isAdmin,
        });
      };

      return (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleToggleAdmin}
        >
          {params.row.isAdmin ? "Забрати" : "Видати"}
        </Button>
      );
    },
  },
  {
    field: "deleteUser",
    headerName: "Видалити користувача",
    width: 155,
    renderCell: (params) => {
      const handleDeleteUser = async () => {
        const userRef = doc(db, "Users", params.row.id);
        await deleteDoc(userRef);
      };

      return (
        <Button variant="contained" color="error" onClick={handleDeleteUser}>
          Видалити
        </Button>
      );
    },
  },
];

const DataTable = () => {
  const { theme } = useTheme();
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

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

  // Filter rows based on search query
  const filteredRows = rows.filter((row) =>
    row.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        rows={filteredRows} // Use filtered rows instead of all rows
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        //   checkboxSelection
        components={{
          Toolbar: CustomToolbar, // Add custom toolbar
        }}
        componentsProps={{
          toolbar: { searchQuery, setSearchQuery }, // Pass search query state to the toolbar
        }}
      />
    </div>
  );
};

export default DataTable;
