import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { ContadorCarritoContext } from "../../Contexts/ContadorCarritoContext";
import { useContext } from "react";

export const Header = () => {
  const { contador } = useContext(ContadorCarritoContext);
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 py-6 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-black text-gray-800">baloo</h1>
        <nav className="hidden md:flex space-x-10 font-semibold text-gray-700">
          <NavLink to="/" className="hover:text-black">Pcruitas</NavLink>
          <NavLink to="/" className="hover:text-black">Eotsacies</NavLink>
          <NavLink to="/" className="hover:text-black">Viodeeades</NavLink>
          <NavLink to="/" className="hover:text-black">Pegcuaias</NavLink>
        </nav>
        <div className="flex items-center space-x-6">
          <NavLink to="/favoritos" className="text-xl text-gray-600 hover:text-pink-400">
            <FaHeart />
          </NavLink>
          <NavLink to="/carrito" className="relative text-2xl text-gray-600 hover:text-green-400">
            <FaShoppingCart />
            {contador > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {contador}
              </span>
            )}
          </NavLink>
          <NavLink to="/perfil" className="text-xl text-gray-600 hover:text-blue-400">
            <FaUser />
          </NavLink>

        </div>
      </div>
    </header>
  );
};
