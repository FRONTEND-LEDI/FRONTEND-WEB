import { useEffect } from "react";
import Navbar from "../../common/components/navbar";
import Herolanding from "../../common/components/landing/Herolanding";
import Footer from "../../common/components/Footer";
import {  useLocation } from "wouter";
import { useAuth } from "../../context/AuthContext";
import LoadingGate from "../../common/components/LoadingGate";
import Age from "../../common/components/landing/edades";
import Movil from "../../common/components/landing/movil";
import Presentacion from "../../common/components/landing/presentacion";
import Aguaru from "../../common/components/landing/Aguaru";
import Propuestas from "../../common/components/landing/propuestas";
import LastCall from "../../common/components/landing/ctalast";
import MiddleCall from "../../common/components/landing/ctamedio";
import GamificationSection from "../../common/components/landing/gemificacion";
// import LandingIndex from "../../common/components/landing/landindIndex";


export default function LandingPage() {
  // cuando hay token, redirigir al /home
  const { user, loading } = useAuth();
  const [location, setLocation] = useLocation();

  // si ya hay usuario redirigir a la página de inicio
  useEffect(() => {
    if (!loading && user && location === "/") {
      setLocation("/home");
    }
  }, [loading, user, location, setLocation]);

  if (loading) return <LoadingGate message="Espere un momento…" />;

  return (
    <div className="w-full overflow-hidden flex justify-center flex-col">
      <div>
        <Navbar />
      </div>
      {/* <LandingIndex/> */}
      {/* HERO  */}
      <Herolanding />
      {/* Seccion propuestas */}
      <Propuestas/>
      {/* Seccion Presentacion */}
      <Presentacion/>
      {/* Seccion Aguaru */}  
      <Aguaru/>
      {/* Seccion Edades */}
      <Age/>
     {/* Seccion Top Users */}
      <GamificationSection/>
      {/* Middle Call  */}
      <MiddleCall/>
       {/*  Seccion movil */}
      <Movil/>
      {/* Last Call  */}
      <LastCall/>
      <Footer />
      </div>
  );

}