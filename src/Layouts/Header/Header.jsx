import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { ContadorCarritoContext } from "../../Contexts/ContadorCarritoContext.jsx";

export const Header = () => {
  const { contador } = useContext(ContadorCarritoContext);
  const token = localStorage.getItem("token");
  const estaLogueado = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/Login"; // Redirige al login
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">QuindiShoes</h1>

        <div className="flex items-center space-x-10">
          <nav className="space-x-10">
            {!estaLogueado ? (
              <>
                <NavLink className="hover:underline font-bold text-l" to="/Register">Registrarse</NavLink>
                <NavLink className="hover:underline font-bold text-l" to="/Login">Iniciar Sesión</NavLink>
              </>
            ) : (
              <button onClick={handleLogout} className="hover:underline font-bold text-l text-red-400">
                Cerrar Sesión
              </button>
            )}
          </nav>

          {estaLogueado && (
            <div className="flex space-x-10 text-xl">
              <NavLink to="/favoritos" aria-label="Favoritos">
                <FaHeart className="hover:text-red-400" />
              </NavLink>

              <NavLink to="/carrito" aria-label="Carrito" className="relative">
                <FaShoppingCart className="text-3xl transition" />
                {contador > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {contador}
                  </span>
                )}
              </NavLink>

              <NavLink to="/perfil" aria-label="Perfil">
                <FaUser className="hover:text-blue-400" />
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
