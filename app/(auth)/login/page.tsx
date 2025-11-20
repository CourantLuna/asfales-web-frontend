// asfales-web-frontend/app/(auth)/Login/page.tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SlidesShow from "@/components/ui/slides-show";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";


import Link from "next/link";
import { login as apiLogin } from "@/lib/api/auth";
import { useAuth } from "@/lib/hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { ForgotPasswordDialog } from "@/components/ForgotPasswordDialog";

const slides = [
  {
    image: "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/PlanificandoViajes1-VgJQXuxaQGpZ9zOLcuLR0TNSdBmwaX.jpg",
    title: "Explora el mundo con Asfales",
    description: "Tu próxima aventura comienza aquí. Compara, planea y viaja.",
  },
  {
    image: "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/kenny-krosky-2xjk8WWLFC4-unsplash-byOEQMlZx8asiMNaN1oLGIqZt9siUQ.jpg",
    title: "Descubre experiencias únicas",
    description: "Reserva actividades y alojamientos en un solo lugar.",
  },
  {
    image: "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/ethan-hoover-mHmOArWg2wY-unsplash%20%281%29-AAPgPPt8eiuNglT19U9Rzm7JlhmZFn.jpg",
    title: "Descubre experiencias únicas",
    description: "Reserva actividades y alojamientos en un solo lugar.",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login: saveAuth, user } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  React.useEffect(() => {
    if (user?.token) {
      router.push("/");
    }
  }, [user, router]);

  const onSubmit = async (values: any) => {
    const result = await apiLogin(values);
    if (!result) {
      form.setError("password", { message: "Credenciales inválidas." });
      return;
    }
    saveAuth(result);
    router.push("/");
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Background overlay */}
   <div
  className="absolute inset-0 -z-10 bg-cover bg-center pointer-events-none"
  style={{
    backgroundImage: `url('https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/Firefly%20la%20vista%20es%20desde%20encima%20de%20las%20nubes%2C%20vista%20desde%20un%20avion%2C%20en%20la%20toma%20hay%20nubes%20por%20arriba%20%281%29-OhzihO4aGu38K4tHjMwiVAhWXOLcPP.jpg')`,
  }}
>
  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
</div>


      {/* Slideshow */}
      <div className="hidden lg:flex w-1/2 p-2">
        <SlidesShow slides={slides} aspectRatio="filled" />
      </div>


      {/* Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 h-full" >
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="text-center mb-0">
            <img
              src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/asfales_logo_con_eslogan_light-wins3zVUDNTHXhhG0C9wkRMM8ABG0M.png"
              alt="Asfales Logo"
             className="w-auto h-[15vh] mb-0"
            />
          </div>
          <Card className="shadow-lg border-none rounded-lg lg:h-[80vh] flex flex-col">
            <CardContent className="space-y-6 pt-6 overflow-y-auto">
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold">Bienvenido a Asfales</h2>
                <p className="text-sm text-muted-foreground">
                  Inicia sesión para acceder a tus itinerarios y reservas.
                </p>
              </div>
              {/* Form */}
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={control}
                    name="email"
                    rules={{
                      required: "El correo es requerido",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email inválido",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Correo electrónico
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="ejemplo@asfales.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="password"
                    rules={{
                      required: "La contraseña es requerida",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Contraseña
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((o) => !o)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />



                  <Button
                    type="submit"
                    disabled={!isValid}
                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed h-[48px]"
                  >
                    Iniciar sesión
                  </Button>
                </form>
              </Form>

              

              {/* Fuera del form de login */}
<div className="mt-2 text-right">
  <ForgotPasswordDialog />
</div>
              <Separator className="my-4" />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                O inicia con:
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex-1">
                  <FcGoogle className="w-5 h-5 mr-2" />
                  <span className="hidden md:inline">Google</span>
                </Button>
                <Button variant="outline" className="flex-1">
                  <FaFacebook className="w-5 h-5 mr-2 text-[#1877F2]" />
                  <span className="hidden md:inline">Facebook</span>
                </Button>
                <Button variant="outline" className="flex-1">
                  <FaApple className="w-5 h-5 mr-2" />
                  <span className="hidden md:inline">Apple</span>
                </Button>
              </div>
              <Separator className="my-4" />
              <div className="text-center text-sm text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Regístrate
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
