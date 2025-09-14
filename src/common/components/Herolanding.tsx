import { Link } from 'wouter';



export default function Herolanding(){
return(
  
 <div
  className="hero min-h-screen"
  style={{ backgroundImage: `url('./landingImages/bibliotecabg.png')` }}>
 <div className="hero-overlay"></div>

  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md flex justify-center flex-col items-center">
       <h1 className="text-3xl karaoke md:text-5xl font-bold p-6 ">
        Bienvenido 
      </h1>
      <p className="text-lg karaoke md:text-xl px-2 py-2 rounded max-w-2xl">
        Una biblioteca virtual que resguarda y difunde las antologías literarias de nuestra provincia.
      </p>
       <img src="./hostImage/avatarLanding.png" alt="Aguará Guazú" className="w-50 h-80  object-contain  drop-shadow-lg  "
      />
      <div className="mt-6 flex gap-4">
        <Link href="/register" className="bg-orange-400 karaoke hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded-full shadow">
        Empezar
        </Link>
        <Link href="/login" className="bg-gray-300 karaoke hover:bg-white text-black font-semibold px-6 py-2 rounded-full shadow"> 
        Ya tengo una cuenta
        </Link>
      </div>
    </div>
  
</div>

    </div>
  );
}


