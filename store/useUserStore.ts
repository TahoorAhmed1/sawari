// src/store/useUserStore.ts
import { create } from "zustand";

type Role = "passenger" | "driver";

interface UserState {
  role: Role;
  setRole: (role: Role) => void;
}

export const useUserStore = create<UserState>((set) => ({
  role: "passenger",
  setRole: (role) => set({ role }),
}));
