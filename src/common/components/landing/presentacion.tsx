

export default function Presentacion (){
    return(
        <section id="Nosotros" className=" px-8 mb-14 ">
  <div className="max-w-6xl mx-auto">
    <div className="grid md:grid-cols-2  items-center">
      <div className="flex justify-center md:justify-start">
        <img
          src="/hostImage/LOGO-VERTICAL.svg"
          className="w-80 h-auto drop-shadow-lg hover:scale-100 transition-transform duration-300"
          alt="Tintas Formoseñas - Logo"
        />
      </div>
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
          Tu biblioteca virtual formoseña
        </h2>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
          Tintas Formoseñas te presenta una biblioteca digital interactiva que
          conecta a lectores de todas las edades con antologías y contenidos
          locales.
        </p>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
          Aquí vas a encontrar obras literarias de empleados públicos 
          formoseños/as,  recopiladas del concurso anual de antologías.
          <span className="font-semibold text-primary"> "Letras del Viento Norte"</span>.
        </p> 
      </div>
    </div>
  </div>
</section>
    )
}