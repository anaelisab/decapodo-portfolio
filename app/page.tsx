"use client";

import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PortfolioSection from "./components/PortfolioSection";
import ServicesSection from "./components/ServicesSection";
import CertificationsSection from "./components/CertificationsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      {/* Wrapper for About and Certifications with "arriba" SVG */}
      <div className="relative">
        <div className="hidden md:block">
          <div
            className="absolute top-0 w-full h-full bg-position-[center] background-size: contain bg-no-repeat"
            id="debug"
            style={{
              backgroundImage: "url('icons/arriba.svg')",
            }}
          />
        </div>
        <CertificationsSection />
        <PortfolioSection />
      </div>

      {/* Wrapper for Portfolio and Services with "abajo" SVG */}
      <div className="relative">
        <div className="hidden md:block">
          <div
            className="absolute inset-0 w-full h-full bg-position-[center] background-size: contain bg-no-repeat "
            style={{
              backgroundImage: "url('icons/abajo.svg')",
            }}
          />
        </div>

        <ServicesSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
