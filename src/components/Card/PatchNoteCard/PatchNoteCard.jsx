import React from "react";

const PatchNoteCard = ({
  patchCount,
  patchName,
  patchDate,
  patchDescriptiont,
}) => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-2xl font-bold">Патч {patchCount}</h1>
          <p className="text-sm text-gray-500">{patchName}</p>
        </div>
        <p className="text-sm text-gray-500">{patchDate}</p>
      </div>
      <p className="mt-5 text-lg text-gray-700 dark:text-gray-300">
        {patchDescriptiont}
      </p>
    </div>
  );
};

export default PatchNoteCard;
