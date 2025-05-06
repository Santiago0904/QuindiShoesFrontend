import React from 'react';
import { FormularioReseña } from '../FormularioReseña/FormularioReseña';

interface Props {
  abierto: boolean;
  cerrar: () => void;
}

export const ModalReseñas: React.FC<Props> = ({ abierto, cerrar }) => {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg relative">
        <button onClick={cerrar} className="absolute top-2 right-4 text-xl">✖</button>
        <h2 className="text-2xl mb-4 font-bold">Escribe tu reseña</h2>
        <FormularioReseña onClose={cerrar} />
      </div>
    </div>
  );
};

