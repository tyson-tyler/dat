"use client";

import { AuthContextProvider, useAuth } from "@/context/authcontext";
import AdminLayout from "./components/AuthLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaCircleUp } from "react-icons/fa6";

const Layout = ({ children }) => {
  return (
    <AuthContextProvider>
      <AdminChecking>{children}</AdminChecking>
    </AuthContextProvider>
  );
};
export default Layout;

function AdminChecking({ children }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/auth/login");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <FaCircleUp className="w-12 h-12 animate-spin" />
      </div>
    );
  }
  if (!user) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {" "}
        Please Login First
      </div>
    );
  }
  return <AdminLayout>{children}</AdminLayout>;
}
