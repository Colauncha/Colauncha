import { FC } from 'react';
import bg from "../assets/clients/clientsays.png";
import { client_1, client_2, client_3 } from "../constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "motion/react"




interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const feedback = [
  {
    id: 1,
    img: client_1,
    name: "Charles Davies",
    testimony:
      "Colauncha helped us bring our vision to life without upfront costs, while our team gained valuable experience",
  },
  {
    id: 2,
    img: client_2,
    name: "Francis Cole",
    testimony:
      "Colauncha provided me the needed space to thrive as a talent. I doubted my skill level before joining as a talent, but now confident",
  },
  {
    id: 3,
    img: client_3,
    name: "Jumoke Bello",
    testimony:
      "Working with Colauncha provided real-world experience I needed to advance my career",
  },
];

const SampleNextArrow: FC<ArrowProps> =(props)=>{
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, background: "skyblue",borderRadius: "100%" }}
      onClick={onClick}
    />
  );
}

const SamplePrevArrow: FC<ArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, background: "skyblue",borderRadius: "100%" }}
      onClick={onClick}
    />
  );
}

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    slidesToShow: 3, // Show 3 slides on desktop
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet view
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full min-h-[80vh] mb-40" id="testimonial-section">
      <div
        className="bg-cover bg-center h-[70vh] flex flex-col  relative "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white  text-center font-bold text-2xl lg:text-4xl m-4 md:text-start md:ml-28"
        >
          CLIENTS TESTIMONY
        </motion.h2>
        <div className="slider-container w-[75%] mx-auto px-4 lg:px-8 relative space-y-60 top-[250px]">
          <Slider {...settings}>
            {feedback.map((item) => (
              <div className="space-y-44"   key={item.id}>
                <div
                  className="flex flex-col gap-[40px] bg-[#ff8c0080] p-4 h-[250px] rounded-3xl border-2 z-10 mt-28 lg:mt-24 "
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={`${item.name}'s feedback`}
                      className="w-12 h-12 rounded-full bg-blue-800"
                    />
                    <p className="text-white text-[18px] font-bold">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-white">{item.testimony}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
