"use client";
import Grid from "@components/Grid";
import { Button } from "@components/ui/button";
import FlowerMenu from "@components/FlowerMenu";
import { img_jewelBig } from "@global/assetsPath";
import { BUTTON_PRIMITIVE } from "@global/UIPrimitive";
import logger from "@lib/logger/logger";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    logger.info(document.cookie.slice(-44, document.cookie.length));
  }, []);
  return (
    <div className="mt-20">
      <div className="flex-center">
        <img src={img_jewelBig()} alt="" />
      </div>
      <FlowerMenu />
    </div>
  );
}

export default Home;
