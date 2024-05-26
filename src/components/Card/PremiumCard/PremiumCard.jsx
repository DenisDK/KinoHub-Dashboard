import React from "react";

// Icons
import { IoMdCheckmark } from "react-icons/io";
import GooglePayButtonComponent from "./GooglePayButtonComponent";

const PremiumCard = () => {
  return (
    <div className="bg-[#ccc] dark:bg-[#272727] mt-5 p-5 rounded-lg flex">
      <div className="bg-[#e0e0e0] dark:bg-[#353535] p-5 rounded-lg">
        <div className="font-bold text-lg relative">
          Преміум підписка
          <div className="absolute left-0 bottom-[-10px] h-1 w-full bg-[#ccc] dark:bg-[#5f5f5f]"></div>
        </div>
        <div className="mt-7">
          <div className="mt-5 flex items-center gap-3">
            <IoMdCheckmark className="text-green-700 dark:text-green-500" />{" "}
            Lorem ipsum dolor sit amet.
          </div>
          <div className="mt-5 flex items-center gap-3">
            <IoMdCheckmark className="text-green-700 dark:text-green-500" />{" "}
            Lorem ipsum dolor sit amet.
          </div>
          <div className="mt-5 flex items-center gap-3">
            <IoMdCheckmark className="text-green-700 dark:text-green-500" />{" "}
            Lorem ipsum dolor sit amet.
          </div>
          <div className="mt-5 flex items-center gap-3">
            <IoMdCheckmark className="text-green-700 dark:text-green-500" />{" "}
            Lorem ipsum dolor sit amet.
          </div>
          <div className="mt-5 flex items-center gap-3">
            <IoMdCheckmark className="text-green-700 dark:text-green-500" />{" "}
            Lorem ipsum dolor sit amet.
          </div>
        </div>
        <GooglePayButtonComponent />
      </div>
    </div>
  );
};

export default PremiumCard;
