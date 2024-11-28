import Card from "../components/Card"
import { mvp } from "../constants"



const Mvp = () => {

  return (
   <div className="">
    <div className="w-[90%] lg:w-[85%] mx-auto min-h-[70vh]">
        <div className="text-2xl lg:text-4xl py-14">MVPs</div>
    <div className="grid sm:grid-col-2 md:grid-cols-3 lg:grid-col-4 gap-6">
      {mvp.map((info)=>{
        return(
        <>
         <li key={info.id}>
           <Card  title={info.title} img={info.img} body={info.body}/>
         </li>
         <li key={info.id}>
           <Card  title={info.title} img={info.img} body={info.body}/>
         </li>
         <li key={info.id}>
           <Card  title={info.title} img={info.img} body={info.body}/>
         </li>
        </>
        )
      })}
    </div>
    </div>
   </div>
  )
}

export default Mvp