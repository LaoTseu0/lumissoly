"use client";
import ProgressBar from "@components/progressBar";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import FileUpload from "@components/UploadFile";
import { FunctionComponent } from "react";

interface AjoutSouvenirProps {}

const AjoutSouvenir: FunctionComponent<AjoutSouvenirProps> = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="lumi-h1">NOM_BIJOU</h1>
        <p className="lumi-subtitle mt-2">DESCRIPTION_BIJOU</p>
      </div>
      <div>
        <p className="lumi-description">Nom du souvenir</p>
        <Input />

        <p className="lumi-description mt-2">Description du souvenir</p>
        <Textarea />
      </div>
      <div className="flex">
        <p className="lumi-description">Selectionnez un souvenir</p>
        <FileUpload />
      </div>
      <div className="flex-center">
        <div className="w-52">
          <ProgressBar progress={10} />
        </div>
      </div>
    </div>
  );
};

export default AjoutSouvenir;
