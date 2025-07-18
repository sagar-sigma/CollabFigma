import { lazy } from "react";

export const Home = lazy(() => import("./home/index"));
export const Signup = lazy(() => import("./auth/Signup"));
export const Login = lazy(() => import("./auth/Login"));
export const VerifyOtp = lazy(() => import("./auth/VerifyOtp"));
export const Dashboard = lazy(() => import("./dashboard"));
