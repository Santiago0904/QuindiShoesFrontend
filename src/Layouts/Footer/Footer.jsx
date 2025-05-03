import React from "react";
import { TituloFooter } from "../../Components/TituloFooter/TituloFooter";
import { RedesFooter } from "../../Components/RedesFooter/RedesFooter";
import { FormularioContacto } from "../../Components/FormularioContacto/FormularioContacto";
import { EnlacesFooter } from "../../Components/EnlacesFooter/EnlacesFooter";

export const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-10 px-6 mt-10">
      <TituloFooter />
      <FormularioContacto />
      <RedesFooter />

      <div className="border-t border-gray-700 pt-6 mt-6">
        <EnlacesFooter />
      </div>
    </footer>
  );
};
