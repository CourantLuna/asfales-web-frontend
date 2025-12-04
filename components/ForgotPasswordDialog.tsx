// components/ForgotPasswordDialog.tsx
"use client";

import * as React from "react";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { resetPassword } from "@/lib/services/authService"; // <- importa tu servicio

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { GenericDialog } from "@/components/shared/GenericDialog";

type ForgotForm = { email: string };

export function ForgotPasswordDialog() {
  const [loading, setLoading] = React.useState(false);

  const form = useForm<ForgotForm>({
    defaultValues: { email: "" },
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  const onSubmit = async (vals: ForgotForm) => {
        setLoading(true);
  try {
    const result = await resetPassword(vals.email);
    if (result.success) {
      toast.success(result.message, { duration: 5000 });
      setOpen(false);
    } else {
      toast.error(result.message, { duration: 5000 });
    }
  } catch (err: any) {
    toast.error(err.message || "Ocurrió un error inesperado");
  } finally {
    setLoading(false);
  }
    // // Aquí tu llamada a la API de recuperación
    // console.log("Enviar enlace a:", vals.email);
    // toast.success("Hemos enviado un enlace a tu correo", { duration: 5000 });
    // setOpen(false);
  };

const [open, setOpen] = React.useState(false);


  return (
    <GenericDialog
      trigger={
        <button type="button" className="text-sm text-primary hover:underline">
          ¿Olvidaste tu contraseña?
        </button>
      }
      icon={<Mail />}
      title="Recuperar contraseña"
      description="Introduce tu correo y te enviaremos un enlace para restablecerla."
      widthClass="sm:max-w-md"
      open={open}
      onOpenChange={setOpen}
      actions={[
        {
          label: "Cancelar",
          variant: "ghost",
   onClick: () => setOpen(false),
        },
      ]}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={control}
            name="email"
            rules={{
              required: "El correo es requerido",
              pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="tu@correo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!isValid || loading}
            className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
             {loading ? "Enviando..." : "Enviar enlace"}

          </Button>
        </form>
      </Form>
    </GenericDialog >
  );
}
