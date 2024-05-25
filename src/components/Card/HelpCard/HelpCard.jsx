import React from "react";

const HelpCard = ({ title, text }) => {
    return (
        <div className="bg-[#ccc] dark:bg-[#272727] p-5 rounded-lg flex max-w-[539px]">
            <div className="flex flex-col">
                <span className="font-bold text-2xl">{title}</span>
                <span className="text-md font-light">{text}</span>
            </div>
        </div>
    );
};

export default HelpCard;