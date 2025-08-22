"use client";

import type React from "react";

import { useState } from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

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

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    tipoProyecto: "",
    mensaje: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.nombre.trim()) {
      errors.nombre = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      errors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El email no es válido";
    }

    if (!formData.tipoProyecto) {
      errors.tipoProyecto = "Selecciona un tipo de proyecto";
    }

    if (!formData.mensaje.trim()) {
      errors.mensaje = "El mensaje es requerido";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      nombre: "",
      email: "",
      tipoProyecto: "",
      mensaje: "",
    });
    setIsSubmitting(false);

    alert("¡Mensaje enviado correctamente! Te contactaré pronto.");
  };

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

        <form onSubmit={handleSubmit} className="w-full space-y-6 mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className={`w-full bg-black/50 border text-white placeholder:text-white/60 rounded-lg h-12 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric-violet focus:border-transparent ${
                  formErrors.nombre ? "border-red-500" : "border-white/20"
                }`}
                placeholder="Tu nombre completo"
              />
              {formErrors.nombre && (
                <p className="text-red-400 text-sm mt-1">{formErrors.nombre}</p>
              )}
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-black/50 border text-white placeholder:text-white/60 rounded-lg h-12 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric-violet focus:border-transparent ${
                  formErrors.email ? "border-red-500" : "border-white/20"
                }`}
                placeholder="tu@email.com"
              />
              {formErrors.email && (
                <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Tipo de proyecto *
            </label>
            <select
              name="tipoProyecto"
              value={formData.tipoProyecto}
              onChange={handleInputChange}
              className={`w-full bg-black/50 border text-white rounded-lg h-12 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric-violet focus:border-transparent ${
                formErrors.tipoProyecto ? "border-red-500" : "border-white/20"
              }`}
            >
              <option value="">Selecciona una opción</option>
              <option value="consultoria">Consultoría</option>
              <option value="desarrollo">Desarrollo completo</option>
              <option value="prototipo">Prototipado</option>
              <option value="narrativa">Diseño narrativo</option>
              <option value="otro">Otro</option>
            </select>
            {formErrors.tipoProyecto && (
              <p className="text-red-400 text-sm mt-1">
                {formErrors.tipoProyecto}
              </p>
            )}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Mensaje *
            </label>
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              rows={6}
              className={`w-full bg-black/50 border text-white placeholder:text-white/60 resize-none rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric-violet focus:border-transparent ${
                formErrors.mensaje ? "border-red-500" : "border-white/20"
              }`}
              placeholder="Contame sobre tu proyecto, ideas, objetivos..."
            />
            {formErrors.mensaje && (
              <p className="text-red-400 text-sm mt-1">{formErrors.mensaje}</p>
            )}
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-electric-violet hover:bg-electric-violet/80 text-white px-12 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>
        </form>

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
