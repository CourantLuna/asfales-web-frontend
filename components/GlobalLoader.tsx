// components/GlobalLoader.tsx
"use client";
import React from "react";
import { useLoading } from "@/context/LoadingContext";
import { Spinner } from "@/components/ui/spinner";

const GlobalLoader: React.FC = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Spinner className="w-16 h-16 text-white" />
    </div>
  );
};

export default GlobalLoader;
