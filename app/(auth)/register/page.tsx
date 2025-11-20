"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SlidesShow from "@/components/ui/slides-show";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { register as apiRegister } from "@/lib/api/auth";
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

const slides = [
  {
    image:
      "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/PlanificandoViajes1-VgJQXuxaQGpZ9zOLcuLR0TNSdBmwaX.jpg",
    title: "Explora el mundo con Asfales",
    description: "Tu próxima aventura comienza aquí. Comparte, planea y viaja.",
  },
  {
    image:
      "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/kenny-krosky-2xjk8WWLFC4-unsplash-byOEQMlZx8asiMNaN1oLGIqZt9siUQ.jpg",
    title: "Descubre experiencias únicas",
    description: "Reserva actividades y alojamientos en un solo lugar.",
  },
  {
    image:
      "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/ethan-hoover-mHmOArWg2wY-unsplash%20%281%29-AAPgPPt8eiuNglT19U9Rzm7JlhmZFn.jpg",
    title: "Viajes grupales y personalizados",
    description: "Invita a tu grupo y crea recuerdos inolvidables juntos.",
  },
];

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const { user, login: saveAuth } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const form = useForm<RegisterForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
    },
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
    setError,
  } = form;

  React.useEffect(() => {
    if (user?.token) router.push("/");
  }, [user, router]);

  const onSubmit = async (values: RegisterForm) => {
    if (values.password !== values.confirm) {
      setError("confirm", { message: "Las contraseñas no coinciden." });
      return;
    }
    const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`;
    const result = await apiRegister({
      name: fullName,
      email: values.email,
      password: values.password,
    });
    if (!result) {
      setError("email", { message: "Error al registrarse." });
      return;
    }
    saveAuth(result);
    router.push("/");
  };

  return (
   <div className="lg:h-screen  h-auto flex flex-col lg:flex-row">
      {/* Fondo e overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center pointer-events-none w-full h-full"
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

      {/* Formulario de registro */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 ">
        <div className="w-full max-w-md flex flex-col items-center">
          <img
            src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/asfales_logo_con_eslogan_light-wins3zVUDNTHXhhG0C9wkRMM8ABG0M.png"
            alt="Logo Asfales"
            className="w-auto h-[15vh] mb-0"
          />

          <Card className="w-full shadow-lg border-none rounded-lg h-[80vh] flex flex-col">
            <CardContent className="pt-6 overflow-y-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Crea tu cuenta</h2>
                <p className="text-sm text-muted-foreground">
                  Regístrate para comenzar tu experiencia.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Nombres */}
                  <FormField
                    control={control}
                    name="firstName"
                    rules={{ required: "Los nombres son requeridos" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombres</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre/s" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Apellidos */}
                  <FormField
                    control={control}
                    name="lastName"
                    rules={{ required: "Los apellidos son requeridos" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellidos</FormLabel>
                        <FormControl>
                          <Input placeholder="Apellido/s" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Email */}
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
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                          <Input placeholder="ejemplo@asfales.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Contraseña */}
                  <FormField
                    control={control}
                    name="password"
                    rules={{
                      required: "La contraseña es requerida",
                      minLength: { value: 8, message: "Mínimo 8 caracteres" },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
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
                  {/* Confirmar contraseña */}
                  <FormField
                    control={control}
                    name="confirm"
                    rules={{
                      required: "Debes confirmar la contraseña",
                      validate: (val) =>
                        val === getValues("password") ||
                        "Las contraseñas no coinciden",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirm ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirm((o) => !o)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                              {showConfirm ? (
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
                  {/* Enviar */}
                  <Button
                    type="submit"
                    disabled={!isValid}
                    className="w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Crear cuenta
                  </Button>
                </form>
              </Form>

              <Separator className="my-6" />

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

              <Separator className="my-6" />

              <div className="text-center text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Inicia sesión
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
