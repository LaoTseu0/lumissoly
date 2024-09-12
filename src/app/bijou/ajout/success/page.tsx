"use client";
import { Button } from "@components/ui/button";
import { img_jewelBig } from "@global/assetsPath";
import { pathTo_Home } from "@global/navigation";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

interface BijouAjoutSuccessProps {}

const BijouAjoutSuccess: FunctionComponent<BijouAjoutSuccessProps> = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(pathTo_Home());
  };
  return (
    <div>
      <div>
        <h1 className="lumi-h1">NOM_BIJOU</h1>
        <p className="lumi-subtitle mt-2">DESCRIPTION_BIJOU</p>
      </div>
      <img src={img_jewelBig()} className="m-auto" alt="" />
      <p className="text-3xl font-light uppercase text-center">
        votre nouveau bijou est ajouté a votre profil
      </p>

      <div className="flex-center mt-2 ">
        <Button onClick={handleClick}>Retour à l'acceuil</Button>
      </div>
    </div>
  );
};

export default BijouAjoutSuccess;
