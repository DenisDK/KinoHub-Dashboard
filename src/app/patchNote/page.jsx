import PatchNoteCard from "@/components/Card/PatchNoteCard/PatchNoteCard";
import React from "react";

const PatchNotePage = () => {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col">
        <div className="rounded-lg bg-[#ccc] dark:bg-[#272727] mt-5 p-5 duration-300 hover:dark:bg-[#353535] hover:bg-[#bbb]">
          <PatchNoteCard
            patchCount={"1.0.4"}
            patchName={"Ім'я патча"}
            patchDate={"27.05.2024"}
            patchDescriptiont={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis atque laborum ad, possimus nesciunt, incidunt accusantium blanditiis amet rerum debitis eveniet molestias similique at assumenda dolores autem. Possimus, provident cum! 1"
            }
          />
        </div>
        <div className="rounded-lg bg-[#ccc] dark:bg-[#272727] mt-5 p-5 duration-300 hover:dark:bg-[#353535] hover:bg-[#bbb]">
          <PatchNoteCard
            patchCount={"1.0.3"}
            patchName={"Ім'я патча"}
            patchDate={"27.05.2024"}
            patchDescriptiont={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis atque laborum ad, possimus nesciunt, incidunt accusantium blanditiis amet rerum debitis eveniet molestias similique at assumenda dolores autem. Possimus, provident cum! 2"
            }
          />
        </div>
        <div className="rounded-lg bg-[#ccc] dark:bg-[#272727] mt-5 p-5 duration-300 hover:dark:bg-[#353535] hover:bg-[#bbb]">
          <PatchNoteCard
            patchCount={"1.0.2"}
            patchName={"Ім'я патча"}
            patchDate={"27.05.2024"}
            patchDescriptiont={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis atque laborum ad, possimus nesciunt, incidunt accusantium blanditiis amet rerum debitis eveniet molestias similique at assumenda dolores autem. Possimus, provident cum! 3"
            }
          />
        </div>
        <div className="rounded-lg bg-[#ccc] dark:bg-[#272727] mt-5 p-5 duration-300 hover:dark:bg-[#353535] hover:bg-[#bbb]">
          <PatchNoteCard
            patchCount={"1.0.1"}
            patchName={"Ім'я патча"}
            patchDate={"27.05.2024"}
            patchDescriptiont={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis atque laborum ad, possimus nesciunt, incidunt accusantium blanditiis amet rerum debitis eveniet molestias similique at assumenda dolores autem. Possimus, provident cum! 4"
            }
          />
        </div>
        <div className="rounded-lg bg-[#ccc] dark:bg-[#272727] mt-5 p-5 duration-300 hover:dark:bg-[#353535] hover:bg-[#bbb]">
          <PatchNoteCard
            patchCount={"1.0.0"}
            patchName={"Ім'я патча"}
            patchDate={"27.05.2024"}
            patchDescriptiont={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis atque laborum ad, possimus nesciunt, incidunt accusantium blanditiis amet rerum debitis eveniet molestias similique at assumenda dolores autem. Possimus, provident cum! 5"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PatchNotePage;
