import { FunctionComponent } from "react";
import { Button } from "./ui/button";
import { img_lazy, img_nfc } from "@global/assetsPath";
import { BUTTON_PRIMITIVE } from "@global/UIPrimitive";
import { svgPhone } from "@global/svg/svgPhone";
import { svgKey } from "@global/svg/svgKey";

interface JewelScannerProps {
  isJewelScan: boolean;
  setIsJewelScan: (value: boolean) => void;
}

const JewelScanner: FunctionComponent<JewelScannerProps> = ({
  isJewelScan,
  setIsJewelScan,
}) => {
  const handleScan = () => {
    setIsJewelScan(true);
  };
  return (
    <>
      {!isJewelScan ? (
        <div className="flex flex-col gap-4">
          <Button onClick={handleScan}>Scanner mon bijou</Button>
          <div className="flex-center flex-row gap-2">
            {svgPhone()}
            {svgKey()}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Button variant={BUTTON_PRIMITIVE.variant.secondary}>
            Bijou scannée avec succès
          </Button>
          <div className="flex-center">
            <div className="flex justify-between flex-row gap-8 w-3/4">
              <span className="font-bold">Bijou_ID:</span>
              <span className="text-muted">AE38F7712B</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JewelScanner;
