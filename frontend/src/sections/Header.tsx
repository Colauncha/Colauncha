import logo from "../constants"
import { FaBarsStaggered } from "react-icons/fa6"
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { CiFacebook, CiInstagram, CiLinkedin, CiTwitter} from "react-icons/ci";





const Header: React.FC = (): JSX.Element => {
    const menu = [{to: "/", label:"Home"},{to: "/about", label:"About Us"},{to: "/our-team", label:"Our Team"},{to: "/contact", label:"Contact Us"}]
    const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth < 720);
    const [MobileMenu, setMobileMenu]= useState<boolean>(false);

    const handleMobileClick = (): void => {
    setMobileMenu((mobile)=>!mobile)
    };

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobileView(window.innerWidth < 720);
    };

    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    
  return (
    <div className="relative">
    <div className="w-full h-h-screen bg-[#3783FF] py-4 fixed top-0 left-0 z-20 ">
        {isMobileView ?  
        // Mobile Mode
        <div className="w-full flex items-center px-4 justify-between sm:w-[80%] mx-auto relative">
            <div className="cursor-pointer">
            <Link to="/">
                <img src={logo} alt="colauncha_logo" />
                </Link>
            </div>
           {MobileMenu && (
             <div className="w-full h-screen flex flex-col flex-1 gap-6  items-start px-8  py-28 sm:px-20 list-none inset-0 fixed top-[3.8rem] left-0 bg-[#3783ff] z-[10]">
             <>
             {menu.map(({to, label}) =>{
                 return(
                    <>
                     <li key={label} className="text-xl font-bold text-white cursor-pointer hover:underline underline-offset-4 transition-all " onClick={handleMobileClick}>
                        <Link to={to}
                        >{label}
                        </Link>
                      
                     </li>
                    </>
                 )
             })}
             <div className="w-[85%] border-t-[1px] absolute bottom-16 ">
                <div className="flex gap-4 py-4">
                    <Link to="https://www.linkedin.com/company/colauncha/" target="_blank" rel="noopener noreferrer">
                        <CiFacebook size={25} color="white"/>
                    </Link>
                    <Link to="https://web.facebook.com/profile.php?id=61561301576621" target="_blank" rel="noopener noreferrer">
                        <CiTwitter size={25} color="white"/>
                    </Link>
                    <Link to="https://x.com/colauncha" target="_blank" rel="noopener noreferrer">
                        <CiInstagram size={25} color="white"/>
                    </Link>
                    <Link to="https://www.instagram.com/colauncha/" target="_blank" rel="noopener noreferrer">
                        <CiLinkedin size={25} color="white"/>
                    </Link>
                </div>
             </div>
             </>
         </div>
           )}
           <div className="flex items-center gap-x-4">
           <div>
                <Button className="text-[#3783FF] w-28 bg-white rounded-xl hover:bg-blue-700 hover:text-white">
                <Link to="/project-request">
                    Get Started
                    </Link> 
                </Button>
            </div>
            <div className="bars cursor-pointer">
            { MobileMenu ? <X size={28} color="white"  onClick={handleMobileClick} />: <FaBarsStaggered size={28} color="white"  onClick={handleMobileClick}/>}
            </div>
           </div>
        </div>  : 
        // Desktop Mode
        <div className="w-full flex items-center pr-4 justify-between sm:w-[90%] mx-auto">
            <div className="cursor-pointer">
                <Link to="/">
                <img src={logo} alt="colauncha_logo" />
                </Link>
            </div>
            <div className="custom flex flex-col sm:flex-row list-none sm:gap-8">
            {menu.map(({to, label}) =>{
                 return(
                     <li key={label} className="text-lg text-white cursor-pointer">
                        <NavLink to={to}
                        >{label}</NavLink>
                     </li>
                 )
             })}
            </div>
            
            <div>
                <Button className="text-[#3783FF] w-28 bg-white rounded-xl hover:bg-blue-700 hover:text-white">
                    <Link to="/project-request">
                    Get Started
                    </Link> 
                </Button>
            </div>
         
        </div>}
       
    </div>
    </div>
  )
  
}

export default Header;