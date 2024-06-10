"use client";
import { useState } from "react";
import { logout } from "@/lib/auth";
import React from "react";
import { MdLogout } from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const SignOut = () => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleCloseDialog();
  };

  return (
    <>
      <button
        onClick={handleOpenDialog}
        className="w-full p-4 my-1 flex items-center gap-2 cursor-pointer rounded-xl bg-none border-none duration-300 font-bold hover:bg-[#e0e0e0] hover:dark:bg-[#202020] hover:text-red-500"
      >
        <MdLogout />
        Вийти
      </button>
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
          Вийти з аккаунту
        </DialogTitle>
        <DialogContent className="bg-[#ccc] dark:bg-[#272727]">
          <DialogContentText
            id="alert-dialog-description"
            className="text-[#4b4b4b] dark:text-[#d6d6d6]"
          >
            Ви впевнені, що хочете вийти з аккаунту?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="bg-[#ccc] dark:bg-[#272727]">
          <Button
            className="text-[#007bff] font-bold hover:bg-[#b3c0c9] dark:hover:bg-[#32373a]"
            onClick={handleCloseDialog}
          >
            ПИСЮН
          </Button>
          <Button
            className="text-[#ff0000] font-bold hover:bg-[#c9b3b3] dark:hover:bg-[#3d3535]"
            onClick={handleLogout}
          >
            ПИСЬКА
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignOut;
