import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  onClose: () => void;
}

export const FormularioReseña: React.FC<Props> = ({ onClose }) => {
  const [mensaje, setMensaje] = useState('');
  const usuario_id = localStorage.getItem('id'); // Ajusta según tu método de autenticación

  const enviarReseña = async () => {
    try {
      const fecha = new Date().toISOString();

      await axios.post('http://localhost:3000/resenas/agregar', {
        mensaje: mensaje,
        fecha: new Date().toISOString().slice(0, 10),
        usuario_id: usuario_id
      });

      alert('Reseña enviada correctamente');
      setMensaje('');
      onClose();

      console.log('📤 Enviando reseña:', {
        mensaje: mensaje,
        fecha: new Date().toISOString().slice(0, 10),
        usuario_id: usuario_id
      });
    } catch (error) {
      console.error(error);
      alert('Error al enviar la reseña');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        className="border border-gray-300 p-3 rounded-md text-black"
        rows={4}
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe tu reseña aquí..."
      />
      <button
        onClick={enviarReseña}
        className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Enviar reseña
      </button>
    </div>
  );
};
