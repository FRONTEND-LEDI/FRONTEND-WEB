export function Letras() {
  return (
    <section className="py-20 px-6 md:px-20">
      
     
      <div className="text-center max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
          Participá del concurso literario provincial
        </h1>
        
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          <span className="font-bold text-primary">"Letras del Viento Norte"</span>{' '}
         es una iniciativa de la Subsecretaría de Recursos Humanos de la provincia de Formosa para empleados públicos, que busca promover la expresión artística y 
         el reconocimiento de los trabajadores estatales a través de un taller previo y la posterior participación en un concurso de cuentos y poesías.
        </p>
        <img
          src="/letras_norte.png"
          alt="Concurso Letras del Viento Norte"
          className="mx-auto w-48 md:w-56 opacity-90 mb-12"
        />
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Preguntas frecuentes
        </h2>

        <div className="space-y-4">
          
          {/* FAQ 1 - Abierto por defecto */}
          <div className="collapse collapse-arrow bg-white border-2 border-primary shadow-md rounded-lg">
            <input type="radio" name="accordion" defaultChecked />
            <div className="collapse-title text-lg font-semibold text-primary">
              ¿Qué es el Concurso "Letras del Viento Norte"?
            </div>
            <div className="collapse-content text-base text-gray-700 leading-relaxed">
              <p className="pt-2">
                Es un programa del Programa de Reconocimiento al Empleo Público de Formosa 
                que promueve la expresión artística de los trabajadores estatales. 
                Se dirige a empleados públicos, tanto activos como pasivos (jubilados), 
                de la Administración Pública provincial.
              </p>
            </div>
          </div>

          {/* FAQ 2 */}
          <div className="collapse collapse-arrow bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-lg">
            <input type="radio" name="accordion" />
            <div className="collapse-title text-lg font-semibold text-primary">
              ¿Cuál es su objetivo?
            </div>
            <div className="collapse-content text-base text-gray-700 leading-relaxed">
              <p className="pt-2">
                Revalorizar la labor del empleado público y fomentar la expresión 
                artística a través de la literatura. Busca reconocer el talento 
                creativo de los trabajadores estatales y socializar sus producciones.
              </p>
            </div>
          </div>

          {/* FAQ 3 */}
          <div className="collapse collapse-arrow bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-lg">
            <input type="radio" name="accordion" />
            <div className="collapse-title text-lg font-semibold text-primary">
              ¿Cómo funciona?
            </div>
            <div className="collapse-content text-base text-gray-700 leading-relaxed">
              <div className="pt-2 space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Taller literario</h4>
                    <p className="text-sm">
                      Participás de un taller donde se enseñan técnicas de escritura 
                      para cuentos y poesías.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Producción de textos</h4>
                    <p className="text-sm">
                      Creás tus propios textos literarios aplicando lo aprendido.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Concurso</h4>
                    <p className="text-sm">
                      Presentás tus textos en el concurso, donde se otorgan 
                      premios y menciones.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Antología</h4>
                    <p className="text-sm">
                      Los trabajos seleccionados forman parte de una antología 
                      literaria que se publica y distribuye oficialmente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ 4 */}
          <div className="collapse collapse-arrow bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-lg">
            <input type="radio" name="accordion" />
            <div className="collapse-title text-lg font-semibold text-primary">
              ¿Qué géneros literarios puedo presentar?
            </div>
            <div className="collapse-content text-base text-gray-700 leading-relaxed">
              <p className="pt-2">
                Podés participar con cuentos o poesías. 
                Ambos géneros son evaluados en el concurso y pueden formar parte 
                de la antología final.
              </p>
            </div>
          </div>

          {/* FAQ 5 */}
          <div className="collapse collapse-arrow bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-lg">
            <input type="radio" name="accordion" />
            <div className="collapse-title text-lg font-semibold text-primary">
              ¿Tiene algún costo participar?
            </div>
            <div className="collapse-content text-base text-gray-700 leading-relaxed">
              <p className="pt-2">
                No, es completamente gratuito. Tanto el taller 
                literario como la participación en el concurso no tienen ningún 
                costo para los empleados públicos.
              </p>
            </div>
          </div>

        </div>
      </div>
      {/* Call to action final */}
      <div className="mt-16 text-center max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border-3 border-primary">
          <h3 className="text-2xl font-bold text-primary mb-4">
            ¿Listo para participar?
          </h3>
          <p className="text-gray-700 mb-6">
            No pierdas la oportunidad de formar parte de la literatura 
            formoseña. Descubrí y comenzá tu camino como autor.
          </p>
          <a 
            href="https://www.formosa.gob.ar/capacitacion/1236/538/4to_concurso_literario_2025-letras_del_viento_norte.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg text-white text-center text-lg px-10 "
          >
            Ver Información Oficial
          </a>
          <p className="text-sm text-gray-500 mt-4">
            ¿Dudas? Escribí a{' '}
            <a 
              href="mailto:direcciondecapacitacionfsa@gmail.com" 
              className="text-primary hover:underline"
            >
              direcciondecapacitacionfsa@gmail.com
            </a>
          </p>
        </div>
      </div>

    </section>
  );
}