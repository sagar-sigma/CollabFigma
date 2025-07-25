import React from "react";
import { useToastStore } from "../../store/useToastStore";
import type { ToastType } from "../../types";

const bgColors = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

const icons = {
  success: (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  info: (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
      />
    </svg>
  ),
};

const closeIcon = (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ToastItem: React.FC<ToastType> = ({ id, message, type = "info" }) => {
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div
      className={`max-w-sm w-full shadow-lg rounded-md text-white px-4 py-3 flex items-center gap-3 ${bgColors[type]} animate-slide-in`}
    >
      {/* Icon */}
      <div>{icons[type]}</div>

      {/* Message */}
      <div className="flex-1">{message}</div>

      {/* Close Button */}
      <button
        onClick={() => removeToast(id)}
        className="text-white hover:text-gray-200"
        aria-label="Close toast"
      >
        {closeIcon}
      </button>
    </div>
  );
};

export default ToastItem;
