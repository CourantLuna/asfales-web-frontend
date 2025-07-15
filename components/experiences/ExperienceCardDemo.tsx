'use client';

import React, { Suspense, useState } from 'react';
import ExperienceCard from '@/components/experiences/ExperienceCard';
import { mockExperiences } from '@/lib/data/experiences-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ExperienceCardDemo() {
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'compact' | 'featured'>('default');
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(0);

  const handleSave = (experienceId: string) => {
    console.log('💾 Experiencia guardada:', experienceId);
  };

  const handleShare = (experienceId: string) => {
    console.log('🔗 Experiencia compartida:', experienceId);
  };

  const handleClick = (experienceId: string) => {
    console.log('👆 Experiencia clickeada:', experienceId);
  };

  const currentExperience = mockExperiences[selectedExperienceIndex];

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 p-6">Loading...</div>}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Experience Card Demo</h1>
          <p className="text-lg text-gray-600">
            Componente reutilizable para mostrar experiencias en Asfales
          </p>
        </div>

        {/* Controles */}
        <div className="bg-white rounded-xl p-6 shadow-sm border space-y-6">
          <h2 className="text-xl font-semibold">Controles de Demo</h2>
          
          {/* Selector de variante */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Variante del Card:</label>
            <div className="flex gap-2">
              {['default', 'compact', 'featured'].map((variant) => (
                <Button
                  key={variant}
                  variant={selectedVariant === variant ? 'default' : 'outline'}
                  onClick={() => setSelectedVariant(variant as any)}
                  className="capitalize"
                >
                  {variant}
                </Button>
              ))}
            </div>
          </div>

          {/* Selector de experiencia */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Experiencia:</label>
            <div className="flex flex-wrap gap-2">
              {mockExperiences.map((exp, index) => (
                <Button
                  key={exp.id}
                  variant={selectedExperienceIndex === index ? 'default' : 'outline'}
                  onClick={() => setSelectedExperienceIndex(index)}
                  className="text-xs"
                >
                  <Badge className="mr-2" variant="secondary">
                    {exp.type}
                  </Badge>
                  {exp.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Info de la experiencia actual */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900">{currentExperience.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
              <div>
                <span className="text-gray-500">Tipo:</span>
                <p className="font-medium">{currentExperience.type}</p>
              </div>
              <div>
                <span className="text-gray-500">Precio:</span>
                <p className="font-medium">{currentExperience.currency} {currentExperience.price.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-500">Disponibilidad:</span>
                <p className="font-medium">{currentExperience.availability.mode}</p>
              </div>
              <div>
                <span className="text-gray-500">Estado:</span>
                <p className={`font-medium ${currentExperience.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {currentExperience.isAvailable ? 'Disponible' : 'No disponible'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card Demo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Vista Previa del Card</h2>
          
          <div className={`flex justify-center ${selectedVariant === 'compact' ? 'items-start' : ''}`}>
            <div className={selectedVariant === 'compact' ? 'w-full max-w-md' : 'w-full max-w-sm'}>
              <ExperienceCard
                experience={currentExperience}
                variant={selectedVariant}
                onSave={handleSave}
                onShare={handleShare}
                onClick={handleClick}
              />
            </div>
          </div>
        </div>

        {/* Grid de ejemplos */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Todas las Experiencias</h2>
          
          {/* Grid normal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockExperiences.slice(0, 6).map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                variant="default"
                onSave={handleSave}
                onShare={handleShare}
                onClick={handleClick}
              />
            ))}
          </div>

          {/* Lista compacta */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Vista Compacta</h3>
            <div className="space-y-3">
              {mockExperiences.slice(0, 4).map((experience) => (
                <ExperienceCard
                  key={`compact-${experience.id}`}
                  experience={experience}
                  variant="compact"
                  onSave={handleSave}
                  onShare={handleShare}
                  onClick={handleClick}
                />
              ))}
            </div>
          </div>
        </div>

        {/* JSON de la experiencia actual */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Estructura de Datos (JSON)</h2>
          <pre className="bg-gray-100 rounded-lg p-4 overflow-auto text-xs">
            {JSON.stringify(currentExperience, null, 2)}
          </pre>
        </div>
      </div>
    </Suspense>
  );
}
