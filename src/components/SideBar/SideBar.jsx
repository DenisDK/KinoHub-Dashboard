import React from "react";

// Icons

import { MdDashboard } from "react-icons/md";
import { MdSupervisedUserCircle } from "react-icons/md";
import { MdShoppingBag } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdHelpCenter } from "react-icons/md";
import { MdLogout } from "react-icons/md";
// import { MenuLink } from "./menuLink/MenuLink";
import Image from "next/image";
import { MenuLink } from "./MenuLink/MenuLink";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwither";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/Help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const isAdmin = true;
const SideBar = () => {
  return (
    <div className="sticky top-10">
      <div className="flex items-center gap-5 mb-5">
        <Image
          className="rounded-full object-cover"
          src="/noavatar.png"
          alt="User logo"
          width={50}
          height={50}
        />
        <div className="flex flex-col">
          <span className="font-medium">User name</span>
          <span className="text-xs dark:text-gray-300">
            {isAdmin ? (
              <span className="font-bold text-green-700 dark:text-green-500">
                Admin
              </span>
            ) : (
              <span className="font-bold">User</span>
            )}
          </span>
        </div>
      </div>
      <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="block text-xs font-bold text-gray-500 my-2">
              {cat.title}
            </span>
            {cat.list.map((item) => (
              <MenuLink key={item.title} item={item} />
            ))}
          </li>
        ))}
      </ul>
      <button className="w-full p-4 my-1 flex items-center gap-2 cursor-pointer rounded-xl bg-none border-none duration-300 font-bold hover:bg-[#e0e0e0] hover:dark:bg-[#202020]">
        <MdLogout />
        Logout
      </button>
      <div className="flex justify-center mt-20">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default SideBar;
