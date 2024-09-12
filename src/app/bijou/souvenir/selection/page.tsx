"use client";
import ProgressBar from "@components/progressBar";
import { Button } from "@components/ui/button";
import { img_jewel1 } from "@global/assetsPath";
import { BUTTON_PRIMITIVE } from "@global/UIPrimitive";
import { FunctionComponent } from "react";

interface BijouManagerProps {}

const BijouManager: FunctionComponent<BijouManagerProps> = () => {
  // const souvenirs = new Array(10).fill("Nom du souvenir");
  const souvenirs: any[] = [];
  const handleClick = () => {
    logger.info("click");
  };
  return (
    <div className="mt-8">
      <div>
        <div>
          <div>
            <h1 className="lumi-h1">NOM_BIJOU</h1>
            <p className="lumi-subtitle mt-2">DESCRIPTION_BIJOU</p>
          </div>
          <div>
            <div className="w-52 mt-2 m-auto">
              <img src={img_jewel1()} className="m-auto" alt="Bijou" />
            </div>
            <div className=" w-52 m-auto">
              <ProgressBar progress={10} />
            </div>
          </div>
        </div>
        <div>
          {souvenirs.length > 0 ? (
            <div className=" grid grid-cols-2 gap-y-3 gap-x-5 h-52 my-4 overflow-y-scroll custom-scrollbar ps-1 pe-4 py-4">
              {souvenirs.map((souvenir, index) => (
                <Button key={index} onClick={handleClick}>
                  {souvenir}
                </Button>
              ))}
            </div>
          ) : (
            <div className="flex-center my-12">
              <Button variant={BUTTON_PRIMITIVE.variant.secondary}>
                Aucun souvenir enregistré dans ce bijou
              </Button>
            </div>
          )}
        </div>
        <div>
          <div className="flex flex-col gap-3 w-[220px] m-auto">
            <Button variant={BUTTON_PRIMITIVE.variant.tertiary}>
              Déposer un autre souvenir
            </Button>
            <Button>Transmettre le bijou</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BijouManager;
