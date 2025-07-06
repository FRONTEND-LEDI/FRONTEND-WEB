import Navbar from '../../common/components/navbar';
import Herolanding from '../../common/components/Herolanding';


export default function LandingPage (){
    return(
        <div>
            <div>
            <Navbar/>;
            </div>
            <div>
            <Herolanding/>
            </div>
           <div className="bg-white flex flex-col md:flex-row items-center justify-center p-8 gap-8 shadow-lg rounded-xl">
  <div className="w-full md:w-1/2 flex justify-center">
    <img
      src="/public/zorro-login.png"
      alt="Ledi el zorro"
      className="w-60 h-auto drop-shadow-lg ml-80"
    />
  </div>
  <div className=" mx-35 md:w-1/2 text-center md:text-left ">
    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
      Tu biblioteca virtual Formoseña
    </h1>
   <p className="text-gray-700 text-lg leading-relaxed">
     Tintas Formoseñas te presenta una biblioteca digital interactiva que conecta a lectores de todas las edades con antologías y contenidos locales. Aquí vas a encontrar obras literarias de autores y autoras formoseños/as, incluyendo las recopilaciones de los concursos "Letras del Viento Norte". Descubrí nuevas voces, leé en cualquier momento y formá parte de esta comunidad lectora.
   </p>
  </div>
</div>
<div className='flex justify-center p-3.5'>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
  <li className="flex items-start gap-4">
    <div>
      <h3 className="font-semibold text-lg">Antologías literarias</h3>
      <p className="text-gray-600 text-sm">Accedé a obras locales y recopilaciones de concursos provinciales.</p>
    </div>
  </li>
  <li className="flex items-start gap-4">
    <div>
      <h3 className="font-semibold text-lg">Acceso multiplataforma</h3>
      <p className="text-gray-600 text-sm">Leé desde tu compu o tu celular, sin límites.</p>
    </div>
  </li>
  <li className="flex items-start gap-4">
    <div>
      <h3 className="font-semibold text-lg">Recompensas y progreso</h3>
      <p className="text-gray-600 text-sm">Desbloqueá logros mientras avanzás en tus lecturas.</p>
    </div>
  </li>
  <li className="flex items-start gap-4">
    <div>
      <h3 className="font-semibold text-lg">Comunidad lectora</h3>
      <p className="text-gray-600 text-sm">Conectá con otras personas que comparten tus intereses.</p>
    </div>
  </li>
</ul>

</div>
<div>
<div className="bg-primary flex justify-center items-center flex-col w-full py-12">
  <h1 className="text-secondary text-2xl md:text-3xl font-bold text-center mb-6">
    Unite a este mundo de Tintas Formoseñas
  </h1>
  <button className="bg-white text-primary font-semibold rounded-2xl px-6 py-3 hover:bg-btnHover hover:shadow-xl transition duration-300 ease-in-out cursor-pointer">
    Empezar
  </button>
</div>

</div>
</div>
    )}