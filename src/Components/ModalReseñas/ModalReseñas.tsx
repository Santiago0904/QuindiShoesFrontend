import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormularioResena } from '../FormularioReseña/FormularioReseña';
import axios from 'axios';

const ListaResenas: React.FC = () => {
  const [resenas, setResenas] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get('http://localhost:3000/resena/todas')
      .then(res => setResenas(res.data))
      .catch(() => setResenas([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-pink-700 mb-2">Reseñas de otros usuarios</h3>
      {loading ? (
        <div className="text-gray-500">Cargando reseñas...</div>
      ) : resenas.length === 0 ? (
        <div className="text-gray-400 italic">No hay reseñas aún.</div>
      ) : (
        <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
          {resenas.map((r) => (
            <li key={r.id_usuario} className="bg-pink-50 border-l-4 border-pink-300 p-3 rounded shadow">
              <div className="font-bold text-pink-800">{r.nombre || 'Usuario'}</div>
              <div className="text-gray-700">{r.resena}</div>
              <div className="text-xs text-gray-500 mt-1">
                {r.fecha_resena && <>Fecha: {new Date(r.fecha_resena).toLocaleString()}</>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface Props {
  abierto: boolean;
  cerrar: () => void;
}

export const ModalReseñas: React.FC<Props> = ({ abierto, cerrar }) => {
  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xl relative border-2 border-pink-200"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
          >
            <button
              onClick={cerrar}
              className="absolute top-2 right-4 text-xl text-pink-500 hover:text-pink-700"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-green-700 mb-4">Escribe tu reseña</h2>
            <FormularioResena onClose={cerrar} />
            <ListaResenas />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};