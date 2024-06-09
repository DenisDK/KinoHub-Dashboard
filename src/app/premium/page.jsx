"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import PremiumCard from "@/components/Card/PremiumCard/PremiumCard";
import PremiumCardStandart from "@/components/Card/PremiumCard/PremiumCardStandart";
import ThankCard from "@/components/Card/PremiumCard/ThankCard";
import LinesChartPremium from "@/components/Chart/LinesChart/LinesChartPremium";
import { auth, db } from "@/lib/firebase";

const PremiumPage = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "Users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            console.log("User Data: ", userDoc.data());
            setIsPremium(userDoc.data().isPremium);
          }
        } else {
          console.log("No user signed in");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-[#ccc] dark:bg-[#272727] mt-5 p-5 rounded-lg">
        {isPremium
          ? "Ви вже придбали ПРЕМІУМ статус"
          : "Придбати ПРЕМІУМ статус"}
      </div>
      <div className="bg-[#ccc] dark:bg-[#272727] mt-5 rounded-lg flex justify-center">
        {isPremium ? (
          <ThankCard />
        ) : (
          <>
            <PremiumCardStandart /> <PremiumCard />
          </>
        )}
      </div>
      <div className="bg-[#ccc] dark:bg-[#272727] mt-5 rounded-lg">
        <LinesChartPremium />
      </div>
    </>
  );
};

export default PremiumPage;
