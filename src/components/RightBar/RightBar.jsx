import React from "react";
import Image from "next/image";

// Icons
import { MdPlayCircleFilled } from "react-icons/md";
import { MdReadMore } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";
import Link from "next/link";

const RightBar = () => {
  return (
    <div className="fixed mr-5">
      <div className="bg-gradient-to-t from-[#9c9c9c] to-[#ccc] dark:from-[#181818] dark:to-[#272727] p-6 rounded-lg mb-6 relative">
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2">
          <Image
            className="object-contain opacity-20"
            src="/astronaut.png"
            alt="Astronaut image"
            fill
          />
        </div>
        <div className="">
          <span className="font-bold block mb-2">🔥 Наявний функціонал</span>
          <h3 className="text-xl font-semibold mb-1">
            Як користуватися новою версією панелі адміністратора?
          </h3>
          <span className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Навчання займає 1 хвилину
          </span>
          <p className="text-sm mb-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
            perferendis aliquam facere quam ipsa qui, sequi?
          </p>
          <button className="bg-[#ccc] dark:bg-[#272727] hover:bg-[#bbb] dark:hover:bg-[#353535] duration-300 py-2 px-4 rounded-md flex items-center">
            <MdPlayCircleFilled />
            <span className="ml-2">Читати</span>
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-t from-[#9c9c9c] to-[#ccc] dark:from-[#181818] dark:to-[#272727] p-6 rounded-lg mb-6">
        <div className="">
          <span className="font-bold block mb-2">🚀 Незабаром</span>
          <h3 className="text-xl font-semibold mb-1">
            Нове оновлення доступні нові можливойті! Читати нище!
          </h3>
          <span className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Поліпщення
          </span>
          <p className="text-sm mb-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
            perferendis aliquam facere quam ipsa qui, sequi?
          </p>
          <button className="bg-[#ccc] dark:bg-[#272727] hover:bg-[#bbb] dark:hover:bg-[#353535] duration-300 py-2 px-4 rounded-md flex items-center">
            <MdReadMore />
            <span className="ml-2">Детельніше</span>
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-t from-[#9c9c9c] to-[#ccc] dark:from-[#181818] dark:to-[#272727] p-6 rounded-lg mb-6">
        <div className="">
          <span className="font-bold block mb-2">💣 Завантажити додаток!</span>
          <h3 className="text-xl font-semibold mb-1">
            Завантажте наш додаток для кращого користувацького досвіду!
          </h3>
          <span className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Підвищі свій настрій
          </span>
          <p className="text-sm mb-2">Супер додаток для кінолюбів😎👍!</p>
          <button className="bg-[#ccc] dark:bg-[#272727] hover:bg-[#bbb] dark:hover:bg-[#353535] duration-300 py-2 px-4 rounded-md flex items-center">
            <FaCloudDownloadAlt />
            <span className="ml-2">Завантажити</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
