import React from "react";
import { TituloFooter } from "../../Components/TituloFooter/TituloFooter";
import { RedesFooter } from "../../Components/RedesFooter/RedesFooter";
import { FormularioContacto } from "../../Components/FormularioContacto/FormularioContacto";
import { EnlacesFooter } from "../../Components/EnlacesFooter/EnlacesFooter";
import { SeccionReseñas } from "../SeccionReseñas/SeccionReseñas";

export const Footer = () => {
  return (
   <footer className="bg-[#fef6f9] text-[#4a4a4a] pt-14 pb-6 px-6 md:px-0 font-sans">
  {/* Bloque superior con Newsletter / Logo / Contacto */}
  <div className="max-w-7xl mx-auto flex  gap-12">
    {/* Newsletter */}
    <div className="flex-1 min-w-[280px] max-w-sm">
      <TituloFooter />
      <FormularioContacto />
    </div>

    {/* Logo y lema */}
    <div className="flex-1 min-w-[280px] max-w-sm flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-3">
        <svg className="w-14 h-14 animate-float" viewBox="0 0 64 64" fill="none">
          <path d="M10 30 L54 10 L40 54 L32 32 Z" fill="#d68ba0" opacity="0.9" />
        </svg>
        <span className="text-3xl font-bold tracking-wide text-[#b65775]">QuindiShoes</span>
      </div>
      <p className="text-[#7d7d7d] text-sm text-center">
        El diseño atemporal encuentra su camino en cada paso que das.
      </p>
    </div>

    {/* Redes y contacto */}
    <div className="flex-1 min-w-[280px] max-w-sm flex flex-col items-center md:items-end justify-center gap-4">
      <RedesFooter />
      <div className="text-[#7d7d7d] text-sm text-center md:text-right">
        <p>Calle Principal 123</p>
        <p>+57 3135874697</p>
        <p>QuindiShoes@gmail.com</p>
      </div>
    </div>
  </div>

  {/* Enlaces inferiores */}
  <div className="max-w-7xl mx-auto mt-14 flex flex-wrap justify-between gap-10 text-sm text-[#7d7d7d]">
    {[
      { title: "Empresa", links: ["Sobre nosotros", "Blog", "Carreras"] },
      { title: "Soporte", links: ["Centro de ayuda", "Envíos", "Pagos"] },
      { title: "Legal", links: ["Política de privacidad", "Términos de uso"] },
      { title: "Extras", links: ["Afiliados", "Novedades", "Descuentos"] },
    ].map((col, i) => (
      <div key={i} className="min-w-[180px]">
        <h4 className="font-semibold text-[#b65775] mb-2">{col.title}</h4>
        <ul className="space-y-1">
          {col.links.map((link) => (
            <li key={link} className="hover:text-[#c72c5e] transition">{link}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>

  {/* Línea inferior */}
  <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#f3d5da] flex flex-col md:flex-row justify-between items-center text-xs text-[#999] gap-3">
    <span>&copy; {new Date().getFullYear()} QuindiShoes. Todos los derechos reservados.</span>
    <div className="flex gap-4">
      <span className="hover:text-[#c72c5e] cursor-pointer">Política de privacidad</span>
      <span className="hover:text-[#c72c5e] cursor-pointer">Términos</span>
    </div>
  </div>

  <style>
    {`
      .animate-float {
        animation: float 2.5s ease-in-out infinite;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
    `}
  </style>
</footer>

  );
};
