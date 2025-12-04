// components/GlobalFetchWrapper.tsx
"use client"; // 🔴 Esto es clave

import React from "react";
import { useGlobalFetchInterceptor } from "@/lib/setupGlobalFetch";

const GlobalFetchWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useGlobalFetchInterceptor();
  return <>{children}</>;
};

export default GlobalFetchWrapper;
