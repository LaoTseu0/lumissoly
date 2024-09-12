import { create } from "zustand";

interface SignupStore {
  nom: string;
  prenom: string;
  date: string;
  email: string;
  password: string;
  confirm: string;
  firstGuardian: string;
  secondGuardian: string;
  setNom: (nom: string) => void;
  setPrenom: (prenom: string) => void;
  setDate: (date: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirm: (confirm: string) => void;
  setFirstGuardian: (option: string) => void;
  setSecondGuardian: (answer: string) => void;
}

export const useSignupStore = create<SignupStore>((set: any) => ({
  nom: "",
  prenom: "",
  date: "",
  email: "",
  password: "",
  confirm: "",
  firstGuardian: "",
  secondGuardian: "",
  setNom: (nom: string) => set({ nom }),
  setPrenom: (prenom: string) => set({ prenom }),
  setDate: (date: string) => set({ date }),
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  setConfirm: (confirm: string) => set({ confirm }),
  setFirstGuardian: (firstGuardian: string) => set({ firstGuardian }),
  setSecondGuardian: (secondGuardian: string) => set({ secondGuardian }),
}));
