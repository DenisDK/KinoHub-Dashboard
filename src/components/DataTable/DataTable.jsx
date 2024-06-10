import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import Image from "next/image";
import { db } from "@/lib/firebase";
import Button from "@mui/material/Button";
import CustomToolbar from "./CustomToolbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DataTable = () => {
  const { theme } = useTheme();
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Users"), (snapshot) => {
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(usersList);
    });

    return () => unsubscribe();
  }, []);

  //   const handleOpenDialog = (user) => {
  //     setUserToDelete(user);
  //     setOpen(true);
  //   };

  const handleCloseDialog = () => {
    setOpen(false);
    setUserToDelete(null);
  };

  // const handleDeleteUser = async () => {
  //    if (userToDelete) {
  //      const userRef = doc(db, "Users", userToDelete.id);
  //      await deleteDoc(userRef);
  //      handleCloseDialog();
  //    }
  //  };

  const filteredRows = rows.filter((row) =>
    row.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = async (userId) => {
    const batch = writeBatch(db);

    // Видалення документа користувача
    const userRef = doc(db, "Users", userId);
    deleteDoc(userRef);

    // Видалення всіх лайків/дизлайків користувача
    const ratingsSnapshot = await getDocs(collection(db, "Rating"));
    ratingsSnapshot.forEach((ratingDoc) => {
      const ratingData = ratingDoc.data();
      const updatedLikes = ratingData.likes.filter((id) => id !== userId);
      const updatedDislikes = ratingData.dislikes.filter((id) => id !== userId);

      batch.update(ratingDoc.ref, {
        likes: updatedLikes,
        dislikes: updatedDislikes,
      });
    });

    // Видалення всіх коментарів користувача
    const rootCollection = collection(db, "Comments");
    const querySnapshot = await getDocs(rootCollection);
    console.log(`aaaaaaaaaaaa`);

    for (const doc of querySnapshot.docs) {
      console.log(`перевірка ${doc.id} фільма`);
      console.log(`bbbbbbbbbbbbbb`);

      const subCollectionRef = collection(doc.ref, "comment");
      const subQuerySnapshot = await getDocs(subCollectionRef);

      subQuerySnapshot.forEach((subDoc) => {
        console.log(`перевірка ${subDoc.id} фільма`);
        console.log(`cccccccccccccccc`);

        const data = subDoc.data();
        if (data.userID === userId) {
          batch.delete(subDoc.ref);
        }
      });
    }
    // Commit all batch operations
    try {
      await batch.commit();
      console.log(
        `All comments by user ${userId} have been successfully deleted.`
      );
    } catch (error) {
      console.error("Error committing batch:", error);
    }
  };

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
              unoptimized={false} // {false} | {true}
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
      renderCell: (params) => (
        <span>{params.value ? "Преміум" : "Звичайний"}</span>
      ),
    },
    {
      field: "isAdmin",
      headerName: "Адмін",
      width: 100,
      renderCell: (params) => (
        <span>{params.value ? "Адмін" : "Звичайний"}</span>
      ),
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
            className="w-full"
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
            className="w-full"
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
      width: 165,
      renderCell: (params) => (
        <Button
          className="w-full"
          variant="contained"
          color="error"
          onClick={() => handleDeleteUser(params.row.id)}
        >
          Видалити
        </Button>
      ),
    },
  ];

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
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        //   checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          toolbar: { searchQuery, setSearchQuery },
        }}
      />
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="bg-[#ccc] dark:bg-[#272727] text-[#353535] dark:text-[#fff]"
        >
          {"Підтвердження видалення"}
        </DialogTitle>
        <DialogContent className="bg-[#ccc] dark:bg-[#272727]">
          <DialogContentText
            id="alert-dialog-description"
            className="text-[#4b4b4b] dark:text-[#d6d6d6]"
          >
            Ви впевнені, що хочете видалити користувача
            <span className="ml-1 font-bold text-xl text-[#353535] dark:text-[#fff]">
              {userToDelete?.nickname}
            </span>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="bg-[#ccc] dark:bg-[#272727]">
          <Button
            onClick={handleCloseDialog}
            className="text-[#007bff] font-bold hover:bg-[#b3c0c9] dark:hover:bg-[#32373a]"
          >
            Скасувати
          </Button>
          <Button
            onClick={handleDeleteUser}
            className="text-[#ff0000] font-bold hover:bg-[#c9b3b3] dark:hover:bg-[#3d3535]"
            autoFocus
          >
            Видалити
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
