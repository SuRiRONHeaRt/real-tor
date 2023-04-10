import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //*toggle sign in option in header to profile
  const [toggleToProfile, setToggleToProfile] = useState("Sign In");

  //*toggle dynamic sign in to profile text and vise versa
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setToggleToProfile("Profile");
      } else {
        setToggleToProfile("Sign In");
      }
    });
  }, [auth]);

  const pathMatchRoute = (route: string) => {
    return route === location.pathname ? true : false;
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] 
              border-b-transparent ${
                pathMatchRoute("/") && "text-gray-900 border-b-red-600"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] 
              border-b-transparent ${
                pathMatchRoute("/offers") && "text-gray-900 border-b-red-600"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] 
              border-b-transparent ${
                pathMatchRoute("/sign-in") ||
                (pathMatchRoute("/profile") && "text-gray-900 border-b-red-600")
              }`}
              onClick={() => navigate("/profile")}
            >
              {toggleToProfile}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
