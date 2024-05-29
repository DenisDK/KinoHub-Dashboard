import React from "react";

// Icons
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const PremiumCardStandart = () => {
  return (
    <div className="bg-[#ccc] dark:bg-[#272727] p-5 rounded-lg flex">
      <div className="bg-[#e0e0e0] dark:bg-[#353535] p-5 rounded-lg">
        <div className="font-bold flex items-center text-lg relative h-[45px]">
          Стандартна підписка
          <div className="absolute left-0 bottom-[-10px] h-1 w-full bg-[#ccc] dark:bg-[#5f5f5f]"></div>
        </div>
        <div className="mt-7">
          <div className="mt-5 flex items-center gap-3">
            <IoMdCheckmark className="text-green-700 dark:text-green-500" />{" "}
            Коментування фільмів
          </div>
          <div className="mt-5 flex items-center gap-3">
            <IoMdCheckmark className="text-green-700 dark:text-green-500" />{" "}
            Оцінювання фільмів
          </div>
          <div className="mt-5 flex items-center gap-3">
          <IoMdClose className="text-red-500" />           
            Статична аватарка
          </div>
          <div className="mt-5 flex items-center gap-3">
          <IoMdClose className="text-red-500" />
            Список із 5 друзів
          </div>
          <div className="mt-5 flex items-center gap-3">
          <IoMdClose className="text-red-500" />
            Відсутній значок
          </div>
          <div className="flex items-center mt-5 justify-center bg-[#FFF] dark:bg-[#272727] transition duration-300 hover:bg-[#CCCCCC] hover:dark:bg-[#414141] hover:cursor-pointer h-[40px] rounded-md font-bold">
            Безкоштовно
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCardStandart;
