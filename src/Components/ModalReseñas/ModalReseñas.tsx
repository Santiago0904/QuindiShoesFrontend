import React, { useState, useEffect } from "react";
import { FormularioResena } from "../FormularioReseña/FormularioReseña";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

interface ModalProps {
  abierto: boolean;
  cerrar: () => void;
  usuario_id?: number;
}

export const ModalReseñas: React.FC<ModalProps> = ({ abierto, cerrar, usuario_id }) => {
  return (
    <>
      {abierto && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 w-full max-w-2xl border border-pink-200 space-y-6 relative">
            <button
              onClick={cerrar}
              className="absolute top-4 right-5 text-xl text-pink-500 hover:text-pink-700"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-green-700">Escribe tu reseña</h2>
            <ListaResenas usuario_id={usuario_id} />
          </div>
        </div>
      )}
    </>
  );
};

export const ListaResenas: React.FC<{ usuario_id?: number }> = ({ usuario_id }) => {
  const [resenas, setResenas] = useState<any[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [mensajeEdit, setMensajeEdit] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [yaTieneResena, setYaTieneResena] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/resena/todas")
      .then((res) => {
        setResenas(res.data);
        const yaTiene = res.data.some((r: any) => r.id_usuario === usuario_id);
        setYaTieneResena(yaTiene);
      })
      .catch(() => setResenas([]));
  }, [usuario_id]);

  const handleEnviar = async () => {
    if (!usuario_id || !mensajeEdit.trim()) return alert("Escribe algo primero.");

    try {
      const fecha_resena = new Date().toISOString().slice(0, 19).replace("T", " ");
      await axios.post("http://localhost:3000/resena/agregar", {
        resena: mensajeEdit,
        fecha_resena,
        id_usuario: usuario_id,
      });
      setResenas((prev) => [
        ...prev,
        {
          id_usuario: usuario_id,
          resena: mensajeEdit,
          nombre: "Tú",
          fecha_resena,
        },
      ]);
      setMensajeEdit("");
      setYaTieneResena(true);
      showAlert("success", "¡Reseña enviada!");
    } catch {
      showAlert("error", "Error al enviar reseña.");
    }
  };

  const handleEditar = (r: any) => {
    setEditandoId(r.id_usuario);
    setMensajeEdit(r.resena);
  };

  const handleGuardar = async (id_usuario: number) => {
    if (!mensajeEdit.trim()) return alert("La reseña no puede estar vacía.");
    setEnviando(true);
    try {
      await axios.put("http://localhost:3000/resena/editar", {
        resena: mensajeEdit,
        id_usuario,
      });
      setResenas((prev) =>
        prev.map((r) =>
          r.id_usuario === id_usuario ? { ...r, resena: mensajeEdit } : r
        )
      );
      setEditandoId(null);
      setMensajeEdit("");
      showAlert("success", "¡Reseña editada correctamente!");
    } catch {
      showAlert("error", "No se pudo editar la reseña.");
    }
    setEnviando(false);
  };

  const handleEliminar = async (id_usuario: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar tu reseña?")) return;
    try {
      await axios.delete(`http://localhost:3000/resena/eliminar/${id_usuario}`);
      setResenas((prev) => prev.filter((r) => r.id_usuario !== id_usuario));
      setYaTieneResena(false);
      setMensajeEdit("");
      setEditandoId(null);
      showAlert("success", "Reseña eliminada.");
    } catch {
      showAlert("error", "Error al eliminar la reseña.");
    }
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setMensajeEdit("");
  };

  const showAlert = (tipo: "success" | "error", mensaje: string) => {
    const color =
      tipo === "success"
        ? "bg-green-200 text-green-800 border-green-400"
        : "bg-pink-200 text-pink-800 border-pink-400";
    const alertDiv = document.createElement("div");
    alertDiv.className = `fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl border shadow-lg text-lg font-semibold transition-all duration-300 ${color}`;
    alertDiv.innerText = mensaje;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.style.opacity = "0";
      setTimeout(() => document.body.removeChild(alertDiv), 400);
    }, 2000);
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-pink-700 mb-4">Reseñas de otros usuarios</h3>
      {!yaTieneResena && usuario_id && (
        <div className="mb-6">
          <FormularioResena mensaje={mensajeEdit} onChange={setMensajeEdit} />
          <button
            className="bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-500"
            onClick={handleEnviar}
          >
            Enviar reseña
          </button>
        </div>
      )}
      {resenas.length === 0 ? (
        <div className="text-gray-400 italic">No hay reseñas aún.</div>
      ) : (
        <ul className="space-y-6 max-h-64 overflow-y-auto pr-2">
          {resenas.map((r) => (
            <li
              key={r.id_usuario}
              className="bg-pink-50 border border-pink-200 p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-pink-800">{r.nombre || "Usuario"}</span>
                <span className="text-xs text-gray-500">
                  {r.fecha_resena && new Date(r.fecha_resena).toLocaleString()}
                </span>
              </div>
              {editandoId === r.id_usuario ? (
                <>
                  <FormularioResena mensaje={mensajeEdit} onChange={setMensajeEdit} />
                  <div className="flex gap-3">
                    <button
                      className="bg-green-300 text-green-900 px-4 py-1 rounded hover:bg-green-400 font-semibold"
                      onClick={() => handleGuardar(r.id_usuario)}
                      disabled={enviando}
                    >
                      {enviando ? "Guardando..." : "Guardar"}
                    </button>
                    <button
                      className="bg-pink-200 text-pink-800 px-4 py-1 rounded hover:bg-pink-300 font-semibold"
                      onClick={handleCancelar}
                      disabled={enviando}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-700">{r.resena}</p>
                  {usuario_id === r.id_usuario && (
                    <div className="flex gap-2 mt-2">
                      <button
                        className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded hover:bg-green-200"
                        onClick={() => handleEditar(r)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-sm text-pink-700 bg-pink-100 px-3 py-1 rounded hover:bg-pink-200 flex items-center gap-1"
                        onClick={() => handleEliminar(r.id_usuario)}
                      >
                        <FaTrash className="text-xs" /> Eliminar
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

