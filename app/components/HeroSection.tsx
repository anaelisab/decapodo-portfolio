"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 z-10"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-duke-blue/40 via-indigo/40 to-electric-violet/40">
        <div className="absolute inset-0 bg-[url('/abstract-gaming-background.png')] bg-cover bg-center opacity-40"></div>
      </div>
      <div className="absolute inset-0 bg-electric-violet/40"></div>

      {/* Content */}
      <div
        className={`relative z-10 text-center text-white transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="mb-8">
          <h1 className="text-6xl mb-4 bg-gradient-to-r from-white to-light-sky-blue bg-clip-text text-transparent font-pear-soda">
            Decápodo
          </h1>
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-light-sky-blue to-columbia-blue rounded-full flex items-center justify-center mb-6 shadow-2xl">
            <Image
              src="/images/decapodo-logo.png"
              alt="Decápodo Logo"
              width={80}
              height={80}
              className="w-24 h-24"
            />
          </div>
          <h1 className="text-6xl mb-6 text-white font-pear-soda">
            Game Design
          </h1>
        </div>
        <h3 className="text-xl md:text-2xl mb-4">
          Transformo ideas creativas en experiencias jugables.
        </h3>
        <p className="text-lg md:text-xl text-light-sky-blue max-w-2xl mx-auto mb-8">
          Especializado en narrativa, planificación estética e implementación en
          Unity.
        </p>
      </div>
    </section>
  );
}
