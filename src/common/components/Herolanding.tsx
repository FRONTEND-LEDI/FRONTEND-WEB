import { Link } from 'wouter';



export default function Herolanding(){
return(
  
      <div
  className="hero min-h-screen"
  style={{ backgroundImage:"url(https://png.pngtree.com/thumb_back/fh260/background/20241101/pngtree-charming-library-space-with-bookshelves-and-a-cozy-chair-relaxing-room-image_16482270.jpg)",}}>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md flex justify-center flex-col items-center">
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
  
</div>

    </div>
  );
}


