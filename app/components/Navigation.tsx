"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuMovilAbierto(false); // Close menu after clicking
    }
  };

  const navigationItems = [
    { id: "inicio", label: "Inicio" },
    { id: "sobre", label: "Sobre" },
    { id: "portfolio", label: "Portfolio" },
    { id: "servicios", label: "Servicios" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || menuMovilAbierto
          ? "bg-duke-blue/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {/* <Image
              src="/images/decapodo-logo.png"
              alt="Decápodo Game Design"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            /> */}
            <span className="text-white text-3xl font-pear-soda">
              Decápodo Game Design
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-light-sky-blue transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
            className="md:hidden text-white p-2"
            aria-label={menuMovilAbierto ? "Cerrar menú" : "Abrir menú"}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div
                className={`w-full h-0.5 bg-white transition-all duration-300 ${
                  menuMovilAbierto ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <div
                className={`w-full h-0.5 bg-white transition-all duration-300 ${
                  menuMovilAbierto ? "opacity-0" : ""
                }`}
              />
              <div
                className={`w-full h-0.5 bg-white transition-all duration-300 ${
                  menuMovilAbierto ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuMovilAbierto && (
          <div className="md:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 h-screen w-screen bg-duke-blue z-40">
            {/* Close Button */}
            <button
              onClick={() => setMenuMovilAbierto(false)}
              className="absolute top-5 right-5 text-white p-2"
              aria-label="Cerrar menú"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Menu Items */}
            <div className="pt-24 px-8 h-full flex flex-col justify-start space-y-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white text-2xl hover:text-light-sky-blue transition-colors duration-300 text-left w-full"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
