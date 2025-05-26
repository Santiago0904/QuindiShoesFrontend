import React from "react";
import { TituloFooter } from "../../Components/TituloFooter/TituloFooter";
import { RedesFooter } from "../../Components/RedesFooter/RedesFooter";
import { FormularioContacto } from "../../Components/FormularioContacto/FormularioContacto";
import { EnlacesFooter } from "../../Components/EnlacesFooter/EnlacesFooter";
import { SeccionReseñas } from "../SeccionReseñas/SeccionReseñas";

export const Footer = () => {
  return (
    <footer className="bg-[#23292e] text-white pt-10 pb-4 px-4 md:px-0">
      {/* Sección de Reseñas
      <div className="max-w-6xl mx-auto">
        <SeccionReseñas />
      </div> */}

      {/* Newsletter y Logo */}
      <div className="max-w-6xl mx-auto mt-10 flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-0">
        {/* Newsletter */}
        <div className="flex-1 flex items-center justify-center md:justify-start">
          <div className="w-full max-w-md border border-gray-500 rounded-xl p-8 shadow-lg">
            <TituloFooter />
            <FormularioContacto />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:flex items-center px-8">
          <div className="h-40 border-l border-gray-600"></div>
        </div>

        {/* Logo */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <svg
                className="w-16 h-16 animate-float"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 30 L54 10 L40 54 L32 32 Z"
                  fill="#fff"
                  opacity="0.8"
                />
              </svg>
              <span className="text-3xl font-bold tracking-wide">QuindiShoes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enlaces, Redes y Contacto */}
      <div className="max-w-6xl mx-auto mt-10 border-t border-gray-700 pt-8 flex flex-col md:flex-row gap-8">
        {/* Enlaces organizados como en el diseño */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-2 gap-8 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Empresa</h4>
            <ul className="space-y-1">
              <li>Recursos</li>
              <li>Soporte</li>
              <li>Legal</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">About</h4>
            <ul className="space-y-1">
              <li>Soporte</li>
              <li>Legal</li>
            </ul>
          </div>
        </div>

        {/* Redes y contacto */}
        <div className="flex-1 flex flex-col md:items-end gap-4 text-sm">
          <RedesFooter />
          <div className="text-gray-300 mt-2">
            <div>Calle Principal 123</div>
            <div>+34 91 123 45 67</div>
            <div>info@example.com</div>
          </div>
        </div>
      </div>

      {/* Políticas abajo */}
      <div className="max-w-6xl mx-auto mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-2">
        <span>Política de Privacidad</span>
        <span className="hidden md:inline-block border-l border-gray-600 h-4 mx-4"></span>
        <span>Términos de Privacidad</span>
      </div>

      {/* Animación del logo */}
      <style>
        {`
          .animate-float {
            animation: float 2.5s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </footer>
  );
};
