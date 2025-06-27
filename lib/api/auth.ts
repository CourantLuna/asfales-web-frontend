export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  password: string; // solo para mockapi
  avatar: string;
}

const API_URL = "https://685ba92489952852c2da6baa.mockapi.io/asfales/users";

/**
 * Login de usuario: busca coincidencia de email y password.
 */
export async function login(
  credentials: LoginCredentials
): Promise<User | null> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) return null;

  const users: User[] = await res.json();
  const match = users.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );
  return match ?? null;
}

/**
 * Registro de usuario: crea un nuevo registro en MockAPI y devuelve el usuario.
 */
export async function register(
  credentials: RegisterCredentials
): Promise<User | null> {
  // Genera un token simple para el nuevo usuario
  const id = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  // Avatar por defecto vacío o puedes asignar una URL genérica
const avatar = `https://i.pravatar.cc/150?${Math.floor(Math.random() * 70)}`;

  const payload = {
    id: id,
    name: credentials.name,
    email: credentials.email,
    password: credentials.password,
    token: token,
    avatar: avatar,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const user: User = await res.json();
  return user;
}
