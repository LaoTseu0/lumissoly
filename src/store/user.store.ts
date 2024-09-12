import { create } from "zustand";

interface UserStore {
  name: string;
  date: string;
  email: string;
  setName: (nom: string) => void;
  setDate: (date: string) => void;
  setEmail: (email: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  name: "",
  date: "",
  email: "",
  setName: (name: string) => set({ name }),
  setDate: (date: string) => set({ date }),
  setEmail: (email: string) => set({ email }),
}));
