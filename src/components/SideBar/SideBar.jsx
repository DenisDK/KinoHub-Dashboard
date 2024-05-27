"use client";

import React from "react";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwither";
import { MenuLink } from "./MenuLink/MenuLink";
import Image from "next/image";
import SignIn from "./MenuAuth/SignIn";
import SignOut from "./MenuAuth/SignOut";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Icons

import { MdDashboard } from "react-icons/md";
import { MdShoppingBag } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdHelpCenter } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";

const menuItems = [
  {
    title: "Сторінки",
    list: [
      {
        title: "Головна",
        path: "/",
        icon: <MdDashboard />,
      },
      {
        title: "Додаток",
        path: "/application",
        icon: <MdShoppingBag />,
      },
      {
        title: "Преміум",
        path: "/premium",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Користувач",
    list: [
      {
        title: "Налаштування",
        path: "/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Допомога",
        path: "/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const SideBar = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "Users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data()); // Обновление состояния данных пользователя
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="sticky top-10 flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex items-center gap-2 mb-5">
          <Image
            className="rounded-full object-cover"
            src="/noavatar.png"
            alt="User logo"
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <span className="font-medium flex items-center gap-2">
              User name
            </span>
            <span className="text-xs dark:text-gray-300">
              <span className="font-bold">User</span>
            </span>
          </div>
        </div>
        <div className="flex-grow">
          <SignIn />
        </div>
        <div className="mt-auto flex justify-center">
          <ThemeSwitcher />
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-10 flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-2 mb-5">
        <Image
          className="rounded-full object-cover"
          src={user.photoURL || "/noavatar.png"}
          alt="User logo"
          width={50}
          height={50}
        />
        <div className="flex flex-col">
          <span className="font-medium flex items-center gap-2">
            {user.displayName || "User name"}
            {userData?.isPremium && (
              <span className="text-[#ff5200]">
                <MdWorkspacePremium size={20} />
              </span>
            )}
          </span>
          <span className="text-xs dark:text-gray-300">
            {userData?.isAdmin ? (
              <span className="font-bold text-green-700 dark:text-green-500">
                Admin
              </span>
            ) : (
              <span className="font-bold">User</span>
            )}
          </span>
        </div>
      </div>
      <ul className="list-none flex-grow">
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
        <SignOut />
      </ul>
      <div className="mt-auto flex justify-center">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default SideBar;
