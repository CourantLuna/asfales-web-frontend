// lib/setupGlobalFetch.ts
"use client";
import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";

export const useGlobalFetchInterceptor = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      setLoading(true);
      try {
        const response = await originalFetch(...args);
        return response;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };

    // Cleanup: restaurar fetch original
    return () => {
      window.fetch = originalFetch;
    };
  }, []);
};
