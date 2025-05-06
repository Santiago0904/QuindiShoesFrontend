import { useState } from "react";
import { BotonReseñas } from "../../Components/BotonReseñas/BotonReseñas";
import { ModalReseñas } from "../../Components/ModalReseñas/ModalReseñas";
import { FormularioReseña } from "../../Components/FormularioReseña/FormularioReseña";

export const SeccionReseñas = () => {
  const [mostrar, setMostrar] = useState(false);
  const idUsuario = localStorage.getItem("id");

  return (
    <div className="p-6">
      <BotonReseñas onClick={() => setMostrar(true)} />

      {/* Mostrar modal solo si mostrar es true */}
      {mostrar && (
        <ModalReseñas onClose={() => setMostrar(false)} />
      )}

      {/* Mostrar formulario solo si hay idUsuario */}
      {idUsuario && mostrar && (
        <FormularioReseña
          idUsuario={parseInt(idUsuario)} // Parseo si lo necesitas como número
          onPublicado={() => setMostrar(false)}
        />
      )}
    </div>
  );
};
