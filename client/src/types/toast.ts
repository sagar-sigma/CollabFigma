export type ToastPositionType =
  | "top-right"
  | "top-center"
  | "bottom-right"
  | "bottom-center";

export type ToastStatus = "success" | "error" | "info";

export interface ToastType {
  id: string;
  message: string;
  type?: ToastStatus;
  duration?: number;
  position?: ToastPositionType;
}
