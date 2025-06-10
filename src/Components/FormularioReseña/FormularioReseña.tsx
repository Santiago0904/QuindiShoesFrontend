import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  onClose: () => void;
}

export const FormularioResena: React.FC<Props> = ({ onClose }) => {
  const [mensaje, setMensaje] = useState('');
  const [fecha, setFecha] = useState('');
  const [tieneResena, setTieneResena] = useState(false);
  const [mensajeOriginal, setMensajeOriginal] = useState('');

  const usuario_id_raw = localStorage.getItem('id');
  const usuario_id = usuario_id_raw && !isNaN(Number(usuario_id_raw)) ? Number(usuario_id_raw) : null;

  useEffect(() => {
    if (!usuario_id) return;
    axios.get(`https://quindishoes-backend-3.onrender.com/usuario/${usuario_id}`)
      .then(res => {
        if (res.data?.resena) {
          setMensaje(res.data.resena);
          setMensajeOriginal(res.data.resena);
          setFecha(res.data.fecha_resena || '');
          setTieneResena(true);
        } else {
          setMensaje('');
          setMensajeOriginal('');
          setFecha('');
          setTieneResena(false);
        }
      })
      .catch(() => {
        setMensaje('');
        setMensajeOriginal('');
        setFecha('');
        setTieneResena(false);
      });
  }, [usuario_id]);

  const enviarResena = async () => {
    if (!usuario_id) return alert('Inicia sesión nuevamente.');

    const fecha_resena = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
      await axios.post('https://quindishoes-backend-3.onrender.com/resena/agregar', {
        resena: mensaje,
        fecha_resena,
        id_usuario: usuario_id
      });
      alert('Reseña enviada correctamente');
      setTieneResena(true);
      setMensajeOriginal(mensaje);
      setFecha(fecha_resena);
      onClose();
    } catch (error) {
      console.error(error);
      alert('Error al enviar la reseña');
    }
  };

  const editarResena = async () => {
    if (!usuario_id) return alert('Inicia sesión nuevamente.');
    if (mensaje === mensajeOriginal) return alert('No hiciste cambios en la reseña.');

    const fecha_resena = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
      await axios.put('https://quindishoes-backend-3.onrender.com/resena/editar', {
        resena: mensaje,
        fecha_resena,
        id_usuario: usuario_id
      });
      alert('Reseña editada correctamente');
      setFecha(fecha_resena);
      setMensajeOriginal(mensaje);
      onClose();
    } catch (error) {
      console.error(error);
      alert('Error al editar la reseña');
    }
  };

  const eliminarResena = async () => {
    if (!usuario_id) return alert('Inicia sesión nuevamente.');
    try {
      await axios.delete('https://quindishoes-backend-3.onrender.com/resena/eliminar', {
        data: { id_usuario: usuario_id }
      });
      alert('Reseña eliminada correctamente');
      setMensaje('');
      setMensajeOriginal('');
      setFecha('');
      setTieneResena(false);
      onClose();
    } catch (error) {
      console.error(error);
      alert('Error al eliminar la reseña');
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
      {!tieneResena ? (
        <button
          onClick={enviarResena}
          className="bg-pink-400 text-white py-2 rounded-md hover:bg-pink-500 transition-all"
        >
          Enviar reseña
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={editarResena}
            className="bg-green-400 text-white py-2 px-4 rounded-md hover:bg-green-500 transition-all"
          >
            Editar reseña
          </button>
          <button
            onClick={eliminarResena}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
          >
            Eliminar reseña
          </button>
        </div>
      )}
      {fecha && (
        <div className="text-xs text-gray-500">
          Última edición: {new Date(fecha).toLocaleString()}
        </div>
      )}
    </div>
  );
};
