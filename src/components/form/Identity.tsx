"use client";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { REGEX } from "@global/regex";
import { useSignupStore } from "@store/signup.store";
import { FunctionComponent } from "react";

interface IdentityProps {}

const Identity: FunctionComponent<IdentityProps> = () => {
  const {
    nom,
    prenom,
    date,
    email,
    password,
    confirm,
    setNom,
    setPrenom,
    setDate,
    setEmail,
    setPassword,
    setConfirm,
  } = useSignupStore();

  return (
    <fieldset className="flex flex-col gap-2 mb-6">
      <div>
        <Label htmlFor="nom" className="text-secondary">
          <p className="text-p-mobil">NOM</p>
        </Label>
        <Input
          type="text"
          name="nom"
          pattern={REGEX.WORD}
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="prenom" className="text-secondary">
          <p className="text-p-mobil">PRÉNOM</p>
        </Label>
        <Input
          type="text"
          name="prenom"
          value={prenom}
          pattern={REGEX.WORD}
          onChange={(e) => setPrenom(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="date" className="text-secondary">
          <p className="text-p-mobil">DATE DE NAISSANCE</p>
        </Label>
        <Input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-secondary">
          <p className="text-p-mobil">ADRESSE MAIL</p>
        </Label>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-secondary">
          <p className="text-p-mobil">MOT DE PASSE</p>
        </Label>
        <Input
          type="password"
          name="password"
          // pattern={REGEX.PASSWORD}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="confirm" className="text-secondary">
          <p className="text-p-mobil">CONFIRMEZ VOTRE MOT DE PASSE</p>
        </Label>
        <Input
          type="password"
          name="confirm"
          pattern={REGEX.PASSWORD}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>
    </fieldset>
  );
};

export default Identity;
