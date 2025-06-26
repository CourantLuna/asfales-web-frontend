"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SlidesShow from "@/components/ui/slides-show"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { login } from "@/lib/api/auth"
import { useAuth } from "@/lib/hooks/useAuth"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaApple } from "react-icons/fa"


const slides = [
  {
    image: "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/PlanificandoViajes1-VgJQXuxaQGpZ9zOLcuLR0TNSdBmwaX.jpg",
    title: "Explora el mundo con Asfales",
    description: "Tu próxima aventura comienza aquí. Compara, planea y viaja.",
  },
  {
    image: "/slides/slide2.jpg",
    title: "Descubre experiencias únicas",
    description: "Reserva actividades y alojamientos en un solo lugar.",
  },
]

export default function LoginPage() {
  const router = useRouter();
  const { login: saveAuth, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Si ya está logueado, redirige automáticamente
  useEffect(() => {
    if (user?.token) {
      router.push("/");
    }
  }, [user, router]);

  const handleLogin = async () => {
    setError("");
    const result = await login({ email, password });

    if (!result) {
      setError("Credenciales inválidas. Intenta nuevamente.");
      return;
    }

    saveAuth(result);
    router.push("/");
  };

  return (
    <div className=" h-screen flex flex-col lg:flex-row p-1">
      {/* Imagen de fondo con overlay y búsqueda */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/Firefly%20la%20vista%20es%20desde%20encima%20de%20las%20nubes%2C%20vista%20desde%20un%20avion%2C%20en%20la%20toma%20hay%20nubes%20por%20arriba%20%281%29-OhzihO4aGu38K4tHjMwiVAhWXOLcPP.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
      </div>

      {/* Slideshow izquierdo solo en desktop */}
      <div className="hidden lg:flex w-1/2">
        <div className="w-full h-full">
          <SlidesShow slides={slides} aspectRatio="filled" />
        </div>
      </div>

      {/* Formulario de login */}
      <div className="w-full h-full lg:h-auto lg:w-1/2 flex items-center justify-center px-4 py-0">
        <div className="w-full flex flex-col items-center justify-center px-4 py-8">
          {/* Logo de Asfales */}
          <div className="mb-0">
            <img
              src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/asfales_logo_con_eslogan_light-wins3zVUDNTHXhhG0C9wkRMM8ABG0M.png" // Cambia esta ruta si es necesario
              alt="Logo Asfales"
              className="w-[250px] h-auto" // Puedes parametrizar aquí
            />
          </div>

          {/* Formulario de login */}
          <Card className="w-full max-w-md shadow-lg border-none">
            <CardContent className="space-y-6 pt-6">
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">
                  Bienvenido a Asfales
                </h2>
                <p className="text-muted-foreground text-sm">
                  Inicia sesión para acceder a tus itinerarios y reservas.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ejemplo@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="text-right text-xs">
                    <Link href="#" className="text-primary hover:underline">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-500 font-medium">{error}</p>
                )}

                <Button className="w-full" onClick={handleLogin}>
                  Iniciar sesión
                </Button>

                <Separator className="my-4" />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              {/* Texto aclaratorio */}
              <div className="text-center space-y-1">
                <p className="text-sm text-muted-foreground">
                  O hazlo a través de:
                </p>
              </div>

              {/* Botones sociales */}
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <FcGoogle className="w-5 h-5" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <FaFacebook className="w-5 h-5 text-[#1877F2]" />
                  Facebook
                </Button>
              </div>

              <Separator className="my-4" />

              {/* Enlace de registro */}
              <span className="text-sm text-muted-foreground text-center">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="#"
                  className="text-primary font-medium hover:underline"
                >
                  Regístrate
                </Link>
              </span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
