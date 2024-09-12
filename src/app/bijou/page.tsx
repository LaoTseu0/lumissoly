import Grid from "@components/Grid";
import { Button } from "@components/ui/button";
import { BUTTON_PRIMITIVE } from "@global/UIPrimitive";

import { FunctionComponent } from "react";

interface JewelPageProps {}

const JewelPage: FunctionComponent<JewelPageProps> = () => {
  return (
    <div className="mt-16">
      <h1 className="text-title-mobil text-secondary text-center font-normal mb-16">
        MES BIJOUX
      </h1>

      <Grid />

      <div className="flex-center mt-6">
        <div className="flex flex-col gap-3 w-[160px] ">
          <Button className="grow">Ajouter un bijou</Button>
          <Button variant={BUTTON_PRIMITIVE.variant.secondary} className="grow">
            Supprimer un bijou
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JewelPage;
