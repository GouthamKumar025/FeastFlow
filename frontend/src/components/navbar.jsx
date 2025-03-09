import React from "react";
import { replace, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <nav className="bg-gray-900 shadow-lg font-[Poppins]">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className=" flex items-center text-white text-3xl font-bold tracking-wide cursor-pointer font-[Montserrat]">
          <img className="mr-3" src={logo} alt="logo" />
          Feast<span className="text-blue-500">Flow</span>
        </h1>

        <ul className="flex space-x-6 items-center">
          <li
            onClick={() => navigate("/home")}
            className="text-gray-300 hover:text-blue-400 transition duration-300 cursor-pointer text-lg font-semibold"
          >
            Home
          </li>
          <li
            onClick={() => navigate("/about")}
            className="text-gray-300 hover:text-blue-400 transition duration-300 cursor-pointer text-lg font-semibold"
          >
            About
          </li>
          <li
            onClick={() => navigate("/contact")}
            className="text-gray-300 hover:text-blue-400 transition duration-300 cursor-pointer text-lg font-semibold"
          >
            Contact
          </li>
          <li>
            <Button
              onClick={logout}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 shadow-md"
            >
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
