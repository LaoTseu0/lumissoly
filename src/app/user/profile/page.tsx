"use client";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { COLORS } from "@global/constants";
import { svgAvatar } from "@global/svg/svgAvatar";
import logger from "@lib/logger/logger";
import { useUserStore } from "@store/user.store";

import { FunctionComponent } from "react";

interface UserProfilProps {}

const UserProfil: FunctionComponent<UserProfilProps> = () => {
  const { name, date, email } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    logger.info(e.target.value);
  };

  return (
    <div>
      <div>{svgAvatar(COLORS.secondary)}</div>
      <h1 className="lumi-h1 uppercase">{name}</h1>
      <div>
        <p className="uppercase lumi-description">nom</p>
        <Input value={name} onChange={handleChange} />
      </div>
      <div>
        <p className="uppercase lumi-description">prénom</p>
        <Input value={name} onChange={handleChange} />
      </div>
      <div>
        <p className="uppercase lumi-description">date de naissance</p>
        <Input type="date" value={name} onChange={handleChange} />
      </div>
      <div>
        <p className="uppercase lumi-description">email</p>
        <Input value={name} onChange={handleChange} />
      </div>
      <div>
        <Button>Acheter du stockage</Button>
        <Button>Mes comptes de récupération</Button>
      </div>
    </div>
  );
};

export default UserProfil;
