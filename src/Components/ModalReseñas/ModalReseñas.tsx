import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormularioResena } from "../FormularioReseña/FormularioReseña";
import axios from "axios";

export const ListaResenas: React.FC<{ usuario_id?: number }> = ({ usuario_id }) => {
  const [resenas, setResenas] = React.useState<any[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [mensajeEdit, setMensajeEdit] = useState("");
  const [enviando, setEnviando] = useState(false);

  React.useEffect(() => {
    axios.get("http://localhost:3000/resena/todas")
      .then(res => setResenas(res.data))
      .catch(() => setResenas([]));
  }, []);

  const handleEditar = (r: any) => {
    setEditandoId(r.id_usuario);
    setMensajeEdit(r.resena);
  };

  const handleGuardar = async (id_usuario: number) => {
    if (!mensajeEdit.trim()) {
      alert("La reseña no puede estar vacía.");
      return;
    }
    setEnviando(true);
    try {
      await axios.put("http://localhost:3000/resena/editar", {
        resena: mensajeEdit,
        id_usuario
      });
      setResenas(resenas.map(r =>
        r.id_usuario === id_usuario ? { ...r, resena: mensajeEdit } : r
      ));
      setEditandoId(null);
      setMensajeEdit("");
      showAlert("success", "¡Reseña editada correctamente!");
    } catch {
      showAlert("error", "No se pudo editar la reseña.");
    }
    setEnviando(false);
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setMensajeEdit("");
  };

  function showAlert(tipo: "success" | "error", mensaje: string) {
    const color =
      tipo === "success"
        ? "bg-green-200 text-green-800 border-green-400"
        : "bg-pink-200 text-pink-800 border-pink-400";
    const alertDiv = document.createElement("div");
    alertDiv.className =
      `fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl border shadow-lg text-lg font-semibold transition-all duration-300 ${color}`;
    alertDiv.innerText = mensaje;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.style.opacity = "0";
      setTimeout(() => document.body.removeChild(alertDiv), 400);
    }, 2000);
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-pink-700 mb-2">Reseñas de otros usuarios</h3>
      {resenas.length === 0 ? (
        <div className="text-gray-400 italic">No hay reseñas aún.</div>
      ) : (
        <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
          {resenas.map((r) => (
            <li key={r.id_usuario} className="bg-pink-50 border-l-4 border-pink-300 p-3 rounded shadow">
              <div className="font-bold text-pink-800">{r.nombre || 'Usuario'}</div>
              {editandoId === r.id_usuario ? (
                <div>
                  <textarea
                    className="border border-pink-300 rounded-md p-2 w-full mb-2"
                    rows={3}
                    value={mensajeEdit}
                    onChange={e => setMensajeEdit(e.target.value)}
                    disabled={enviando}
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-green-300 text-green-900 px-4 py-1 rounded font-semibold hover:bg-green-400 transition"
                      onClick={() => handleGuardar(r.id_usuario)}
                      disabled={enviando}
                    >
                      {enviando ? "Guardando..." : "Guardar"}
                    </button>
                    <button
                      className="bg-pink-200 text-pink-800 px-4 py-1 rounded font-semibold hover:bg-pink-300 transition"
                      onClick={handleCancelar}
                      disabled={enviando}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-gray-700">{r.resena}</div>
                  {usuario_id === r.id_usuario && (
                    <button
                      className="mt-2 text-xs bg-green-200 text-green-800 px-3 py-1 rounded hover:bg-green-300 transition"
                      onClick={() => handleEditar(r)}
                    >
                      Editar
                    </button>
                  )}
                </>
              )}
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