import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { FunctionComponent } from "react";

interface BijouAjoutSpecProps {}

const BijouAjoutSpec: FunctionComponent<BijouAjoutSpecProps> = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="uppercase lumi-h1 text-center">ajout d'un bijou</h1>
      <div>
        <p className="uppercase lumi-description">alliage</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <Button>OR JAUNE</Button>
          <Button>ARGENT RHODIE</Button>
          <Button>OR ROSE</Button>
        </div>
      </div>
      <div>
        <p className="uppercase lumi-description">alliage</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <Button>RUBIS</Button>
          <Button>SPINELLE NOIRE</Button>
          <Button>TOPAZE BLEUE</Button>
        </div>
      </div>
      <div>
        <p className="uppercase lumi-description">numero de serie</p>
        <Input />
      </div>
      <div>
        <p className="uppercase lumi-description">nom du bijou</p>
        <Input />
      </div>
      <div>
        <p className="uppercase lumi-description">description du bijou</p>
        <Textarea />
      </div>
    </div>
  );
};

export default BijouAjoutSpec;
