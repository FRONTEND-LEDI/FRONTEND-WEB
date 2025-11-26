import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";

const sections = [
  { id: "Hero", label: "Inicio" },
  { id: "Propuesta", label: "Acerca de" },
  { id: "Nosotros", label: "Nosotros" },
  { id: "Niveles", label: "Categorias" },
  { id: "Movil", label: "App Móvil" },
];

export default function LandingIndex() {
  const [active, setActive] = useState("Hero");

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex items-center gap-4 bg-black/30 rounded-full px-6 py-8  shadow-2xl">
      {/* Labels con efectos mejorados */}
      <div className="flex flex-col gap-4">
        {sections.map((section, index) => (
          <ScrollLink
            key={section.id}
            to={section.id}
            smooth={true}
            duration={600}
            spy={true}
            onSetActive={() => setActive(section.id)}
            className="relative group cursor-pointer"
          >
            <span
              className={`text-sm font-medium transition-all duration-300 ${
                active === section.id
                  ? "text-white translate-x-0 opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  : "text-gray-300 -translate-x-2 opacity-70 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-white"
              }`}
            >
              {section.label}
            </span>
            
            {/* Indicador lateral para item activo */}
            <div
              className={`absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.8)] ${
                active === section.id
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-0"
              }`}
            ></div>
          </ScrollLink>
        ))}
      </div>

      {/* Barra de progreso con gradiente y efecto glow */}
      <div className="relative h-64 w-0.5 bg-gradient-to-b from-white/20 via-white/30 to-white/20 rounded-full overflow-hidden">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        
        {/* Barra de progreso activa con glow */}
        <div
          className="absolute left-0 top-0 w-full transition-all duration-500 ease-out rounded-full bg-primary"
          style={{
            height: `${
              (sections.findIndex((s) => s.id === active) /
                (sections.length - 1)) *
              100
            }%`,
          
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.3)",
          }}
        ></div>

        {/* Indicadores de puntos en cada sección */}
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
              sections.findIndex((s) => s.id === active) >= index
                ? "bg-primary scale-100 "
                : "bg-gray-600 scale-75"
            }`}
            style={{
              top: `${(index / (sections.length - 1)) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}