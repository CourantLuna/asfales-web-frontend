"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { User } from "../api/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("asfales-user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  function login(user: User) {
    localStorage.setItem("asfales-user", JSON.stringify(user));
    setUser(user);
    // Si quieres recargar al loguear:
    router.refresh();
  }

  function logout() {
    localStorage.removeItem("asfales-user");
    setUser(null);
    // 1) Recarga el layout/servidor:
    router.refresh();
     // Reconstruye la URL manteniendo la ruta actual y añadiendo ?logout=1
    const url = `?logout=1`;
    // Cambia la URL sin recargar la app entera
    router.push(url);

    // 2) (FALLBACK) Fuerza un reload total del browser en caso de que refresh no alcance:
    // window.location.href = pathname;
  }

  return { user, login, logout };
}
