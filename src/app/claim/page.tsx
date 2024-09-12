"use client";
import { Button } from "@components/ui/button";
import {
  pathTo_ClaimByCard,
  pathTo_ClaimByJewel,
  pathTo_ClaimPairing,
} from "@global/navigation";
import { BUTTON_PRIMITIVE } from "@global/UIPrimitive";
import Link from "next/link";
import { FunctionComponent } from "react";

interface RecoveryHomeProps {}

const RecoveryHome: FunctionComponent<RecoveryHomeProps> = () => {
  return (
    <div className="flex gap-8 flex-col">
      <p className="text-p-mobil text-center">
        Afin de vous aider à retrouver l’accès aux souvenirs associés à votre
        bijou, merci d’indiquer ci-dessous de quels éléments vous disposez.
      </p>
      <p className="text-p-mobil text-center">
        Si vous avez accès à ces deux éléments, vous pourrez accéder aux
        souvenirs en toute autonomie, sinon l’assistance Lumissoly devra
        intervenir.
      </p>
      <div className="flex flex-col gap-4 m-auto">
        <Link href={pathTo_ClaimPairing()} legacyBehavior>
          <Button variant={BUTTON_PRIMITIVE.variant.secondary}>
            J'ai un bijou et une carte d'authenticité
          </Button>
        </Link>
        <Link href={pathTo_ClaimByJewel()} legacyBehavior>
          <Button>J'ai un bijou</Button>
        </Link>
        <Link href={pathTo_ClaimByCard()} legacyBehavior>
          <Button>J'ai une carte d'authenticité</Button>
        </Link>
      </div>
    </div>
  );
};

export default RecoveryHome;
