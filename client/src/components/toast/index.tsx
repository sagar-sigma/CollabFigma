import { useToastStore } from "../../store/useToastStore";
import ToastItem from "./ToastItem";

const positionStyles = {
  "top-right": "top-4 right-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
} as const;

const Toast = () => {
  const toasts = useToastStore((state) => state.toasts);

  const grouped = toasts.reduce<Record<string, typeof toasts>>((acc, toast) => {
    const position = toast.position || "top-right";
    acc[position] = acc[position] || [];
    acc[position].push(toast);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(grouped).map(([position, items]) => (
        <div
          key={position}
          className={`fixed z-50 space-y-2 ${
            positionStyles[position as keyof typeof positionStyles]
          }`}
        >
          {items.map((toast) => (
            <ToastItem key={toast.id} {...toast} />
          ))}
        </div>
      ))}
    </>
  );
};

export default Toast;
