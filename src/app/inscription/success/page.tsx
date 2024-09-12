import { Button } from "@components/ui/button";
import { pathTo_Home, pathTo_Profil, pathTo_SignIn } from "@global/navigation";
import Link from "next/link";
import { FunctionComponent } from "react";

interface SuccessRegistrationProps {}

const SuccessRegistration: FunctionComponent<SuccessRegistrationProps> = () => {
  return (
    <div className="w-full flex-center flex-col h-[60vh] gap-4">
      <p>Votre inscription est complétée.</p>
      <Link href={pathTo_Home()}>
        <Button>Accéder à mon compte</Button>
      </Link>
    </div>
  );
};

export default SuccessRegistration;
