"use client";

import React, { useEffect, useState } from "react";
import RightBar from "@/components/RightBar/RightBar";
import { Card } from "@/components/Card/Card";
import Link from "next/link";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Icons
import { CiBookmarkPlus } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { MdSupervisedUserCircle } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [abandonedMovies, setToAbandonedMovies] = useState(0);
  const [plannedMovies, setToPlannedMovies] = useState(0);
  const [watchedMovies, setToWatchedMovies] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);

  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState("/noavatar.png");
  const [previewImageURL, setPreviewImageURL] = useState("/noavatar.png");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "Users", currentUser.uid);

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

        await updateMoviesData();

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
          const userData = userDoc.data();
          setUserData(userData);
          setNickname(userData.nickname);
          setProfileImageURL(userData.profile_image || "/noavatar.png");
          setPreviewImageURL(userData.profile_image || "/noavatar.png");
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

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setProfileImage(file);
      setPreviewImageURL(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    if (user) {
      const userDocRef = doc(db, "Users", user.uid);
      let updatedData = { nickname };

      if (profileImage) {
        const profileImageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(profileImageRef, profileImage);
        const photoURL = await getDownloadURL(profileImageRef);
        updatedData.profile_image = photoURL;
        setProfileImageURL(photoURL);
        setPreviewImageURL(photoURL);
      }

      await updateDoc(userDocRef, updatedData);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    }
  };

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
        <div className="bg-[#ccc] dark:bg-[#272727] mt-5 p-5 rounded-lg">
          <form onSubmit={handleSaveChanges}>
            <div className="mb-4">
              <Image
                src={previewImageURL}
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
                onChange={handleFileChange}
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
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
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
