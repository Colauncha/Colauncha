import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { talentRequest } from "../constants";

const JoinAsTalent = () => {
  return (
    <div className="min-h-screen bg-[#3783FF]" id="join-talent">
      <div className="grid md:grid-cols-2  w-[92%] mx-auto place-content-center py-4 lg:px-20">
        <div className="flex flex-col items-center  lg:items-start lg:w-[400px] sm:pt-16 ">
          <h1 className="uppercase grid place-content-center sm:place-content-start  text-white  text-3xl sm:text-5xl lg:text-[45px]">
            Join as Talent
          </h1>

          <p className="text-center lg:text-start leading-normal py-8 sm:text-[30px] lg:text-[35px] text-3xl text-white">
            Fuel Innovation. Build Tomorrow's MVPs.
          </p>
          <p className="text-center  sm:text-start text-white text-[20px] sm:text-[30px] md:text-[30px] lg:text-[35px]">
            Join a network of talented professionals turning bold ideas into
            real-world impact.
          </p>
          <Link to="/talent-request">
            <Button className="bg-[#FF8C00] mt-10 w-[180px] h-[40px]  text-md font-[600] rounded-xl hover:bg-orange-600">
              <Link to="/talent-request">Make a Request</Link>
            </Button>
          </Link>
        </div>
        <div className="w-full pb-16">
          <img src={talentRequest} alt="" className="w-[470px] lg:w-[600px]" />
        </div>
      </div>
    </div>
  );
};

export default JoinAsTalent;
