import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/Components/ui/Navigation-menu";
import { useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/Button";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";

const NavbarOwner = ({ activeTab, setActiveTab, onLogout }) => {
  const [isSideBar, setIsSideBar] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const navLinks = [
    { name: "Tables", tab: "tables" },
    { name: "Menu", tab: "menu" },
    { name: "Orders", tab: "orders" },
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

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/"); // or wherever your login page is
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <div>
      <nav className="relative z-50 mx-auto mt-12 mb-6 flex w-full max-w-7xl items-center justify-between px-6 py-4 font-inter text-sm">
        <div className="flex cursor-pointer items-center gap-2">
          <img className="w-12 h-12" src="/Coffee.png" alt="logo" />
          <p className="text-xl font-semibold">Bistro</p>
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-6">
            {navLinks.map((link) => (
              <NavigationMenuItem className="flex items-start" key={link.name}>
                <NavigationMenuLink asChild>
                  <Link
                    key={link.tab}
                    onClick={() => setActiveTab(link.tab)}
                    className={`text-lg ${
                      activeTab === link.tab ? "text-blue-600" : "text-gray-800"
                    }`}
                  >
                    {link.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:block">
          <Button onClick={() => setShowLogout(true)} variant="outline">
            Logout
          </Button>
          {showLogout && (
            <div className="fixed inset-0 z-[1000] bg-black/30 flex items-center justify-center">
              <div className="bg-white border border-gray-300 rounded shadow-lg p-4  max-w-sm">
                <p className="text-sm mb-2 text-gray-800">
                  Are you sure you want to logout?
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowLogout(false)}
                    className="text-sm px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
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
                <NavigationMenuItem
                  className="flex items-start"
                  key={link.name}
                >
                  <NavigationMenuLink asChild>
                    <button
                      key={link.tab}
                      onClick={() => {
                        setActiveTab(link.tab);
                        setIsSideBar(false);
                      }}
                      className={`text-lg ${
                        activeTab === link.tab
                          ? "text-blue-600"
                          : "text-gray-800"
                      }`}
                    >
                      {link.name}
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Bottom Button */}
          <Button
            onClick={() => setShowLogout(true)}
            className="mt-auto w-full bg-gray-800 text-white"
          >
            Logout
          </Button>
        </div>
      </nav>
      {/* Logout Modal */}
      {showLogout && (
        <div className="fixed inset-0 z-[1000] bg-black/30 flex items-center justify-center">
          <div className="bg-white border border-gray-300 rounded shadow-lg p-4 max-w-sm">
            <p className="text-sm mb-2 text-gray-800">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowLogout(false)}
                className="text-sm px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarOwner;
