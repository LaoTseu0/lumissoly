import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { img_file } from "@global/assetsPath";
import { BUTTON_PRIMITIVE } from "@global/UIPrimitive";
import { FunctionComponent } from "react";

interface SouvenirProps {}

const Souvenir: FunctionComponent<SouvenirProps> = () => {
  return (
    <div className="flex flex-col">
      <h1 className="lumi-h1">NOM_SOUVENIR</h1>
      <div>
        <img src={img_file()} alt="" />
      </div>
      <div>
        <p className="lumi-description">Description du souvenir</p>
        <Textarea />
      </div>
      <div className="flex-center mt-5">
        <div className="flex flex-col gap-3.5">
          <Button>Consulter le souvenir</Button>
          <Button variant={BUTTON_PRIMITIVE.variant.secondary}>
            Supprimer le souvenir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Souvenir;
