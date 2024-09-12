"use client";
import CardScanner from "@components/CardScanner";
import JewelScanner from "@components/JewelScanner";
import { Button } from "@components/ui/button";
import { pathTo_SignIn, pathTo_SignUp } from "@global/navigation";
import Link from "next/link";

import { FunctionComponent, useState } from "react";

interface PairingProps {}

const Pairing: FunctionComponent<PairingProps> = () => {
  const [isJewelScan, setIsJewelScan] = useState(false);
  const [isCardScan, setIsCardScan] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(true);

  return (
    <div className="flex flex-col gap-6 mt-8">
      <p className="text-p-mobil text-center">
        Vous avez indiqué posséder un bijou Lumissoly et sa carte
        d’authenticité.Cliquez sur “scan” et approchez de votre capteur NFC
        l’objet correspondant.
      </p>
      <JewelScanner isJewelScan={isJewelScan} setIsJewelScan={setIsJewelScan} />
      <CardScanner isCardScan={isCardScan} setIsCardScan={setIsCardScan} />
      {isJewelScan && isCardScan && isExistingUser && (
        <div className="flex-center flex-col gap-4">
          <div>
            <p className="text-p-mobil text-center">
              Ce bijou est déjà associé à l'adresse mail:
            </p>
            <p className="text-p-mobil text-center">john.doe@gmail.com</p>
          </div>
          <Link href={pathTo_SignIn()}>
            <Button>Me connecter au compte</Button>
          </Link>
          <Link href={pathTo_SignUp()}>
            <Button>Créer un nouveau compte</Button>
          </Link>
        </div>
      )}
      {isJewelScan && isCardScan && !isExistingUser && (
        <div className="flex-center flex-col gap-4">
          <p className="text-p-mobil text-center">
            Ce bijou n'est associé à un aucun compte Lumissoly
          </p>
          <Link href={pathTo_SignUp()}>
            <Button>Créer mon compte</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Pairing;
