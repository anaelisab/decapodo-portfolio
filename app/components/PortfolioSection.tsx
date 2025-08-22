"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaGithub,
  FaItchIo,
  FaBehance,
} from "react-icons/fa";
import { proyectos } from "@/lib/data";
import { getYouTubeThumbnail } from "@/lib/utils";

export default function PortfolioSection() {
  const [proyectoActual, setProyectoActual] = useState(0);
  const [paginaSlider, setPaginaSlider] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const proyectosPorPagina = 4;
  const totalPaginas = Math.ceil(proyectos.length / proyectosPorPagina);

  const getProyectosPagina = () => {
    const inicio = paginaSlider * proyectosPorPagina;
    return proyectos.slice(inicio, inicio + proyectosPorPagina);
  };

  const MediaDisplay = ({ proyecto }: { proyecto: (typeof proyectos)[0] }) => {
    if (proyecto.tipo === "video") {
      return (
        <div className="relative aspect-video">
          <iframe
            src={proyecto.media}
            className="w-full h-80 object-cover rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {!isPlaying && (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
            >
              <FaPlay className="text-white text-4xl" />
            </button>
          )}
        </div>
      );
    }
    return (
      <div className="relative w-full h-80">
        <Image
          src={proyecto.media || "/placeholder.svg"}
          alt={proyecto.titulo}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={proyectoActual === 0}
        />
      </div>
    );
  };

  const ThumbnailDisplay = ({
    proyecto,
  }: {
    proyecto: (typeof proyectos)[0];
  }) => {
    const thumbnailUrl =
      proyecto.tipo === "video"
        ? getYouTubeThumbnail(proyecto.media)
        : proyecto.media;
    return (
      <div className="relative w-full h-full">
        <Image
          src={thumbnailUrl || "/placeholder.svg"}
          alt={proyecto.titulo}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        {proyecto.tipo === "video" && (
          <div className="absolute bottom-2 right-2 bg-black/50 p-1 rounded">
            <FaPlay className="text-white text-sm" />
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id="portfolio"
      className="relative py-12 md:py-20 z-10 md:bg-transparent bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 relative z-10">
        <h2 className="text-4xl text-black lg:mb-14 mb-8 font-bold">
          Portfolio
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
          <div className="text-black">
            <div className="space-y-6 text-lg leading-relaxed mb-8">
              <p>
                Cada proyecto representa una exploración única en el diseño de
                experiencias interactivas, combinando narrativa profunda con
                mecánicas innovadoras.
              </p>
              <h3 className="text-2xl font-bold">
                {proyectos[proyectoActual].titulo}
              </h3>
              <p>{proyectos[proyectoActual].descripcion}</p>
              {/* o puede ir acá */}
              {/* <p>
                Cada proyecto representa una exploración única en el diseño de
                experiencias interactivas, combinando narrativa profunda con
                mecánicas innovadoras.
              </p> */}
            </div>
            <button className="bg-electric-violet hover:bg-electric-violet/80 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center font-medium">
              Ver más
            </button>
          </div>

          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-xl">
              <MediaDisplay proyecto={proyectos[proyectoActual]} />
            </div>
          </div>
        </div>

        {/* Project Slider */}
        <div className="mb-16">
          <div className="relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20">
              <button
                onClick={() => {
                  if (paginaSlider > 0) {
                    setPaginaSlider(paginaSlider - 1);
                  }
                }}
                disabled={paginaSlider === 0}
                className={`p-2 transition-colors ${
                  paginaSlider === 0
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-black hover:text-electric-violet"
                }`}
                aria-label="Anterior"
              >
                <FaChevronLeft size={24} />
              </button>
            </div>

            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20">
              <button
                onClick={() => {
                  if (paginaSlider < totalPaginas - 1) {
                    setPaginaSlider(paginaSlider + 1);
                  }
                }}
                disabled={paginaSlider === totalPaginas - 1}
                className={`p-2 transition-colors ${
                  paginaSlider === totalPaginas - 1
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-black hover:text-electric-violet"
                }`}
                aria-label="Siguiente"
              >
                <FaChevronRight size={24} />
              </button>
            </div>

            <div className="px-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getProyectosPagina().map((proyecto, index) => {
                  const proyectoIndex =
                    paginaSlider * proyectosPorPagina + index;
                  return (
                    <button
                      key={proyecto.id}
                      onClick={() => {
                        setProyectoActual(proyectoIndex);
                        setIsPlaying(false);
                      }}
                      className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                        proyectoIndex === proyectoActual
                          ? "ring-2 ring-electric-violet scale-105"
                          : "opacity-70 hover:opacity-100 hover:scale-105"
                      }`}
                      style={{ aspectRatio: "16/9" }}
                    >
                      <ThumbnailDisplay proyecto={proyecto} />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white text-xs md:text-sm font-medium truncate">
                          {proyecto.titulo}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPaginas }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPaginaSlider(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === paginaSlider ? "bg-electric-violet" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <span className="text-black text-lg font-medium">
            ¡Mirá más de mi trabajo!
          </span>
          <a
            href="https://alvaropd.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-electric-violet transition-colors duration-300 transform hover:scale-110"
            aria-label="Itch.io"
          >
            <FaItchIo size={32} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-electric-violet transition-colors duration-300 transform hover:scale-110"
            aria-label="GitHub"
          >
            <FaGithub size={32} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-electric-violet transition-colors duration-300 transform hover:scale-110"
            aria-label="Behance"
          >
            <FaBehance size={32} />
          </a>
        </div>
      </div>
    </section>
  );
}
