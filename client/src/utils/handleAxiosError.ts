import { AxiosError } from "axios";
import { toast } from "./toast";

export function handleAxiosError(
  error: unknown,
  fallback = "Something went wrong"
) {
  if (error instanceof AxiosError) {
    const msg = error.response?.data?.message || fallback;
    toast.error(msg);
  } else {
    toast.error(fallback);
  }
}
