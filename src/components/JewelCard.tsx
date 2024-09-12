"use client";
import { img_jewel1 } from "@global/assetsPath";
import { FunctionComponent } from "react";
import ProgressBar from "./progressBar";
import { useRouter } from "next/navigation";
import { pathTo_JewelSelect } from "@global/navigation";

interface JewelCardProps {}

const JewelCard: FunctionComponent<JewelCardProps> = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(pathTo_JewelSelect());
  };

  return (
    <div className="flex w-full" onClick={handleClick}>
      <div>
        <img src={img_jewel1()} alt="" />
      </div>
      <div className="flex flex-col justify-center grow p-4">
        <h3 className="text-secondary">NOM_BIJOU</h3>
        <ProgressBar progress={10} />
      </div>
    </div>
  );
};

export default JewelCard;
