"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MenuLink = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`p-4 flex items-center gap-2 my-1 duration-300 rounded-lg ${
        pathname === item.path && "bg-[#e0e0e0] dark:bg-[#202020]"
      } hover:bg-[#e0e0e0] hover:dark:bg-[#202020]`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};
