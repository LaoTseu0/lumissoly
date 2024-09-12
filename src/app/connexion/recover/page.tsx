"use client";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { pathTo_PasswordRecoverSuccess } from "@global/navigation";

import logger from "@lib/logger/logger";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";

interface PasswordRecoverProps {}

const PasswordRecover: FunctionComponent<PasswordRecoverProps> = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    // userRecoveryPass({ email })
    //   .then((res) => router.push(pathTo_PasswordRecoverSuccess()))
    //   .catch(() => logger.info("error"));
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-4">
        <p className="text-p-mobil font-normal text-center">
          Pour réinitialiser votre mot de passe veuillez nous fournir l’adresse
          mail associée à votre compte
        </p>
        <div>
          <Label>
            <p className="text-p-mobil text-secondary">ADRESSE MAIL</p>
          </Label>
          <Input type="email" name="email" onChange={handleEmail} />
        </div>
        <div className="w-full flex-center mt-2">
          <Button onClick={handleSubmit}>Valider</Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecover;
