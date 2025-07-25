import API from "./axios"; // your axios wrapper with baseURL

export const signup = (email: string, password: string) =>
  API.post("/auth/signup", { email, password });

export const login = (email: string, password: string) =>
  API.post("/auth/login", { email, password });

export const verifyOtp = (email: string, otp: string) =>
  API.post("/auth/verify-otp", { email, otp });

export const ConfirmLoginOtp = (email: string, otp: string) =>
  API.post(
    "/auth/confirm-login-otp",
    { email, otp },
    {
      withCredentials: true, // enable cookies for this request
    }
  );

export const getMe = () => API.get("/user/get-user", { withCredentials: true });

export const logout = () => API.post("/auth/logout");
