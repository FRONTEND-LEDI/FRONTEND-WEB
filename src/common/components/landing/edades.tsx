

export default function Age(){
    return(
        <div id="Niveles" className="py-20 px-4 bg-gradient-to-b">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-primary font-bold text-3xl md:text-4xl text-center mb-4">
      Encontrá lecturas para cada etapa
    </h2>
    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
      Contenido organizado por edad para que encuentres lo más adecuado
    </p>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="group flex flex-row bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="bg-orange-400 h-32 flex items-center justify-center p-4">
          <img
            src="/landingImages/cartoon-child-girl-svgrepo-com.svg"
            alt="Inicial"
            className="h-24 w-24 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-bold text-lg text-gray-800 mb-1">Inicial</h3>
          <p className="text-sm text-gray-500">3 a 10 años</p>
          <p className="text-xs text-gray-400 mt-2">Primeros lectores</p>
        </div>
      </div>
      <div className="group flex flex-row bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="bg-orange-400 h-32 flex items-center justify-center p-4">
          <img
            src="/landingImages/aunt-cartoon-family-svgrepo-com.svg"
            alt="Secundaria"
            className="h-24 w-24 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-bold text-lg text-gray-800 mb-1">Secundaria</h3>
          <p className="text-sm text-gray-500">11 a 17 años</p>
          <p className="text-xs text-gray-400 mt-2">Adolescentes</p>
        </div>
      </div>
      <div className="group flex flex-row bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="bg-orange-400 h-32 flex items-center justify-center p-4">
          <img
            src="/landingImages/family-female-mom-svgrepo-com.svg"
            alt="Adulto Joven"
            className="h-24 w-24 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-bold text-lg text-gray-800 mb-1">Adulto Joven</h3>
          <p className="text-sm text-gray-500">18 a 59 años</p>
          <p className="text-xs text-gray-400 mt-2">Adultos</p>
        </div>
      </div>
      <div className="group flex flex-row bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="bg-orange-400 h-32 flex items-center justify-center p-4">
          <img
            src="/landingImages/family-grandfather-grandpa-svgrepo-com.svg"
            alt="Adulto Mayor"
            className="h-24 w-24 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-bold text-lg text-gray-800 mb-1">Adulto Mayor</h3>
          <p className="text-sm text-gray-500">60+ años</p>
          <p className="text-xs text-gray-400 mt-2">Mayores</p>
        </div>
      </div>

    </div>
  </div>
</div>
    )
}