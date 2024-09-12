import { Button } from "@components/ui/button";
import { pathTo_Home } from "@global/navigation";
import Link from "next/link";
import { FunctionComponent } from "react";

interface PasswordRecoverySuccessProps {}

const PasswordRecoverySuccess: FunctionComponent<
  PasswordRecoverySuccessProps
> = () => {
  return (
    <div className="h-[60vh] w-full flex-center flex-col">
      <p className="text-p-mobil font-bold text-center mb-2">
        Un e-mail de réinitialisation de votre mot de passe a été envoyé par
        mail.
      </p>
      <Link href={pathTo_Home()}>
        <Button>ok</Button>
      </Link>
    </div>
  );
};

export default PasswordRecoverySuccess;
