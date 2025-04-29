import React from "react";
import { NavLink } from "react-router-dom";

export const Header = (content, route) => {
  return (
    <header className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">QuindiShoes</h1>
        <nav className="space-x-4">
          <NavLink className="hover:underline" to="/Register">Registrarse</NavLink>
          <NavLink className="hover:underline" to="/Login">Iniciar Sesion</NavLink>
        </nav>
      </div>
    </header>
  );
};

