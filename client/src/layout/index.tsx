import type { ReactNode } from "react";
import { Header } from "../components";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="p-4 max-w-7xl mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
