"use client";

import React from "react";

import RightBar from "@/components/RightBar/RightBar";
import { Card } from "@/components/Card/Card";
import Link from "next/link";

// Icons
import { CiBookmarkPlus } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { MdSupervisedUserCircle } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";

const SettingsPage = () => {
  return (
    <div className="flex gap-5 mt-5">
      <div className="flex flex-col">
        <div className="flex gap-5 justify-between">
          <Card
            title={"Усього"}
            count={"20"}
            icon={<MdSupervisedUserCircle size={24} />}
          />
          <Card
            title={"Перегллянуті"}
            count={"10"}
            icon={<IoEyeSharp size={24} />}
          />
          <Card
            title={"Заплановані"}
            count={"7"}
            icon={<CiBookmarkPlus size={24} />}
          />
          <Card
            title={"Покинуті"}
            count={"2"}
            icon={<IoMdCloseCircle size={24} />}
          />
        </div>
        <div className="bg-[#ccc] dark:bg-[#272727] mt-5 p-5 rounded-lg">
          <form>
            <div className="mb-4">
              <Image
                src="/noavatar.png"
                alt="Profile"
                className="my-2 rounded-lg"
                width={237}
                height={237}
              />
              <label
                className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                htmlFor="profileImage"
              >
                Оберіть зображення
              </label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                htmlFor="username"
              >
                {"Ім'я користувача"}
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Зберегти зміни
              </button>
            </div>
          </form>
        </div>
        <div className="bg-[#ccc] dark:bg-[#272727] mt-5 p-5 rounded-lg">
          <div className="font-bold">Звенрніть увагу!</div>
          <p className="">
            Завантаження GIF-зображень доступне лише при наявності
            преміум-статусу! З усіма перевагами ПРЕМІУМ СТАТУСУ можна
            ознаемитись
            <Link href="/help" className="underline ml-1 font-bold">
              тут!
            </Link>
          </p>
          <Link href="/premium">
            <div className="inline-block mt-2">
              <span className="flex items-center gap-2 hover:underline">
                Придбати преміум! <FaArrowLeft />
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="">
        <RightBar />
      </div>
    </div>
  );
};

export default SettingsPage;
