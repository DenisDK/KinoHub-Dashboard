import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { MdWorkspacePremium } from "react-icons/md";

const ThankCard = () => {
  return (
    <div className="bg-[#ccc] dark:bg-[#272727] p-5 rounded-lg flex">
      <div className="bg-[#e0e0e0] dark:bg-[#353535] p-5 rounded-lg">
        <div className="font-bod text-lg text-center relative">
          Ви <span className="font-bold text-[#ff5200]">ПРЕМІУМ!</span>{" "}
          користувач
          <div className="absolute left-0 bottom-[-10px] h-1 w-full bg-[#ccc] dark:bg-[#5f5f5f]"></div>
        </div>
        <div className="mt-7">
          <div className="mt-5 flex items-center gap-3">
            <IoMdCheckmark className="text-green-700 dark:text-green-500" /> Вам
            доступні всі функції
          </div>
          <MdWorkspacePremium
            size={96}
            className="mx-auto mt-5 text-[#ff5200]"
          />
          <div className="mt-5 flex items-center gap-3">
            Дякуэмо що ви придбали Преміум!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankCard;
