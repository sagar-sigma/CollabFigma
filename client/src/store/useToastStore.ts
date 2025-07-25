import { create } from "zustand";
import type { ToastType } from "../types/toast";

type ToastInput = Omit<ToastType, "id">;

interface ToastState {
  toasts: ToastType[];
  showToast: (toast: ToastInput) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (toast) => {
    const id = crypto.randomUUID();
    const newToast: ToastType = { ...toast, id };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    const duration = toast.duration ?? 3000;
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
