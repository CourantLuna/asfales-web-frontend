'use client';

import React, { Suspense } from 'react';
import { Star, CheckCircle, Shield, Award } from 'lucide-react';

interface CarouselItem {
  id: number | string;
  name: string;
  logo: string;
  rating?: number;
}

interface InfiniteCarouselProps {
  title: string;
  subtitle: string;
  items: CarouselItem[];
  animationDuration?: number; // en segundos, default 30s
  showRating?: boolean; // mostrar rating debajo de cada item
  showBenefits?: boolean; // mostrar sección de beneficios
  benefits?: {
    text: string;
    icon: 'check' | 'shield' | 'award';
  }[];
  className?: string;
}

export default function InfiniteCarousel({
  title,
  subtitle,
  items,
  animationDuration = 30,
  showRating = true,
  showBenefits = true,
  benefits = [
    { text: "Mejor precio garantizado", icon: "check" },
    { text: "Reservas seguras", icon: "shield" },
    { text: "Atención 24/7", icon: "award" }
  ],
  className = ""
}: InfiniteCarouselProps) {
  
  const getIcon = (iconType: 'check' | 'shield' | 'award') => {
    switch (iconType) {
      case 'check':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-primary" />;
      case 'award':
        return <Award className="w-4 h-4 text-secondary" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  return (
  
    <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
          <section className={`overflow-hidden bg-white py-8 ${className}`}>
      {/* Estilos CSS para la animación del carrusel */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll-carousel {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll-carousel {
            animation: scroll-carousel ${animationDuration}s linear infinite;
            will-change: transform;
          }
          
          .animate-scroll-carousel:hover {
            animation-play-state: paused;
          }
        `
      }} />
      
      {/* Header */}
      <div className="text-center mb-8 px-10">
        <h2 className="text-3xl font-bold text-start mb-4">{title}</h2>
        <p className="text-muted-foreground text-start mb-10">{subtitle}</p>
      </div>
      
      {/* Carrusel */}
      <div className="relative">
        {/* Gradientes para fade effect en los bordes */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
        
        {/* Contenedor del carrusel */}
        <div className="flex animate-scroll-carousel">
          {/* Primera serie de imágenes */}
          {items.map((item) => (
            <div key={`first-${item.id}`} className="flex-shrink-0 mx-4">
              <div className="w-48 h-32 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center group overflow-hidden">
                <img 
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="text-center mt-2">
                <p className="text-sm font-medium text-gray-700">{item.name}</p>
                {showRating && item.rating && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{item.rating}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {/* Segunda serie de imágenes (duplicada para efecto infinito) */}
          {items.map((item) => (
            <div key={`second-${item.id}`} className="flex-shrink-0 mx-4">
              <div className="w-48 h-32 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center group overflow-hidden">
                <img 
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="text-center mt-2">
                <p className="text-sm font-medium text-gray-700">{item.name}</p>
                {showRating && item.rating && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{item.rating}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Información adicional */}
      {showBenefits && (
        <div className="text-start mt-8 pl-10">
          <p className="text-gray-600 mb-4">Trabajamos con más de {items.length * 10} partners en todo el mundo</p>
          <div className="flex justify-start gap-4 text-sm text-gray-500">
            {benefits.map((benefit, index) => (
              <span key={index} className="flex items-center gap-1">
                {getIcon(benefit.icon)}
                {benefit.text}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
        </Suspense>
  );
}
