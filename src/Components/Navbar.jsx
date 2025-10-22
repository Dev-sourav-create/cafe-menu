import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/Navigation-menu";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isSideBar, setIsSideBar] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", scrollTo: "features" },
    { name: "Feedback", path: "/feedback" },
  ];

  useEffect(() => {
    const handleclickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSideBar(false);
      }
    };

    if (isSideBar) {
      document.addEventListener("mousedown", handleclickOutside);
    } else {
      document.removeEventListener("mousedown", handleclickOutside);
    }

    return () => document.removeEventListener("mousedown", handleclickOutside);
  });
  const handleFeatureClick = (e) => {
    e.preventDefault();
    console.log("h");

    if (location.pathname === "/") {
      const section = document.getElementById("features");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="relative z-50 mx-auto mt-12 flex w-full max-w-7xl items-center justify-between px-6 py-4 font-inter text-sm">
      <div className="flex cursor-pointer items-center gap-2 hover:scale-105 transform transition-transform duration-300 ease-in-out">
        <img className="w-12 h-12" src="/Coffee.png" alt="logo" />
        <p className="text-xl font-semibold">Bistro</p>
      </div>

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="flex gap-6">
          {navLinks.map((link) => (
            <NavigationMenuItem className="flex items-start" key={link.name}>
              <NavigationMenuLink asChild>
                {link.scrollTo ? (
                  <Link
                    to="/"
                    className="text-gray-800 text-lg"
                    onClick={(e) => {
                      handleFeatureClick(e);
                      setIsSideBar(false);
                    }}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    to={link.path}
                    className="text-gray-800 text-lg"
                    onClick={() => setIsSideBar(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden md:block">
        <Button onClick={() => navigate("/Login")} variant="outline">
          Login
        </Button>
      </div>

      <button
        className="md:hidden text-gray-800 z-[60]"
        onClick={() => setIsSideBar(!isSideBar)}
      >
        {isSideBar ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 flex flex-col justify-between border-l border-gray-200 p-6 
      transform transition-transform duration-300 ease-in-out
      ${isSideBar ? "translate-x-0" : "translate-x-full"}
    `}
      >
        {/* Menu items */}
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col items-start space-y-4">
            {navLinks.map((link) => (
              <NavigationMenuItem className="flex items-start" key={link.name}>
                <NavigationMenuLink asChild>
                  {link.scrollTo ? (
                    <Link
                      to="/"
                      className="text-gray-800 text-lg"
                      onClick={(e) => {
                        handleFeatureClick(e);
                        setIsSideBar(false);
                      }}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      to="/"
                      className="text-gray-800 text-lg"
                      onClick={() => setIsSideBar(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Bottom Button */}
        <Button
          onClick={() => navigate("/Login")}
          className="mt-auto w-full bg-gray-800 text-white"
        >
          Login
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
