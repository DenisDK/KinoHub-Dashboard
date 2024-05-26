import PremiumCard from "@/components/Card/PremiumCard/PremiumCard";
import PremiumCardStandart from "@/components/Card/PremiumCard/PremiumCardStandart";
import React from "react";

const PremiumPage = () => {
  return (
    <>
      <div className="bg-[#ccc] dark:bg-[#272727] mt-5 p-5 rounded-lg">
        Придбати Преміум статус
      </div>
      <div className="bg-[#ccc] dark:bg-[#272727] mt-5 p-5 rounded-lg flex">
        <PremiumCardStandart />
        <PremiumCard />
      </div>
    </>
  );
};

export default PremiumPage;
