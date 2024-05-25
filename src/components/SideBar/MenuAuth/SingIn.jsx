import React from "react";
import { MdLogout } from "react-icons/md";

const SingIn = () => {
  return (
    <button className="w-full p-4 my-1 flex items-center gap-2 cursor-pointer rounded-xl bg-none border-none duration-300 font-bold hover:bg-[#e0e0e0] hover:dark:bg-[#202020]">
      <MdLogout />
      Вийти
    </button>
  );
};

export default SingIn;
