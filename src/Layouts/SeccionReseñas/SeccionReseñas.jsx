import { useState } from "react";
import { BotonReseñas } from "../../Components/BotonReseñas/BotonReseñas";
import { ModalReseñas } from "../../Components/ModalReseñas/ModalReseñas";
import { FormularioReseña } from "../../Components/FormularioReseña/FormularioReseña";

export const SeccionReseñas = () => {
  const [mostrar, setMostrar] = useState(false);
  const idUsuario = localStorage.getItem("id");

  return (
    <div className="p-6">
      <BotonReseñas onClick={() => {
      console.log("Click en botón reseñas");
      setMostrar(true);
      }} />

      <ModalReseñas abierto={mostrar} cerrar={() => setMostrar(false)} />
      {idUsuario && (
        <FormularioReseña idUsuario={idUsuario} onPublicado={() => setMostrar(false)} />
      )}
    </div>
  );
};
