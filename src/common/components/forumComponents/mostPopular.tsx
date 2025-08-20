
export default function Popular(){
   
  return (
    <div className="w-2xl">
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Publicaciones recientes
      </li>

      <li className="list-row items-start gap-3 p-3 border-b">
        <div>
          <img
            className="size-10 rounded-full"
            src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            alt="avatar"
          />
        </div>
        <div className="flex-1">
          <div className="font-semibold">María López</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            Debate: Cien años de soledad
          </div>
          <p className="text-xs mt-1">
            “¿Qué opinan del realismo mágico en esta obra? Me parece que García Márquez mezcla historia y fantasía de una forma única que engancha.”
          </p>
          <button className="btn btn-xs mt-2">Comentar</button>
        </div>
      </li>

     

    </ul>
    </div>
  );

}