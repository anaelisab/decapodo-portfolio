"use client";

import { useState } from "react";
import { servicios } from "@/lib/data";

export default function ServicesSection() {
  const [servicioSeleccionado, setServicioSeleccionado] = useState(1);

  return (
    <section
      id="servicios"
      className="relative py-14 md:py-20 z-10 lg:bg-none bg-gradient-to-br from-indigo to-electric-violet"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 relative z-10">
        {
          <h2 className="text-4xl lg:text-duke-blue text-white mb-12 font-bold">
            Servicios
          </h2>
        }
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            {servicios.map((servicio) => (
              <button
                key={servicio.id}
                onClick={() => setServicioSeleccionado(servicio.id)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  servicioSeleccionado === servicio.id
                    ? "bg-electric-violet text-white shadow-lg scale-105"
                    : "bg-white/10 text-white hover:bg-white/20 hover:scale-102 lg:bg-electric-violet/60 lg:hover:bg-indigo/80"
                }`}
              >
                <div className="flex items-center justify-between">
                  {servicioSeleccionado === servicio.id && (
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-3"></div>
                  )}
                  <span className=" text-lg flex-1">{servicio.nombre}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="bg-electric-violet/90 backdrop-blur-sm rounded-lg p-8 shadow-xl">
            <div className="text-white">
              <h3 className="text-2xl mb-6 font-bold">
                {servicios.find((s) => s.id === servicioSeleccionado)?.nombre}
              </h3>
              <p className="text-lg leading-relaxed">
                {
                  servicios.find((s) => s.id === servicioSeleccionado)
                    ?.descripcion
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
