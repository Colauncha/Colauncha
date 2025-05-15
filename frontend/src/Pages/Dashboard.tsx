import { Link,useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { placehold } from "../constants";
import { useAuth } from "../Context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout} = useAuth();

  const handleLogout = ()=>{
      navigate("/")
      logout()
  }
  return (
    <div className="min-h-screen w-full">
      <div className="w-[75%] mx-auto flex flex-col mt-28 gap-10 items-center justify-center ">
        <h1 className="font-semibold text-2xl">Welcome to Colauncha</h1>
        <p>Colaucha's Dashboard helps manage your queries</p>
        <div className="flex flex-col lg:flex-row gap-20">
          <aside className="flex flex-col items-center justify-center gap-4">
            <Button className="bg-red-400 hover:bg-red-500" onClick={handleLogout}>logout</Button>
            <img
              src={placehold}
              alt=""
              className="w-40 h-40 rounded-full border"
            />
          </aside>
          <main className="flex flex-col gap-10  border p-4 rounded-md">
            <div className="flex gap-20 items-start justify-center">
              <div className="">
                <Button className="bg-blue-700 hover:bg-blue-400">
                  <Link to="/talent-request">Join as a Talent</Link>
                </Button>
                <p className="w-36 text-[12px] text-justify">
                  Talents can join Colauncha Team via this route
                </p>
              </div>
              {/* <div className="">
                <Button className="bg-green-600 hover:bg-green-300">
                  <Link to="/project-request">Request for Talents</Link>
                </Button>
                <p className="w-36 text-[12px] text-justify">
                  Project owners and founders can requests for talents and as
                  well asks for Colauncha's team to Build their project(s)
                </p>
              </div> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
