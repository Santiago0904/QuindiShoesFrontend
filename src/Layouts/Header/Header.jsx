import React from "react";
import { NavLink } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">QuindiShoes</h1>
        <div className="flex items-center space-x-10">
          <nav className="space-x-10">
            <NavLink className="hover:underline font-bold text-l" to="/Register">Registrarse</NavLink>
            <NavLink className="hover:underline font-bold text-l" to="/Login">Iniciar Sesión</NavLink>
          </nav>
          <div className="flex space-x-10 text-xl">
            <NavLink to="/favoritos" aria-label="Favoritos">
              <FaHeart className="hover:text-red-400" />
            </NavLink>
            <NavLink to="/carrito" aria-label="Carrito">
              <FaShoppingCart className="hover:text-yellow-400" />
            </NavLink>
            <NavLink to="/perfil" aria-label="Perfil">
              <FaUser className="hover:text-blue-400" />
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
