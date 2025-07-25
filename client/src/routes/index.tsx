import { Navigate } from "react-router-dom";
import { Dashboard, Home, Login, Signup, VerifyOtp } from "../pages";
import Layout from "../layout";
import { useAuth } from "../store/auth";

export const routes = () => {
  const { user } = useAuth.getState();
  console.log("user", user);

  return [
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: user ? <Navigate to="/dashboard" /> : <Login />,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/dashboard" /> : <Signup />,
    },
    {
      path: "/verify-otp",
      element: <VerifyOtp />,
    },
    {
      path: "/dashboard",
      element: user ? (
        <Layout>
          <Dashboard />
        </Layout>
      ) : (
        <Navigate to="/login" />
      ),
    },
  ];
};
