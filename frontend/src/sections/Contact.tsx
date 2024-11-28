import phone_icon from "../assets/icons/phone_icon.png";
import mail_icon from "../assets/icons/mail_icon.png";
import { Link } from "react-router-dom";
import { whatsapp } from "../constants";

const Contact = () => {
  return (
    <div
      className="min-h-[476px] w-full py-28 bg-[#ff8c00b5]"
      id="contact-section mt-[100vh] "
    >
      <div className="w-[90%] mx-auto">
        <h2 className="text-[25px] lg:text-[38px] font-bold">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-10 lg:gap-24 relative">
          <div className="bg-[#f7f5bc] lg:w-full xl:w-[600px] lg:h-[260px] rounded-[20px] py-20 px-10 place-content-center">
            <p className="text-[20px]">
              Stay updated with the latest news, resources, and events. Get
              insightful articles, tips, and more delivered to your inbox.
            </p>
          </div>
          <div className=" hidden lg:block lg:absolute lg:top-20 lg:left-[calc(100%-40rem)] bg-blue-500 rounded-full">
            <Link
              to="https://wa.me/+2347084274918"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full w-28 h-28 flex items-center justify-center"
            >
              <img src={whatsapp} alt="whatsapp" />
            </Link>
          </div>
          <div className="bg-[#f7f5bc] lg:w-full lg:h-[260px] rounded-[20px] py-16 px-8 md:px-12 flex flex-col">
            <div className="flex flex-col">
              <h2 className="text-center text-[24px] font-[600]">Call Us</h2>
              <div className="flex gap-28 items-center md:gap-10 lg:gap-28">
                <img src={phone_icon} alt="" />
                <h2 className="text-center text-[16px] font-[600]">
                  +234 7084274918
                </h2>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-center text-[24px] font-[600]">Email</h2>
              <div className="flex gap-28 items-center md:gap-10 lg:gap-28">
                <img src={mail_icon} alt="" />
                <h2 className="text-center text-[16px] font-[600]">
                  Colauncha@gmail.com
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
