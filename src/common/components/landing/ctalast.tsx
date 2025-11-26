import { Link } from "wouter"
export default function LastCall(){
    return(
        
            <div  className="min-h-screen w-full bg-cover bg-center flex flex-col justify-start items-center p-14 gap-12 mb-0 mt-8"
          style={{ backgroundImage: `url('/ilustracion.png')` }}
        >
              <h1 className="text-primary text-4xl md:text-4xl font-bold text-center z-10 ">
                Unite a este mundo de Tintas Formoseñas
              </h1>
        <img src="./hostImage/LOGO-COLOR.svg" alt="" className="h-40 m-0 
        bounce-hover" />
             <Link
              to="/register"
              className="
                 relative flex items-center justify-center h-[50px] w-[200px] cursor-pointer overflow-hidden 
                  rounded-[30px] border-2 border-primary bg-transparent
                  text-primary transition-all duration-700 ease-in-out 
                   hover:text-white hover:border-none
                  after:content-[''] after:absolute after:left-0 after:top-0 
                  after:h-full after:w-0 after:bg-primary
                  after:transition-all after:duration-1500 after:ease-in-out
                  hover:after:w-full
              "
            >
              <span className="z-[1] font-extrabold tracking-[1px]">Empezar</span>
            </Link>
            
            </div>
    )
}