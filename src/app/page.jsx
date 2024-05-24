import { Card } from "@/components/Card/Card";
import Chart from "@/components/Chart/Chart";
import RightBar from "@/components/RightBar/RightBar";

// Icons
import { IoMdCloseCircle } from "react-icons/io";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoEyeSharp } from "react-icons/io5";
import { MdSupervisedUserCircle } from "react-icons/md";
import DataTable from "@/components/DataTable/DataTable";

const isAdmin = true;
export default function Home() {
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
        {isAdmin ? <DataTable /> : ""}
        <Chart />
      </div>
      <div className="flex">
        <RightBar />
      </div>
    </div>
  );
}
