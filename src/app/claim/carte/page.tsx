"use client";
import CardScanner from "@components/CardScanner";
import { Button } from "@components/ui/button";
import { pathTo_ClaimVerifier } from "@global/navigation";
import Link from "next/link";
import { FunctionComponent, useState } from "react";

interface ClaimByCardProps {}

const ClaimByCard: FunctionComponent<ClaimByCardProps> = () => {
  const [isCardScan, setIsCardScan] = useState<boolean>(false);
  const [isExistingUser, setIsExistingUser] = useState<boolean>(true);
  return (
    <div className="flex-center flex-col gap-6 mt-10">
      <div className="w-[90%]">
        <p className="text-p-mobil text-center">
          Vous avez indiqué posséder un bijou Lumissoly.
        </p>
        <p className="text-p-mobil text-center">
          Cliquez sur “scan” et approchez de votre capteur NFC l’objet
          correspondant.
        </p>
      </div>

      <CardScanner isCardScan={isCardScan} setIsCardScan={setIsCardScan} />

      {isCardScan && isExistingUser && (
        <div className="flex-center flex-col gap-4">
          <div>
            <p className="text-p-mobil text-center">
              Ce bijou est déjà associé à l'adresse mail:
            </p>
            <p className="text-p-mobil text-center">john.doe@gmail.com</p>
          </div>
          <Link href={pathTo_ClaimVerifier()}>
            <Button>Me connecter au compte</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ClaimByCard;
