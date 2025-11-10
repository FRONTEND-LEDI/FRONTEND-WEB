import { Link as ScrollLink } from "react-scroll";
import {  Link as RouteLink } from "wouter";

import { useState } from "react";


const sections = [
  { id: "Hero", label: "Inicio" },
  { id: "Propuesta", label: "Acerca de" },
  { id: "Nosotros", label: "Nosotros" },
  { id: "Niveles", label: "Categorias" },
  { id: "Movil", label: "App Movil" },
  
];

export default function Herolanding() {
 const [active, setActive] = useState("hero");
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url('./landingImages/bibliotecabg.png')` }}
    >
      <div className="hero-overlay"></div>
<div className="relative w-full  h-full">
  <div className="absolute inset-0 bg-black/20 " />
  <div className="relative z-10"></div>
      <div className="hero-content mt-18 text-neutral-content text-center">
        <div className="max-w-md ml-50 flex justify-center flex-col items-center">
          <h1 className="text-3xl karaoke md:text-5xl font-bold p-6 text-white ">
            Bienvenido
          </h1>
          <p className="text-lg karaoke text-white md:text-xl px-2 py-2 rounded max-w-2xl">
            Una biblioteca virtual que resguarda y difunde las antologías
            literarias de nuestra provincia.
          </p>
          <img
            src="./hostImage/avatarLanding.png"
            alt="Aguará Guazú"
            className="w-50 h-80  object-contain  drop-shadow-lg  "
          />
          <div className="mt-6 flex gap-4">
          
    <RouteLink
      to="/register"
      className="
        relative flex items-center karaoke justify-center h-[50px] w-[200px] cursor-pointer overflow-hidden 
        rounded-[30px] border-2 border-primary bg-transparent 
        text-primary transition-all duration-1500 ease-in-out 
        hover:shadow-[1px_1px_200px_#252525] hover:text-white hover:border-none
        after:content-[''] after:absolute after:left-0 after:top-0 
        after:h-[10px] after:w-[10px] after:rounded-[30px] after:bg-primary 
        after:invisible after:z-[-1] after:transition-all after:duration-1500 after:ease-in-out
        hover:after:visible hover:after:scale-[80] hover:after:translate-x-[2px]
      "
    >
      <span className="z-[1] font-extrabold tracking-[1px]">Empezar</span>
    </RouteLink>

          
      
          </div>
        <div className="scroll-container relative flex flex-col items-center gap-14">
      {/*  Navigation Dots */}
      
<div className="flex items-center gap-2">
           <div className="flex flex-col justify-between h-54">
        {sections.map((section) => (
          <ScrollLink
            key={section.id}
            to={section.id}
            smooth={true}
            duration={600}
            spy={true}
            onSetActive={() => setActive(section.id)}
           className={`text-xs cursor-pointer text-white ${
          active === section.id ? "text-white font-bold" : "text-gray-400"
        }`}
        onClick={() => setActive(section.id)}
          >
            {section.label}
          </ScrollLink>
        ))}
      </div>
        {/* Línea guía */}
        
  <div className="relative h-54 w-1 bg-gray-500">
  <div
    className="absolute left-0 top-0 w-1 bg-white transition-all duration-300"
    style={{
      height: `${
        (sections.findIndex(s => s.id === active) / (sections.length - 1)) * 60
      }%`
    }}
  ></div>
</div>
      </div>
    {/*  ScrollDown Indicator */}
            <div className="">
      <div className="scrolldown">
        <div className="chevrons">
          <div className="chevrondown" />
          <div className="chevrondown" />
        </div>
      </div>
    </div>
      </div>
      </div>
      </div>
    </div>
    </div>
    
  );
}