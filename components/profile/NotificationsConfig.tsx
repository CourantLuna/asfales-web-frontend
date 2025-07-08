"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronRight, 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone,
  Settings,
  Shield,
  Gift
} from "lucide-react";
import Image from "next/image";
import { ShowIfAuth } from "../ShowIfAuth";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  method: 'email' | 'push' | 'sms' | 'all';
}

export default function NotificationsConfig() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'booking-confirmations',
      title: 'Confirmaciones de reserva',
      description: 'Recibe confirmaciones cuando hagas una reserva',
      enabled: true,
      method: 'all'
    },
    {
      id: 'payment-receipts',
      title: 'Recibos de pago',
      description: 'Confirmaciones de pagos y facturas',
      enabled: true,
      method: 'email'
    },
    {
      id: 'trip-updates',
      title: 'Actualizaciones de viaje',
      description: 'Cambios en vuelos, hoteles o itinerarios',
      enabled: true,
      method: 'all'
    },
    {
      id: 'price-alerts',
      title: 'Alertas de precios',
      description: 'Notificaciones cuando bajen los precios',
      enabled: false,
      method: 'push'
    },
    {
      id: 'promotions',
      title: 'Ofertas y promociones',
      description: 'Descuentos especiales y ofertas personalizadas',
      enabled: false,
      method: 'email'
    }
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id 
          ? { ...notif, enabled: !notif.enabled }
          : notif
      )
    );
  };

  const handleConfigureService = (service: string) => {
    console.log(`Configurando servicio: ${service}`);
    // Aquí implementarías la navegación o modal de configuración
  };

  return (
    <ShowIfAuth>
    <div className=" rounded-lg lg:border lg:p-6 bg-white">
      {/* Header */}
      <div className="px-6">
        <h1 className=" hidden lg:block text-xl font-semibold text-secondary mb-2 ">
          Comunicaciones
        </h1>
        <p className="text-gray-600 ">
          Controla qué notificaciones recibes de nuestra familia de marcas.
        </p>
        </div>

      {/* Asfales Brand Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-x-4">
            <div className="flex items-center gap-4">
              {/* Logo de Asfales */}
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Asfales</h2>
                <p className="text-sm text-gray-500">Plataforma de viajes</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleConfigureService('asfales')}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Configura cómo te notificamos sobre actualizaciones de cuenta y recompensas.
          </p>
          
          <div className="space-y-4 p-0" >
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {notification.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    {notification.method === 'email' && (
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Email</span>
                      </div>
                    )}
                    {notification.method === 'push' && (
                      <div className="flex items-center space-x-1">
                        <Bell className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Push</span>
                      </div>
                    )}
                    {notification.method === 'sms' && (
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">SMS</span>
                      </div>
                    )}
                    {notification.method === 'all' && (
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">Email</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Bell className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">Push</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">SMS</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <Switch
                  checked={notification.enabled}
                  onCheckedChange={() => toggleNotification(notification.id)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métodos de Notificación */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Métodos de notificación
          </CardTitle>
          <p className="text-sm text-gray-600">
            Elige cómo te notificamos sobre actualizaciones de cuenta y recompensas.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Soporte por Email */}
          <div 
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => handleConfigureService('email-support')}
          >
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Soporte por email</h4>
                <p className="text-sm text-gray-500">Email</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          {/* Notificaciones Push */}
          <div 
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => handleConfigureService('push-notifications')}
          >
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Notificaciones push</h4>
                <p className="text-sm text-gray-500">Aplicación móvil</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          {/* SMS */}
          <div 
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => handleConfigureService('sms')}
          >
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Mensajes SMS</h4>
                <p className="text-sm text-gray-500">Texto</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Configuración Avanzada */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Configuración avanzada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Privacidad */}
          <div 
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => handleConfigureService('privacy')}
          >
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Privacidad y datos</h4>
                <p className="text-sm text-gray-500">Controla cómo usamos tus datos</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          {/* Frecuencia */}
          <div 
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => handleConfigureService('frequency')}
          >
            <div className="flex items-center space-x-3">
              <Settings className="h-5 w-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Frecuencia de notificaciones</h4>
                <p className="text-sm text-gray-500">Ajusta la frecuencia de emails</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          {/* Ofertas especiales */}
          <div 
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => handleConfigureService('special-offers')}
          >
            <div className="flex items-center space-x-3">
              <Gift className="h-5 w-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Ofertas especiales</h4>
                <p className="text-sm text-gray-500">Personaliza tus ofertas y descuentos</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-3 px-6">
        <Button className="flex-1">
          Guardar configuración
        </Button>
        <Button variant="outline" className="flex-1">
          Restablecer a predeterminado
        </Button>
      </div>
    
          </div>
     </ShowIfAuth>       
  );
}