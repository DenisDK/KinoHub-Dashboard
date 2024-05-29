import React from "react";

//Icons
import { CiCircleInfo } from "react-icons/ci";

const HelpCard = ({ title, text }) => {
    return (
        <div className="bg-[#ccc] dark:bg-[#272727] p-5 rounded-lg flex max-w-[539px]">
            <div className="flex flex-col">
                <div className="flex items-center mb-2">
                    <CiCircleInfo className="mr-2" size={50} />
                    <span className="font-bold text-2xl">{title}</span>
                </div>
                <span className="text-md font-light">{text}</span>
            </div>
        </div>
    );
};

export default HelpCard;