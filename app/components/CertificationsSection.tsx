import { certificaciones } from "@/lib/data";

export default function CertificationsSection() {
  return (
    <section className="relative lg:bg-transparent bg-white py-8 z-0">
      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <h2 className="text-4xl lg:text-white text-duke-blue mb-14 font-bold">
          Certificaciones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificaciones.map((cert, index) => (
            <div
              key={index}
              className="bg-light-sky-blue/80 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <div className="text-sm text-duke-blue mb-2">{cert.fecha}</div>
              <h3 className="text-lg text-duke-blue mb-3 font-bold">
                {cert.titulo}
              </h3>
              <p className="text-duke-blue/80 text-sm leading-relaxed">
                {cert.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
