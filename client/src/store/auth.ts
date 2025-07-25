import { create } from "zustand";
import { getMe } from "../api/auth";
import type { User } from "../types";

interface AuthState {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,
  fetchUser: async () => {
    try {
      const response = await getMe();
      const data = response.data;
      if (data.success && data.data?.user) {
        set({ user: data.data.user, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch {
      set({ user: null, loading: false });
    }
  },
  setUser: (user) => set({ user }),
}));
