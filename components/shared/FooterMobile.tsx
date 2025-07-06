"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { FaCcVisa, FaCcMastercard, FaMoneyBillAlt } from "react-icons/fa";

export default function FooterMobile() {
  return (
    <footer className="md:hidden bg-gray-200 text-primary py-4 w-full mt-auto">
      <div className="flex  flex-row flex-1 h-full px-4 w-full">
        
        {/* Logo */}
        <div className="text-center mb-2 gap-y-1 flex justify-center flex-1 flex-col w-full text-xs">
          <Link href="/">
            <img
              src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/AsfalesLogoHorizontalAzul-05F79l2EjZPgeQcVfRnskt6H5iKr5g.png"
              alt="Asfales Logo"
              className="w-[80px] max-h-[40px] mx-auto cursor-pointer"
            />
          </Link>

          {/* Redes sociales */}
        <div className="flex justify-center space-x-6 mb-2">
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

        <div className="flex justify-center items-center flex-row space-x-4 mb-1">
            <Link href="/privacy" className="hover:text-secondary">Privacidad</Link>
            <Link href="/terms" className="hover:text-secondary">Términos</Link>
            <Link href="/cookies" className="hover:text-secondary">Cookies</Link>
        </div>

             {/* Copyright */}
        <div className="text-center text-xs text-primary/70 text-wrap">
          <p>© {new Date().getFullYear()} ASFALES</p>
          <p>Todos los derechos reservados</p>
        </div>

        </div>

       
      </div>
    </footer>
  );
}
