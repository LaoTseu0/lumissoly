"use client";
import { svgIconDoc, svgPetalDoc } from "@global/svg/svgEllipse1";
import { svgIconVideo, svgPetalVideo } from "@global/svg/svgEllipse2";
import { svgIconPicture, svgPetalPicture } from "@global/svg/svgEllipse3";
import { svgIconAudio, svgPetalAudio } from "@global/svg/svgEllipse4";
import { svgFlowerButton } from "@global/svg/svgFlowerButton";
import logger from "@lib/logger/logger";

import { FunctionComponent, useState } from "react";

interface FlowerMenuProps {}

const FlowerMenu: FunctionComponent<FlowerMenuProps> = () => {
  const [displayFlower, setDisplayFlower] = useState<boolean>(true);

  const handleClickParent = (e: React.MouseEvent) => {
    logger.info("click parent");
  };

  const handleClickDoc = (e: React.MouseEvent) => {
    e.stopPropagation();
    logger.info("click enfant1");
  };
  const handleClickAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    logger.info("click enfant2");
  };
  const handleClickPicture = (e: React.MouseEvent) => {
    e.stopPropagation();
    logger.info("click enfant3");
  };
  const handleClickCamera = (e: React.MouseEvent) => {
    e.stopPropagation();
    logger.info("click enfant4");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex-center">
      <svg
        width="60%"
        viewBox="0 0 255 203"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {svgFlowerButton(handleClickParent)}
        {svgPetalAudio(handleClickAudio)}
        {svgIconAudio()}
        {svgPetalPicture(handleClickPicture)}
        {svgIconPicture()}
        {svgPetalDoc(handleClickDoc)}
        {svgIconDoc()}
        {svgPetalVideo(handleClickCamera)}
        {svgIconVideo()}
      </svg>
    </div>
  );
};

export default FlowerMenu;
