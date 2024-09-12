"use client";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  pathTo_Home,
  pathTo_PasswordRecover,
  pathTo_Profil,
} from "@global/navigation";
import { serviceOAuth } from "@app/actions/serviceOAuth";

import { useUserStore } from "@store/user.store";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { FunctionComponent, useState } from "react";
import { oauth } from "@app/actions/providerAuth";

interface SignInProps {}

const SignIn: FunctionComponent<SignInProps> = () => {
  const router = useRouter();
  const { setName, setDate, setEmail } = useUserStore();
  const [emailToLog, setEmailToLog] = useState<string>("");
  const [passwordToLog, setPasswordToLog] = useState<string>("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailToLog(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordToLog(e.target.value);
  };
  const handleSubmit = async () => {
    await serviceOAuth.connectUser(emailToLog, passwordToLog);
    await serviceOAuth.getUser();
    router.push(pathTo_Home());
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label>
          <p className="text-p-mobil text-secondary">ADRESSE MAIL</p>
        </Label>
        <Input type="email" name="email" onChange={handleEmail} />
      </div>
      <div>
        <Label>
          <p className="text-p-mobil text-secondary">MOT DE PASSE</p>
        </Label>
        <Input type="password" name="password" onChange={handlePassword} />
        <div className="w-full flex justify-end mt-2">
          <Link href={pathTo_PasswordRecover()}>
            <p className="text-xs font-bold">J'ai oublié mon mot de passe ?</p>
          </Link>
        </div>
      </div>
      <div className="flex-center">
        <Button onClick={handleSubmit}>
          <p className="text-xs font-bold">Valider</p>
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
