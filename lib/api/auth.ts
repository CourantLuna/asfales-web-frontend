export interface LoginCredentials {
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  token: string
  password: string // solo para mockapi
  avatar: string
}

export async function login(credentials: LoginCredentials): Promise<User | null> {
  const res = await fetch("https://685ba92489952852c2da6baa.mockapi.io/asfales/users", {
    cache: "no-store",
  })

  const users: User[] = await res.json()

  const match = users.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  )

  return match ?? null
}
