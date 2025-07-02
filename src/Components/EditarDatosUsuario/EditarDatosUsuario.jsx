import React, { useState } from "react";
import { motion } from "framer-motion";
import axiosClient from "../../api/axion";

export default function EditarDatosUsuario({ usuario, onClose, onUpdate }) {
  const [form, setForm] = useState({
    nombre: usuario.nombre || "",
    correo: usuario.correo || "",
    telefono: usuario.telefono || "",
    direccion: usuario.direccion || "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await axiosClient.put("/profile", form);
      setMsg("Datos actualizados correctamente.");
      onUpdate(res.data); // Actualiza el usuario en Perfil.jsx
      setTimeout(onClose, 1200);
    } catch (err) {
      setMsg("Error al actualizar datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-500 hover:text-blue-700 text-2xl font-bold"
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Editar datos</h2>
        <label className="block mb-3">
          Nombre:
          <input name="nombre" value={form.nombre} onChange={handleChange} className="w-full border rounded p-2 mt-1" />
        </label>
        <label className="block mb-3">
          Correo:
          <input name="correo" value={form.correo} onChange={handleChange} className="w-full border rounded p-2 mt-1" />
        </label>
        <label className="block mb-3">
          Teléfono:
          <input name="telefono" value={form.telefono} onChange={handleChange} className="w-full border rounded p-2 mt-1" />
        </label>
        <label className="block mb-6">
          Dirección:
          <input name="direccion" value={form.direccion} onChange={handleChange} className="w-full border rounded p-2 mt-1" />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-600 transition"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
        {msg && <div className="mt-4 text-center text-blue-600">{msg}</div>}
      </motion.form>
    </motion.div>
  );
}