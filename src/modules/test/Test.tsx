import { useState } from "react"
type DialogProps = {
  dialog: string;
};

const dialog: DialogProps[] = [
  { dialog: "Hola, soy tu bibliotecario virtual personal!" },
  { dialog: "Si gustás te realizaré unas series de preguntas que me ayudarán a darte una mejor experiencia." },
  { dialog: "Elegí al menos 3 opciones de tu género favorito" },
  { dialog: "Elegí al menos 3 opciones de tu formato de libro favorito" },
  { dialog: "¡Elegí tu avatar!" }
];


export default function Test(){
const [progressetps, setProgressSteps]  = useState(0)
    return(
        <div>
<div>
<ul className="steps steps-vertical lg:steps-horizontal">
  <li className="step step-primary">1</li>
  <li className="step step-primary">2</li>
  <li className="step">3</li>
  <li className="step">4</li>
  <li className="step">5</li>
  {
    (progressetps == 1)? <h1>Hola</h1> : <h1>CHau</h1> 
  }
</ul>
    <button className="bg-primary text-white font-bold py-4">Omitir</button>
</div>
<div>
<div>
 <img src="/zorro-login.png" alt="" />
</div>
 <div className="chat-bubble">{dialog[progressetps].dialog}</div>
</div>
<button onClick={() => setProgressSteps(dialog.length - 1)}>Omitir</button>
<button onClick={() => setProgressSteps(progressetps + 1)} className="bg-primary text-white font-bold py-4">Continuar</button>
        </div>
    )
}