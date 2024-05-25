"use client";

import { Card } from "@/components/Card/Card";
import Chart from "@/components/Chart/Chart";
import RightBar from "@/components/RightBar/RightBar";
import DataTable from "@/components/DataTable/DataTable";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Icons
import { IoMdCloseCircle } from "react-icons/io";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoEyeSharp } from "react-icons/io5";
import { MdSupervisedUserCircle } from "react-icons/md";

// const isAdmin = true;
export default function Home() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "Users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
        {userData?.isAdmin && <DataTable />}
        <Chart />
      </div>
      <div className="flex">
        <RightBar />
      </div>
    </div>
  );
}
