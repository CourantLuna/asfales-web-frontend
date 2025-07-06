import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../api/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 👈 NUEVO
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("asfales-user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser(null);
    }
    setLoading(false); // 👈 YA NO ESTÁ CARGANDO
  }, []);

  function login(user: User) {
    localStorage.setItem("asfales-user", JSON.stringify(user));
    setUser(user);
    router.refresh();
  }

  function logout() {
    localStorage.removeItem("asfales-user");
    setUser(null);
    router.refresh();
    router.push("?logout=1");
  }

  return { user, login, logout, loading }; // 👈 REGRESA LOADING
}
