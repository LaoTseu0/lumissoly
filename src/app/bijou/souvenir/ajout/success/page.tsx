import ProgressBar from "@components/progressBar";
import { Button } from "@components/ui/button";
import { img_file } from "@global/assetsPath";
import { FunctionComponent } from "react";

interface AjoutSouvenirSuccessProps {}

const AjoutSouvenirSuccess: FunctionComponent<
  AjoutSouvenirSuccessProps
> = () => {
  return (
    <div className="flex-center flex-col">
      <div>
        <img src={img_file()} alt="" />
      </div>
      <div className="flex-center flex-col gap-2 w-52 ">
        <div className="w-52">
          <ProgressBar progress={10} />
        </div>
        <p className="text-3xl text-center font-light">
          LE SOUVENIR EST DEPOSE
        </p>
        <Button>Consulter le souvenir</Button>
      </div>
    </div>
  );
};

export default AjoutSouvenirSuccess;
