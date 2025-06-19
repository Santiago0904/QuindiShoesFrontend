import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axion";

// Formatea fecha_resena: "YYYY-MM-DD HH:mm:ss" => "DD/MM/YYYY"
function formatearFecha(fechaStr) {
  if (!fechaStr) return "";
  const fecha = new Date(fechaStr.replace(" ", "T"));
  if (isNaN(fecha)) return "";
  const dia = fecha.getDate().toString().padStart(2, "0");
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

function getInicial(nombre) {
  return nombre?.charAt(0)?.toUpperCase() || "?";
}

function showAlert(tipo, mensaje) {
  const color =
    tipo === "success"
      ? "bg-green-200 text-green-800 border-green-400"
      : tipo === "error"
      ? "bg-pink-200 text-pink-800 border-pink-400"
      : "bg-blue-200 text-blue-800 border-blue-400";
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

export default function ResenasProducto({ id_producto, usuario }) {
  const [resenas, setResenas] = useState([]);
  const [nuevaResena, setNuevaResena] = useState("");
  const [nuevaPuntuacion, setNuevaPuntuacion] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [editResena, setEditResena] = useState("");
  const [editPuntuacion, setEditPuntuacion] = useState(0);
  const [editando, setEditando] = useState(false);

  // Cargar reseñas al montar
  const cargarResenas = () => {
    if (id_producto) {
      axiosClient
        .get(`/resenaProducto/producto/${id_producto}`)
        .then((res) => setResenas(res.data))
        .catch(() => setResenas([]));
    }
  };

  useEffect(() => {
    cargarResenas();
    // eslint-disable-next-line
  }, [id_producto]);

  // Enviar nueva reseña
  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!nuevaResena.trim() || !usuario?.id) return;
    setEnviando(true);
    try {
      await axiosClient.post("/resenaProducto/agregar", {
        id_producto,
        id_usuario: usuario.id,
        resena: nuevaResena.trim(),
        puntuacion: nuevaPuntuacion > 0 ? nuevaPuntuacion : undefined,
      });
      setNuevaResena("");
      setNuevaPuntuacion(0);
      cargarResenas();
      showAlert("success", "¡Reseña enviada!");
    } catch {
      showAlert("error", "Ocurrió un error al enviar la reseña.");
    }
    setEnviando(false);
  };

  // Eliminar reseña
  const handleEliminar = async (id_resena) => {
    if (!usuario?.id) return;
    if (!window.confirm("¿Estás seguro de eliminar tu reseña?")) return;
    try {
      await axiosClient.delete("/resenaProducto/eliminar", {
        data: { id_resena, id_usuario: usuario.id },
      });
      cargarResenas();
      showAlert("success", "Reseña eliminada.");
    } catch {
      showAlert("error", "No se pudo eliminar la reseña.");
    }
  };

  // Iniciar edición
  const handleEditar = (r) => {
    setEditandoId(r.id_resena);
    setEditResena(r.resena);
    setEditPuntuacion(r.puntuacion || 0);
    setEditando(true);
  };

  // Guardar edición
  const handleGuardarEdicion = async (id_resena) => {
    if (!usuario?.id || !editResena.trim()) return;
    setEnviando(true);
    try {
      await axiosClient.put("/resenaProducto/actualizar", {
        id_resena,
        id_usuario: usuario.id,
        resena: editResena.trim(),
        puntuacion: editPuntuacion > 0 ? editPuntuacion : undefined,
      });
      setEditandoId(null);
      setEditResena("");
      setEditPuntuacion(0);
      setEditando(false);
      cargarResenas();
      showAlert("success", "¡Reseña actualizada!");
    } catch {
      showAlert("error", "No se pudo actualizar la reseña.");
    }
    setEnviando(false);
  };

  // Cancelar edición
  const handleCancelarEdicion = () => {
    setEditandoId(null);
    setEditResena("");
    setEditPuntuacion(0);
    setEditando(false);
  };

  // Renderiza estrellas para puntuación
  const Estrellas = ({ puntuacion, setPuntuacion, editable = false }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type={editable ? "button" : "button"}
          key={star}
          onClick={editable ? () => setPuntuacion(star) : undefined}
          className={`focus:outline-none ${editable ? "cursor-pointer" : "cursor-default"}`}
          tabIndex={editable ? 0 : -1}
        >
          <svg
            className={`w-5 h-5 ${star <= puntuacion ? "text-yellow-400" : "text-gray-200"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
          </svg>
        </button>
      ))}
      {editable && puntuacion > 0 && (
        <button
          type="button"
          className="ml-2 text-xs text-blue-500 underline"
          onClick={() => setPuntuacion(0)}
        >
          Quitar
        </button>
      )}
    </div>
  );

  return (
    <section className="max-w-2xl mx-auto w-full mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Reseñas de usuarios</h2>

      {/* Formulario para nueva reseña */}
      {usuario && !editando && (
        <form
          onSubmit={handleEnviar}
          className="mb-8 bg-pink-50 p-4 rounded-xl shadow flex flex-col gap-2 border border-pink-200"
        >
          <label className="font-semibold text-gray-700 mb-1">Tu reseña</label>
          <textarea
            className="border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
            rows={3}
            maxLength={500}
            value={nuevaResena}
            onChange={(e) => setNuevaResena(e.target.value)}
            placeholder="Escribe tu experiencia..."
            required
          />
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-600">Tu puntuación:</span>
            <Estrellas puntuacion={nuevaPuntuacion} setPuntuacion={setNuevaPuntuacion} editable />
          </div>
          <button
            type="submit"
            disabled={enviando || !nuevaResena.trim()}
            className={`mt-2 px-6 py-2 rounded-lg font-semibold transition
              ${enviando || !nuevaResena.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-pink-300 text-pink-900 hover:bg-pink-400"}
            `}
          >
            {enviando ? "Enviando..." : "Enviar reseña"}
          </button>
        </form>
      )}

      {/* Listado de reseñas */}
      <div className="flex flex-col gap-4">
        {resenas.length === 0 ? (
          <div className="text-gray-500 text-center py-8 bg-white rounded-xl shadow">
            ¡Sé el primero en dejar una reseña sobre este producto!
          </div>
        ) : (
          resenas.map((r) => (
            <div
              key={r.id_resena}
              className="bg-white rounded-xl shadow p-4 flex flex-col border border-green-100"
            >
              <div className="flex items-center gap-3 mb-1">
                {/* Avatar con inicial */}
                <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center text-pink-700 font-bold text-lg shadow">
                  {getInicial(r.nombre_usuario)}
                </div>
                <span className="font-semibold text-gray-800">{r.nombre_usuario}</span>
                <span className="text-gray-400 text-sm">{formatearFecha(r.fecha_resena)}</span>
                {Number(usuario?.id) === Number(r.id_usuario) && (
                  <div className="ml-auto flex gap-2">
                    <button
                      className="px-3 py-1 rounded-lg font-semibold bg-green-200 text-green-800 border border-green-300 hover:bg-green-300 transition text-sm"
                      onClick={() => handleEditar(r)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg font-semibold bg-pink-200 text-pink-800 border border-pink-300 hover:bg-pink-300 transition text-sm"
                      onClick={() => handleEliminar(r.id_resena)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
              {/* Estrellas */}
              {editandoId === r.id_resena ? (
                <div className="flex items-center mb-1">
                  <Estrellas puntuacion={editPuntuacion} setPuntuacion={setEditPuntuacion} editable />
                </div>
              ) : r.puntuacion ? (
                <div className="flex items-center mb-1">
                  <Estrellas puntuacion={r.puntuacion} setPuntuacion={() => {}} />
                </div>
              ) : null}
              {/* Edición */}
              {editandoId === r.id_resena ? (
                <div className="flex flex-col gap-2 mt-2">
                  <textarea
                    className="border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-300"
                    rows={3}
                    maxLength={500}
                    value={editResena}
                    onChange={(e) => setEditResena(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-1 rounded bg-green-300 text-green-900 font-semibold border border-green-400 hover:bg-green-400 transition"
                      onClick={() => handleGuardarEdicion(r.id_resena)}
                      disabled={enviando || !editResena.trim()}
                    >
                      {enviando ? "Guardando..." : "Guardar"}
                    </button>
                    <button
                      className="px-4 py-1 rounded bg-pink-200 text-pink-800 font-semibold border border-pink-300 hover:bg-pink-300 transition"
                      onClick={handleCancelarEdicion}
                      disabled={enviando}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700">{r.resena}</p>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}