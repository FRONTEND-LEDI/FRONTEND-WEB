
import { Link } from 'wouter';

export default function FilterForum(){
    return(
      <div className=' flex col  bg-red-400'>
        <div className=" flex flex-col gap-8 ">
      <button className='hover:bg-amber-600'>
          <Link href="/ClubLectores2022">Antologias 2022</Link>
    </button>
    <button>
          <Link href="/ClubLectores2022">Antologias 2022</Link>
    </button>
    <button>
          <Link href="/ClubLectores2022">Antologias 2022</Link>
   </button>
</div>

</div>
    )
}