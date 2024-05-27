"use client";

import { Card } from "@/components/Card/Card";
// import Chart from "@/components/Chart/Chart";
import RightBar from "@/components/RightBar/RightBar";
import DataTable from "@/components/DataTable/DataTable";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

// Icons
import { IoMdCloseCircle } from "react-icons/io";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoEyeSharp } from "react-icons/io5";
import { MdSupervisedUserCircle } from "react-icons/md";
import BarChartComponent from "@/components/Chart/BarChart/BarChartComponent";
import LinesChartComponent from "@/components/Chart/LinesChart/LinesChartComponent";

export default function Home() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [abandonedMovies, setToAbandonedMovies] = useState(0);
  const [plannedMovies, setToPlannedMovies] = useState(0);
  const [watchedMovies, setToWatchedMovies] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "Users", currentUser.uid);

        // Функция для обновления данных о фильмах
        const updateMoviesData = async () => {
          const abandonedSnapshot = await getDocs(
            collection(userDocRef, "AbandonedMovies")
          );
          const plannedSnapshot = await getDocs(
            collection(userDocRef, "PlannedMovies")
          );
          const watchedSnapshot = await getDocs(
            collection(userDocRef, "WatchedMovies")
          );
          const abandonedCount = abandonedSnapshot.size - 1;
          const plannedCount = plannedSnapshot.size - 1;
          const watchedCount = watchedSnapshot.size - 1;
          const total = abandonedCount + plannedCount + watchedCount;

          setToAbandonedMovies(abandonedCount);
          setToPlannedMovies(plannedCount);
          setToWatchedMovies(watchedCount);
          setTotalMovies(total);
        };
        // Обновляем данные о фильмах
        await updateMoviesData();

        // Подписываемся на изменения коллекций
        const abandonedUnsubscribe = onSnapshot(
          collection(userDocRef, "AbandonedMovies"),
          () => {
            updateMoviesData();
          }
        );
        const plannedUnsubscribe = onSnapshot(
          collection(userDocRef, "PlannedMovies"),
          () => {
            updateMoviesData();
          }
        );
        const watchedUnsubscribe = onSnapshot(
          collection(userDocRef, "WatchedMovies"),
          () => {
            updateMoviesData();
          }
        );

        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
        return () => {
          abandonedUnsubscribe();
          plannedUnsubscribe();
          watchedUnsubscribe();
        };
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
            count={totalMovies.toString()}
            icon={<MdSupervisedUserCircle size={24} />}
          />
          <Card
            title={"Перегллянуті"}
            count={watchedMovies.toString()}
            icon={<IoEyeSharp size={24} />}
          />
          <Card
            title={"Заплановані"}
            count={plannedMovies.toString()}
            icon={<CiBookmarkPlus size={24} />}
          />
          <Card
            title={"Покинуті"}
            count={abandonedMovies.toString()}
            icon={<IoMdCloseCircle size={24} />}
          />
        </div>
        {userData?.isAdmin && <DataTable />}
        {/* <Chart /> */}

        <BarChartComponent
          total={totalMovies}
          watched={watchedMovies}
          planned={plannedMovies}
          abandoned={abandonedMovies}
        />
        <LinesChartComponent />
      </div>
      <div className="flex">
        <RightBar />
      </div>
    </div>
  );
}
