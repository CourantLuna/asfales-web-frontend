import { useEffect, useState } from "react"
import { User } from "../api/auth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("asfales-user")
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed)
    }
  }, [])

  function login(user: User) {
    localStorage.setItem("asfales-user", JSON.stringify(user))
    setUser(user)
  }

  function logout() {
    localStorage.removeItem("asfales-user")
    setUser(null)
  }

  return { user, login, logout }
}
