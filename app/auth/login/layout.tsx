"use client";
import { AuthContextProvider } from "@/context/authcontext";

export default function Layout({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
