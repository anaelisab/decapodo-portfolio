"use client";

import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PortfolioSection from "./components/PortfolioSection";
import ServicesSection from "./components/ServicesSection";
import CertificationsSection from "./components/CertificationsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import BottomBackground from "./components/BottomBackground";
import TopBackground from "./components/TopBackground";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <div className="relative">
        <TopBackground />
        <ServicesSection />
      </div>
      <PortfolioSection />

      <div className="relative">
        <BottomBackground />
        <CertificationsSection />
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
