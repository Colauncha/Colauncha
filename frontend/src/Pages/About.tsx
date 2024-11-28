import { about1, about2, about3 } from "../constants"



const About = () => {
 
  return (
  <>
  
  <div className='min-h-screen w-full'>
      <div className="w-[90%] mx-auto pt-28 flex flex-col justify-center items-center gap-16">
         <div className="text-center mb-6">
         <h1 className="text-3xl font-bold lg:text-5xl">About Us</h1>
         <p className="text-xl ">We empower startups with the right talents</p>
         </div>
         <div className="w-full flex flex-col lg:flex-row gap-4 mb-6 justify-center items-center">
         <img src={about3} alt=""className="w-[350px] h-[418x] rounded-md" />
          <img src={about2} alt="" className=" w-[350px] lg:w-[320px] h-[323px] rounded-md"/>
          <img src={about1} alt="" className="w-[350px] h-[418x] rounded-md" />
         

         </div>
        
         <div className="text-center mb-8 w-2/3">
          <h1  className="text-3xl font-bold lg:text-5xl">Our Mission</h1>
          <p className="text-xl "> To build a sustainable bridge between talented tech professionals and the startups that need them, empowering both sides to grow and succeed </p>
         </div>
         <div className="text-center mb-12 w-2/3">
          <h1  className="text-3xl font-bold lg:text-5xl">Our Vision</h1>
          <p className="text-xl ">To become the leading talent marketplace for tech startups, fostering innovation and growth through affordable, sustainable talent solutions</p>
         </div>
      </div>
    </div>


  </>
  )
}

export default About