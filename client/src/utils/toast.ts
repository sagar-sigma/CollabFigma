import { useToastStore } from "../store/useToastStore";
import type { ToastPositionType, ToastStatus } from "../types/toast";

type ToastFn = (
  message: string,
  duration?: number,
  position?: ToastPositionType
) => void;

function createToast(type: ToastStatus): ToastFn {
  return (
    message,
    duration = 3000,
    position: ToastPositionType = "top-right"
  ) => {
    const showToast = useToastStore.getState().showToast;
    showToast({ message, type, duration, position });
  };
}

export const toast = {
  success: createToast("success"),
  error: createToast("error"),
  info: createToast("info"),
};
