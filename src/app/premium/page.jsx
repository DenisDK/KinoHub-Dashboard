import PremiumCard from "@/components/Card/PremiumCard/PremiumCard";
import PremiumCardStandart from "@/components/Card/PremiumCard/PremiumCardStandart";
import LinesChartPremium from "@/components/Chart/LinesChart/LinesChartPremium";
import React from "react";

const PremiumPage = () => {
  return (
    <>
      <div className="bg-[#ccc] dark:bg-[#272727] mt-5 p-5 rounded-lg">
        Придбати Преміум статус
      </div>
      <div className="bg-[#ccc] dark:bg-[#272727] mt-5 rounded-lg flex justify-center">
        <PremiumCardStandart />
        <PremiumCard />
      </div>
      <div className="bg-[#ccc] dark:bg-[#272727] mt-5 rounded-lg">
        <LinesChartPremium />
      </div>
    </>
  );
};

export default PremiumPage;
