import { Button } from "../components/ui/button";
import Card from "../components/Card";

import { talent } from "../constants";



const Talent = () => {
  return (
    <div className="h-scren w-full lg:mt-20 px-8 pb-10 sm:w-[94%] sm:mx-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl sm:text-4xl">Tech talents</h1>
        <Button className="font-xl sm:text-xl bg-white text-black outline-none shadow-none hover:text-white rounded-md hover:bg-[#3783FF]">
          View all
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 place-items-center mt-20 gap-2">
        {talent.map((data) => {
          return (
            <Card
              key={data.id}
              img={data.img}
              title={data.title}
              buttonColor={data.buttonColor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Talent;
