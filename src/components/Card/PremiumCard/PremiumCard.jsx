import React from "react";

// Icons
import { IoMdCheckmark } from "react-icons/io";
import GooglePayButtonComponent from "./GooglePayButtonComponent";
import Image from "next/image";

const PremiumCard = () => {
  return (
    <div className="bg-[#ccc] dark:bg-[#272727] p-5 rounded-lg flex">
      <div className="bg-[#e0e0e0] dark:bg-[#353535] p-5 rounded-lg">
        <div className="font-bold text-lg relative">
          <div className="flex items-center gap-2 h-[45px]">
            Преміум підписка
            <div className="rounded-full overflow-hidden">
              <Image
                src="/buyIt.gif"
                alt="buy it"
                width={80}
                height={80}
                objectFit="cover"
              />
            </div>
          </div>
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
            <IoMdCheckmark className="text-green-700 dark:text-green-500" />{" "}
            Анімовані аватарки
          </div>
          <div className="mt-5 flex items-center gap-3">
            <IoMdCheckmark className="text-green-700 dark:text-green-500" />{" "}
            Розширений список друзів
          </div>
          <div className="mt-5 flex items-center gap-3">
            <IoMdCheckmark className="text-green-700 dark:text-green-500" />{" "}
            Унікальний значок
          </div>
        </div>
        <GooglePayButtonComponent />
      </div>
    </div>
  );
};

export default PremiumCard;
