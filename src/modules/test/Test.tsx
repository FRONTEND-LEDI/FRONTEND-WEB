import { useState } from "react"
type dialogPropts ={
    dialog:string
}

export default function Test(){
const [progressTest, setProgressTest]  = useState(false)
    return(
        <div>

<button className="bg-amber-950 font-bold py-4">Omitir</button>
<button className="bg-amber-950 font-bold py-4">Continuar</button>
        </div>
    )
}