import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { hero_logo } from "../constants";

const Hero = () => {
  return (
    <div className="w-full lg:h-screen min-h-screen mt-6" id="hero-section">
      <div className=" w-[75%] sm:w-[80%] pt-40 lg:pt-24 grid lg:grid-cols-2 mx-auto ">
        <div className="flex flex-col items-center lg:items-start  justify-center lg:justify-start gap-3 border-red-500">
          <div>
            <h1 className="font-extrabold text-[45px] lg:text-[50px] lg:w-[500px] leading-normal text-center lg:text-start pt-30 ">
              Build Your MVP in 3 Months, Zero Upfront Cost
            </h1>
            <p className="text-2xl text-center lg:w-[300px] lg:text-start lg:my-6 lg:text-3xl">
              Empowering founders with a team of experts to bring your vision to
              life.
            </p>
          </div>

          <div className="">
            <Button className="w-[180px] h-[40px]  text-md font-[600] rounded-xl bg-[#3783ff] hover:bg-blue-600">
              <Link to="/dashboard">Get your team now</Link>
            </Button>
          </div>
        </div>

        <div className="my-12 lg:my-0 flex justify-center">
          <img
            src={hero_logo}
            alt="hero_img"
            className="w-full sm:w-[100%] h-auto md:w-[600px] "
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
