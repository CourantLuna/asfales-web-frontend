"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Edit, 
  ChevronRight, 
  User, 
  Calendar, 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  Plane, 
  FileText, 
  Heart, 
  Gift,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { ShowIfAuth } from "../ShowIfAuth";
import Profile from "./Profile";
import { useAuth } from "@/lib/hooks/useAuth";

interface ProfileInfoProps {
  className?: string;
}

export default function ProfileInfo({ className }: ProfileInfoProps) {
  const [showAdditionalTravelers, setShowAdditionalTravelers] = useState(false);
    const { user, login: saveAuth, token } = useAuth();
  if (!user) {
    return     <Profile/>
  }
  // Datos del usuario (esto vendría de tu API/estado)
  const userData = {
    name: user.name? user.name : "Nombre de Usuario",
    email:  user.email? user.email : "username@asfales.com",
    phone: user.phoneNumber? user.phoneNumber : "No proporcionada",
    dateOfBirth: "No proporcionada",
    gender: "No proporcionada",
    bio: "No proporcionada",
    address: "No proporcionada",
    emergencyContact: "No proporcionada",
    accessibilityNeeds: "No, no tengo necesidades de accesibilidad",
    tsaPreCheck: "TSA PreCheck y número Redress",
    passport: "Pasaporte",
    flightPreferences: "Preferencia de asiento y aeropuerto de origen",
    rewardPrograms: "Programas de viajero frecuente y membresía"
  };

  const handleEdit = (section: string) => {
    console.log(`Editando sección: ${section}`);
    // Aquí implementarías la lógica para editar
  };

  const handleAddTraveler = () => {
    console.log("Agregando viajero adicional");
    // Aquí implementarías la lógica para agregar viajero
  };

  return (
        <>
        <ShowIfAuth>

      <div className={` lg:px-6 ${className || ''} bg-white rounded-lg lg:border`}>


        {/* Información básica */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              {/* Header con nombre del usuario */}
              <div className="pb-5">
                <h1 className="text-2xl font-bold text-primary lg:mb-2 ">
                  {userData.name}
                </h1>
              </div>
              <CardTitle className="hidden lg:block text-xl font-semibold text-secondary">
                Información básica
              </CardTitle>
              <p className="text-sm text-muted-foreground lg:mt-1">
                Asegúrate de que esta información coincida con tu ID de viaje, como tu pasaporte o licencia.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit('basic')}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm ">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Nombre</h4>
                <p className="text-gray-700">{userData.name}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Biografía</h4>
                <p className="text-gray-500">{userData.bio}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Fecha de nacimiento</h4>
                <p className="text-gray-500">{userData.dateOfBirth}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Género</h4>
                <p className="text-gray-500">{userData.gender}</p>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-bold text-gray-900 mb-1">Necesidades de accesibilidad</h4>
                <p className="text-gray-700">{userData.accessibilityNeeds}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información de contacto */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl font-semibold">
                Contacto
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Puedes iniciar sesión, recibir alertas de actividad de cuenta y recibir actualizaciones de viajes compartiendo esta información.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit('contact')}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Número de móvil</h4>
                <p className="text-gray-500">{userData.phone}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Correo electrónico</h4>
                <p className="text-gray-700">{userData.email}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Contacto de emergencia</h4>
                <p className="text-gray-500">{userData.emergencyContact}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Dirección</h4>
                <p className="text-gray-500">{userData.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Más detalles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Más detalles
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Acelera tu reserva guardando de forma segura los detalles de viaje esenciales.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Seguridad aeroportuaria */}
            <div
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleEdit('airport-security')}
            >
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Seguridad aeroportuaria</h4>
                  <p className="text-sm text-gray-500">{userData.tsaPreCheck}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            {/* Documentos de viaje */}
            <div
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleEdit('travel-documents')}
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Documentos de viaje</h4>
                  <p className="text-sm text-gray-500">{userData.passport}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            {/* Preferencias de vuelo */}
            <div
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleEdit('flight-preferences')}
            >
              <div className="flex items-center space-x-3">
                <Plane className="h-5 w-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Preferencias de vuelo</h4>
                  <p className="text-sm text-gray-500">{userData.flightPreferences}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            {/* Programas de recompensas */}
            <div
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleEdit('reward-programs')}
            >
              <div className="flex items-center space-x-3">
                <Gift className="h-5 w-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Programas de recompensas</h4>
                  <p className="text-sm text-gray-500">{userData.rewardPrograms}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Viajeros adicionales */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-semibold flex items-center">
                Viajeros adicionales
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdditionalTravelers(!showAdditionalTravelers)}
                  className="ml-2 p-1 h-6 w-6"
                >
                  {showAdditionalTravelers ?
                    <ChevronUp className="h-4 w-4" /> :
                    <ChevronDown className="h-4 w-4" />}
                </Button>
              </CardTitle>
              {showAdditionalTravelers && (
                <p className="text-sm text-muted-foreground mt-1">
                  Facilita la reserva guardando perfiles de familiares, amigos o compañeros de equipo que viajan contigo con frecuencia.
                </p>
              )}
            </div>
          </CardHeader>
          {showAdditionalTravelers && (
            <CardContent>
              <Button
                variant="outline"
                onClick={handleAddTraveler}
                className="w-full border-dashed border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 py-8"
              >
                <User className="h-5 w-5 mr-2" />
                Agregar viajero adicional
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </ShowIfAuth>
    { /** Profile con ShowIfUnauth content */}
    <Profile/>
    </>
  );
}