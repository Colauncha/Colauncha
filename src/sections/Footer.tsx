import { useEffect } from "react";
import { facebook, instagram, linkedin, scrollup, whatsapp, youtube } from "../constants";
import { Link } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";




const Footer = () => {
  const ScrollToTop =()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

    useEffect(() => {
      ScrollToTop() 
    }, []);

  return (
    <div className="mt-20 relative" id="footer-section">
      <button className="absolute right-10 lg:right-24 top-[-22px] cursor-pointer w-14 h-14" onClick={ScrollToTop}>
        <img src={scrollup} alt="scrollUp_func"  />
      </button>
      <div className="h-[400px] lg:h-[340px] w-full bg-[#facc77]">
        <div className="w-[90%] mx-auto py-24 flex justify-center flex-col gap-16 relative">
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="text-[32px] lg:text-[60px] font-[700]">
              Follow our latest news
            </h2>
            <div className="flex gap-14 items-center">
              <Link
                to="http://www.facebook.com"
                className="rounded-full w-12 h-12 flex items-center justify-center"
              >
                <img src={facebook} alt="" />
              </Link>
              <Link
                to="http://www.youtube.com"
                className="rounded-full w-12 h-12 flex items-center justify-center"
              >
                <img src={youtube} alt="" />
              </Link>
              <Link
                to="http://www.linkedIn.com"
                className="rounded-full w-12 h-12 flex items-center justify-center"
              >
                <img src={linkedin} alt="" />
              </Link>
              <Link
                to="http://www.instagram.com"
                className="rounded-full w-12 h-12 flex items-center justify-center"
              >
                <img src={instagram} alt="" />
              </Link>
              <Link
                to="https://wa.me/+23490356672867"
                className="rounded-full w-12 h-12 flex items-center justify-center"
              >
                <img src={whatsapp} alt="" />
              </Link>
            </div>
          </div>
          <div className="lg:text-xl flex justify-center lg:absolute bottom-10 right-6">
            copyright &copy; 2024 Designed by Colauncha
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
