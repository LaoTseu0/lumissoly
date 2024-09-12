import { Button } from "@components/ui/button";
import { FunctionComponent } from "react";

interface AjoutBijouProps {}

const AjoutBijou: FunctionComponent<AjoutBijouProps> = () => {
  return (
    <div className="flex flex-col gap-8 mt-10">
      <h1 className="uppercase lumi-h1 text-center">ajout d'un bijou</h1>
      <p className="text-p-mobil text-center">
        Vous avez indiqué vouloir ajouter un nouveau bijou.
      </p>
      <p className="text-p-mobil text-center">
        Une fois le bijou scanné, il sera associé au compte
      </p>
      <div>
        <h1 className="uppercase lumi-h1 text-center">LAURIE LIAUME</h1>

        <div className="flex-center mt-5">
          <Button>Scanner mon bijou</Button>
        </div>
      </div>
    </div>
  );
};

export default AjoutBijou;
