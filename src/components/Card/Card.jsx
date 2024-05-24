import React from "react";

export const Card = ({ title, count, icon }) => {
  return (
    <div className="bg-[#ccc] dark:bg-[#272727] p-5 rounded-lg flex gap-5 cursor-pointer w-full transition duration-300 hover:dark:bg-[#353535] hover:bg-[#bbb]">
      {icon}
      <div className="flex flex-col">
        <span className="font-bold text-lg">{title}</span>
        <span className="text-2xl font-semibold">{count}</span>
        <span className="text-sm font-light">
          <span className="text-[#2f9655] dark:text-green-500 font-bold pr-1">
            12%
          </span>
          more then previous week
        </span>
      </div>
    </div>
  );
};
