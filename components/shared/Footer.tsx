"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { FaCcAmex, FaCcMastercard, FaCcVisa, FaMoneyBillAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="hidden md:block bg-gray-200 text-primary py-12 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-4 gap-8">
        {/* Compañía */}
        <div>
          <Link href="/">
  <img
    src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/AsfalesLogoHorizontalAzul-05F79l2EjZPgeQcVfRnskt6H5iKr5g.png"
    alt="Asfales Logo"
    className="w-[90px] max-h-[50px] mb-4 cursor-pointer"
  />
</Link>

          <div className="flex space-x-4 mb-4">
            <Link href="https://facebook.com/asfales" target="_blank">
              <Facebook className="w-5 h-5 hover:text-secondary" />
            </Link>
            <Link href="https://twitter.com/asfales" target="_blank">
              <Twitter className="w-5 h-5 hover:text-secondary" />
            </Link>
            <Link href="https://instagram.com/asfales" target="_blank">
              <Instagram className="w-5 h-5 hover:text-secondary" />
            </Link>
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-secondary">Quienes somos</Link></li>
            
            {/* <li><Link href="/list-property" className="hover:text-secondary">Anunciar tu propiedad</Link></li> */}
            <li><Link href="/blog" className="hover:text-secondary">Blog</Link></li>
            <li><Link href="/jobs" className="hover:text-secondary">Empleos</Link></li>
            {/* <li><Link href="/press" className="hover:text-secondary">Prensa</Link></li> */}
          </ul>
        </div>

        {/* Explorar */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Explorar</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/search/transport" className="hover:text-secondary">Transporte</Link></li>
            <li><Link href="/search/accommodation" className="hover:text-secondary">Alojamientos</Link></li>
            <li><Link href="/search/itineraries" className="hover:text-secondary">Itinerarios</Link></li>
            <li><Link href="/search/activities" className="hover:text-secondary">Actividades</Link></li>
            <li><Link href="/search/offers" className="hover:text-secondary">Ofertas</Link></li>
          </ul>
        </div>

        {/* Servicios */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Servicios</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/compare" className="hover:text-secondary">Compara y escoge la mejor opción</Link></li>
            <li><Link href="/reserve/search" className="hover:text-secondary">Reservar y gana GoFar-Cash</Link></li>
            <li><Link href="/alerts" className="hover:text-secondary">Activa alertas personalizadas</Link></li>
            <li><Link href="/itineraries/new" className="hover:text-secondary">Crea y comparte itinerarios</Link></li>
            <li><Link href="/predictions" className="hover:text-secondary">Predicciones Asfales</Link></li>
          </ul>
        </div>

        {/* Ayuda */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Ayuda</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/support/help-center" className="hover:text-secondary">Centro de ayuda</Link></li>
            <li><Link href="/support/chat" className="hover:text-secondary">Iniciar chat en vivo</Link></li>
            <li><Link href="/faq" className="hover:text-secondary">Preguntas frecuentes</Link></li>
            <li><Link href="/contact" className="hover:text-secondary">Contacto</Link></li>
          </ul>
        </div>
      </div>

      {/* Barra inferior */}
<div className="mt-8 border-t border-primary/20 text-xs">
  <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col items-center sm:flex-row sm:justify-between">
    <span>© {new Date().getFullYear()} ASFALES. Todos los derechos reservados.</span>
     <div className="inline-flex items-center space-x-4 text-2xl text-slate-400">
      <FaCcVisa title="Visa" />
      <FaCcMastercard title="Mastercard" />
      <FaCcAmex title="American Express" />
      <FaMoneyBillAlt title="GoFar-Cash" />
    </div>
    <div className="mt-2 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-2">
      <Link href="/privacy" className="hover:text-secondary">Política de privacidad</Link>
      <Link href="/terms" className="hover:text-secondary">Términos de servicio</Link>
      <Link href="/cookies" className="hover:text-secondary">Cookies</Link>
    </div>
  </div>
</div>

    </footer>
  );
}
