"use client";

import type React from "react";
import { useState } from "react";

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

interface ContactFormProps {
  onSubmitSuccess?: () => void;
}

const PROJECT_TYPES = [
  { value: "consultoria", label: "Consultoría" },
  { value: "desarrollo", label: "Desarrollo completo" },
  { value: "prototipo", label: "Prototipado" },
  { value: "narrativa", label: "Diseño narrativo" },
  { value: "otro", label: "Otro" },
];

export default function ContactForm({ onSubmitSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    tipoProyecto: "",
    mensaje: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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

  const resetForm = () => {
    setFormData({
      nombre: "",
      email: "",
      tipoProyecto: "",
      mensaje: "",
    });
    setSubmitMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch(
        process.env.NODE_ENV === "development"
          ? "http://localhost:8888/.netlify/functions/send-contact-mail"
          : "/.netlify/functions/send-contact-mail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.nombre,
            email: formData.email,
            subject: formData.tipoProyecto,
            message: formData.mensaje,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      setSubmitMessage({
        type: "success",
        text: "¡Mensaje enviado correctamente! Te contactaré pronto.",
      });
      resetForm();
      onSubmitSuccess?.();
    } catch (error) {
      console.error("Error sending contact form:", error);
      setSubmitMessage({
        type: "error",
        text: "Error al enviar el mensaje. Intentalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
            disabled={isSubmitting}
            className={`w-full bg-black/50 border text-white placeholder:text-white/60 rounded-lg h-12 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric-violet focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
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
            disabled={isSubmitting}
            className={`w-full bg-black/50 border text-white placeholder:text-white/60 rounded-lg h-12 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric-violet focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
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
          disabled={isSubmitting}
          className={`w-full bg-black/50 border text-white rounded-lg h-12 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric-violet focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
            formErrors.tipoProyecto ? "border-red-500" : "border-white/20"
          }`}
        >
          <option value="">Selecciona una opción</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {formErrors.tipoProyecto && (
          <p className="text-red-400 text-sm mt-1">{formErrors.tipoProyecto}</p>
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
          disabled={isSubmitting}
          rows={6}
          className={`w-full bg-black/50 border text-white placeholder:text-white/60 resize-none rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric-violet focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
            formErrors.mensaje ? "border-red-500" : "border-white/20"
          }`}
          placeholder="Contame sobre tu proyecto, ideas, objetivos..."
        />
        {formErrors.mensaje && (
          <p className="text-red-400 text-sm mt-1">{formErrors.mensaje}</p>
        )}
      </div>

      {submitMessage && (
        <div
          className={`p-4 rounded-lg text-center ${
            submitMessage.type === "success"
              ? "bg-green-500/20 border border-green-500 text-green-200"
              : "bg-red-500/20 border border-red-500 text-red-200"
          }`}
        >
          {submitMessage.text}
        </div>
      )}

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
  );
}
