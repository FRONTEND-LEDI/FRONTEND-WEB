import { Link } from 'wouter';



export default function Herolanding(){
return(
    <div className="bg-[url('/public/library.jpeg')]   bg-cover bg-center py-8 flex flex-col items-center justify-center text-white text-center px-4">
       <div  />
      <h1 className="text-3xl md:text-5xl font-bold p-6 ">
        Bienvenido 
      </h1>
      <p className="text-lg md:text-xl px-2 py-2 rounded max-w-2xl">
        Una biblioteca virtual que resguarda y difunde las antologías literarias de nuestra provincia.
      </p>
      <img src="/host1.png" alt="Aguará Guazú" className="w-42 h-60  object-cover shadow-lg  "
      />
      <div className="mt-6 flex gap-4">
        <Link href="/register" className="bg-orange-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full shadow">
        Empezar
        </Link>
        <Link href="/login" className="bg-gray-300 hover:bg-white text-black font-semibold px-6 py-2 rounded-full shadow"> 
        Ya tengo una cuenta
        </Link>
      </div>
    </div>
  );
}


