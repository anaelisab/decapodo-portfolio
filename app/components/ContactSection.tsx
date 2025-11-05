"use client";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import ContactForm from "./ContactForm";

interface FormData {
  nombre: string;
  email: string;
  tipoProyecto: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  tipoProyecto?: string;
  mensaje?: string;
}

const PROJECT_TYPES = [
  { value: "consultoria", label: "Consultoría" },
  { value: "desarrollo", label: "Desarrollo completo" },
  { value: "prototipo", label: "Prototipado" },
  { value: "narrativa", label: "Diseño narrativo" },
  { value: "otro", label: "Otro" },
];

const EMAIL_REGEX = /\S+@\S+\.\S+/;

export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="relative md:bg-none bg-gradient-to-br from-electric-violet via-indigo to-electric-violet py-12 md:py-20 z-10"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 relative z-10">
        <h2 className="text-4xl text-white mb-12 font-bold">Contacto</h2>
        <div className="mb-8">
          <p className="text-white text-lg leading-relaxed">
            ¿Tenés una idea en mente o un proyecto en marcha? Hablemos y veamos
            cómo puedo ayudarte.
          </p>
        </div>

        <ContactForm />

        {/* Social Links */}
        <div className="flex items-center justify-end space-x-4">
          <span className="text-white text-lg font-medium">
            Contactame también en
          </span>
          <a
            href="https://www.linkedin.com/in/%C3%A1lvaro-p%C3%A9rez-dom%C3%ADnguez/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-light-sky-blue transition-colors duration-300 transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={32} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-light-sky-blue transition-colors duration-300 transform hover:scale-110"
            aria-label="Email"
          >
            <FaEnvelope size={32} />
          </a>
        </div>
      </div>
    </section>
  );
}
