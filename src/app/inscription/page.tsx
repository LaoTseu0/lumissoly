import { Button } from "@components/ui/button";
import { pathTo_Claim, pathTo_SignIn, pathTo_SignUp } from "@global/navigation";
import Link from "next/link";
import { FunctionComponent } from "react";

interface InscriptionProps {}

const Inscription: FunctionComponent<InscriptionProps> = () => {
  return (
    <div className="flex-center flex-col gap-10 pt-20">
      <div className="flex-center flex-col gap-4">
        <p className="text-p-mobil text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti,
          consectetur, adipisicing elit.
        </p>
        <Link href={pathTo_SignUp()}>
          <Button>Inscription</Button>
        </Link>
      </div>
      <div className="flex-center flex-col gap-4">
        <p className="text-p-mobil text-center">J'ai déjà un compte</p>
        <Link href={pathTo_SignIn()}>
          <Button>Connexion</Button>
        </Link>
      </div>
      <div className="flex-center flex-col gap-4">
        <p className="text-p-mobil text-center">
          on m'a offert ou transmis un bijou
        </p>
        <Link href={pathTo_Claim()}>
          <Button>Récupération</Button>
        </Link>
      </div>
    </div>
  );
};

export default Inscription;
