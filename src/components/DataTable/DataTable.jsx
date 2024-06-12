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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPremiumDialog, setOpenPremiumDialog] = useState(false);
  const [openAdminDialog, setOpenAdminDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToUpdate, setUserToUpdate] = useState(null);

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

  const handleOpenDeleteDialog = (user) => {
    if (user.isAdmin) {
      alert("Адмін користувачів не можна видаляти.");
      return;
    }
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete || userToDelete.isAdmin) return;

    const userId = userToDelete.id;
    const batch = writeBatch(db);

    // Видалення записів з колекцій 'WatchedMovies', 'PlannedMovies', 'AbandonedMovies'
    const collectionsToDelete = [
      "WatchedMovies",
      "PlannedMovies",
      "AbandonedMovies",
    ];
    for (const collectionName of collectionsToDelete) {
      const collectionRef = collection(db, "Users", userId, collectionName);
      const snapshot = await getDocs(collectionRef);
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
    }

    // Оновлення списку друзів для кожного користувача
    const usersSnapshot = await getDocs(collection(db, "Users"));
    usersSnapshot.forEach((userDoc) => {
      const userData = userDoc.data();
      if (userData.friends.includes(userId)) {
        const updatedFriends = userData.friends.filter((id) => id !== userId);
        const userDocRef = doc(db, "Users", userDoc.id);
        batch.update(userDocRef, { friends: updatedFriends });
      }
    });

    // Видалення користувача
    const userRef = doc(db, "Users", userId);
    batch.delete(userRef);

    // Видалення оцінок
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

    // Видалення коментарів
    const rootCollection = collection(db, "Comments");
    const querySnapshot = await getDocs(rootCollection);

    for (const doc of querySnapshot.docs) {
      const subCollectionRef = collection(doc.ref, "comment");
      const subQuerySnapshot = await getDocs(subCollectionRef);

      subQuerySnapshot.forEach((subDoc) => {
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
        `All data related to user ${userId} has been successfully deleted.`
      );
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error committing batch:", error);
    }
  };

  const handleOpenPremiumDialog = (user) => {
    setUserToUpdate(user);
    setOpenPremiumDialog(true);
  };

  const handleClosePremiumDialog = () => {
    setOpenPremiumDialog(false);
    setUserToUpdate(null);
  };

  const handleTogglePremium = async () => {
    if (!userToUpdate) return;

    const userRef = doc(db, "Users", userToUpdate.id);
    await updateDoc(userRef, {
      isPremium: !userToUpdate.isPremium,
    });
    handleClosePremiumDialog();
  };

  const handleOpenAdminDialog = (user) => {
    setUserToUpdate(user);
    setOpenAdminDialog(true);
  };

  const handleCloseAdminDialog = () => {
    setOpenAdminDialog(false);
    setUserToUpdate(null);
  };

  const handleToggleAdmin = async () => {
    if (!userToUpdate) return;

    const userRef = doc(db, "Users", userToUpdate.id);
    await updateDoc(userRef, {
      isAdmin: !userToUpdate.isAdmin,
    });
    handleCloseAdminDialog();
  };

  const filteredRows = rows.filter((row) =>
    row.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      renderCell: (params) => (
        <Button
          className="w-full"
          variant="contained"
          color="primary"
          onClick={() => handleOpenPremiumDialog(params.row)}
        >
          {params.row.isPremium ? "Забрати" : "Видати"}
        </Button>
      ),
    },
    {
      field: "toggleAdmin",
      headerName: "Адмін статус",
      width: 150,
      renderCell: (params) => (
        <Button
          className="w-full"
          variant="contained"
          color="secondary"
          onClick={() => handleOpenAdminDialog(params.row)}
        >
          {params.row.isAdmin ? "Забрати" : "Видати"}
        </Button>
      ),
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
          onClick={() => handleOpenDeleteDialog(params.row)}
          disabled={params.row.isAdmin}
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
            color: theme === "dark" ? "#757575" : "#757575",
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
        // checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          toolbar: { searchQuery, setSearchQuery },
        }}
      />

      {/* Delete User Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
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
            onClick={handleCloseDeleteDialog}
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

      {/* Toggle Premium Dialog */}
      <Dialog
        open={openPremiumDialog}
        onClose={handleClosePremiumDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="bg-[#ccc] dark:bg-[#272727] text-[#353535] dark:text-[#fff]"
        >
          {userToUpdate?.isPremium
            ? "Підтвердження зняття преміум статусу"
            : "Підтвердження видачі преміум статусу"}
        </DialogTitle>
        <DialogContent className="bg-[#ccc] dark:bg-[#272727]">
          <DialogContentText
            id="alert-dialog-description"
            className="text-[#4b4b4b] dark:text-[#d6d6d6]"
          >
            Ви впевнені, що хочете{" "}
            {userToUpdate?.isPremium
              ? "забрати преміум статус у"
              : "видати преміум статус для"}
            користувача
            <span className="ml-1 font-bold text-xl text-[#353535] dark:text-[#fff]">
              {userToUpdate?.nickname}
            </span>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="bg-[#ccc] dark:bg-[#272727]">
          <Button
            onClick={handleClosePremiumDialog}
            className="text-[#007bff] font-bold hover:bg-[#b3c0c9] dark:hover:bg-[#32373a]"
          >
            Скасувати
          </Button>
          <Button
            onClick={handleTogglePremium}
            className="text-[#007bff] font-bold hover:bg-[#b3c0c9] dark:hover:bg-[#32373a]"
            autoFocus
          >
            {userToUpdate?.isPremium ? "Забрати" : "Видати"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toggle Admin Dialog */}
      <Dialog
        open={openAdminDialog}
        onClose={handleCloseAdminDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="bg-[#ccc] dark:bg-[#272727] text-[#353535] dark:text-[#fff]"
        >
          {userToUpdate?.isAdmin
            ? "Підтвердження зняття адмін статусу"
            : "Підтвердження видачі адмін статусу"}
        </DialogTitle>
        <DialogContent className="bg-[#ccc] dark:bg-[#272727]">
          <DialogContentText
            id="alert-dialog-description"
            className="text-[#4b4b4b] dark:text-[#d6d6d6]"
          >
            Ви впевнені, що хочете{" "}
            {userToUpdate?.isAdmin
              ? "забрати адмін статус у"
              : "видати адмін статус для"}
            користувача
            <span className="ml-1 font-bold text-xl text-[#353535] dark:text-[#fff]">
              {userToUpdate?.nickname}
            </span>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="bg-[#ccc] dark:bg-[#272727]">
          <Button
            onClick={handleCloseAdminDialog}
            className="text-[#007bff] font-bold hover:bg-[#b3c0c9] dark:hover:bg-[#32373a]"
          >
            Скасувати
          </Button>
          <Button
            onClick={handleToggleAdmin}
            className="text-[#007bff] font-bold hover:bg-[#b3c0c9] dark:hover:bg-[#32373a]"
            autoFocus
          >
            {userToUpdate?.isAdmin ? "Забрати" : "Видати"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
