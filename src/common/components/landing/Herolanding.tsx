
import {  Link as RouteLink } from "wouter";

export default function Herolanding() {

  return (
    <div id="Hero"
      className="hero min-h-screen"
      style={{ backgroundImage: `url('./landingImages/bibliotecabg.png')` }}
    >
      <div className="hero-overlay"></div>
<div className="relative w-full  h-full">
  <div className="absolute inset-0 bg-black/20 " />

      <div className="hero-content mt-24 text-neutral-content text-center">
        <div className="max-w-md  flex justify-center flex-col items-center">
          <h1 className="text-3xl karaoke md:text-5xl font-bold p-4 text-white ">
            Bienvenido
          </h1>
          <p className="text-lg karaoke text-white md:text-xl px-2 py-2  max-w-4xl">
            Una biblioteca virtual que resguarda y difunde las antologías
            literarias de los empleados públicos de la provincia de Formosa.
          </p>
          <img
            src="./hostImage/avatarLanding.png"
            alt="Aguará Guazú"
            className="w-50 h-80  object-contain  drop-shadow-lg  "
          />
          <div className=" flex gap-4">
          
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
 
  
      </div>
      </div>
    </div>
    </div>
    
  );
}