import type { AxiosResponse } from "axios";
import { toast } from "./toast";

type APIResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  statusCode?: number;
};

export function handleApiResponse<T>(
  response: AxiosResponse<APIResponse<T>>
): APIResponse<T> | null {
  if (!response?.data) {
    toast.error("Invalid response from server");
    return null;
  }

  const res = response.data;
  console.log(res);

  if (!res.success) {
    toast.error(res.message || "Request failed");
    return null;
  }

  return res;
}
