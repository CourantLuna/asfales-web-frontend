"use client";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface AuthGuardProps {
  parentPath: string;
  children: React.ReactNode;
}

export function AuthGuard({ parentPath, children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const didRedirect = useRef(false);

  const isAtParent = pathname === parentPath;

  useEffect(() => {
    // if (loading) return; // ⬅️ AHORA sí sabemos cuándo terminó de cargar
    if (!user && !isAtParent && !didRedirect.current) {
      didRedirect.current = true;
      router.replace(`${parentPath}`); // Redirige al padre si no hay usuario
    }
  }, [user, loading, isAtParent, parentPath, router]);

  // Mientras loading y NO estamos en el padre, muestra loader
  // if (loading && !isAtParent) return <div>Cargando...</div>;
  // Si loading y estoy en el padre, deja pasar normal (de hecho, puedes poner un splash si quieres)
  // Si no hay usuario y estoy en el padre, deja pasar
  // Si hay usuario, deja pasar

  return <>{children}</>;
}
