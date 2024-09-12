import { FunctionComponent } from "react";
import { Button } from "./ui/button";
import { img_lazy, img_nfc } from "@global/assetsPath";
import { BUTTON_PRIMITIVE } from "@global/UIPrimitive";

interface CardScannerProps {
  isCardScan: boolean;
  setIsCardScan: (value: boolean) => void;
}

const CardScanner: FunctionComponent<CardScannerProps> = ({
  isCardScan,
  setIsCardScan,
}) => {
  const handleScan = () => {
    setIsCardScan(true);
  };
  return (
    <>
      {!isCardScan ? (
        <div className="flex flex-col gap-4">
          <Button onClick={handleScan}>
            Scanner ma carte d'authentification
          </Button>
          <div className="flex-center flex-row gap-8">
            <img src={img_nfc()} alt="" />
            <img src={img_lazy()} alt="" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Button variant={BUTTON_PRIMITIVE.variant.secondary}>
            Carte scannée avec succès
          </Button>
          <div className="flex-center">
            <div className="flex justify-between flex-row gap-8 w-3/4">
              <span className="font-bold">Carte_ID:</span>
              <span className="text-muted">AE38F7712B</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardScanner;
