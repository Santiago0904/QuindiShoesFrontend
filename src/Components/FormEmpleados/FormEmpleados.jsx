import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axion";
import { motion } from "framer-motion";

export const FormEmpleados = ({ onSuccess, initialData = null, modo = "agregar" }) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || initialData?.id_usuario || null,
    nombre: initialData?.nombre || "",
    apellido: initialData?.apellido || "",
    telefono: initialData?.telefono || "",
    direccion: initialData?.direccion || "",
    correo: initialData?.correo || "",
    contrasena: "",
    rol: initialData?.rol || "vendedor",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        id: initialData.id || initialData.id_usuario || prev.id,
        nombre: initialData.nombre || "",
        apellido: initialData.apellido || "",
        telefono: initialData.telefono || "",
        direccion: initialData.direccion || "",
        correo: initialData.correo || "",
        rol: initialData.rol || "vendedor",
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = { ...formData };

      if (modo === "actualizar" && !payload.contrasena.trim()) {
        delete payload.contrasena;
      }

      if (modo === "agregar") {
        const backendPayload = {
          nombres: payload.nombre,
          apellidos: payload.apellido,
          telefono: payload.telefono,
          direccion: payload.direccion,
          correo: payload.correo,
          contrasena: payload.contrasena,
          rol: payload.rol,
        };

        await axiosClient.post("/register", backendPayload);
      } else {
        await axiosClient.put(`/empleado/${payload.id}`, payload);
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      setError("Error al guardar empleado.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-3xl bg-white p-10 rounded-3xl shadow-xl border border-gray-200 mx-auto"
    >
      <h2 className="text-3xl font-extrabold text-center text-emerald-700 mb-6 drop-shadow-sm">
        {modo === "agregar" ? "Registro de Empleado" : "Actualizar Empleado"}
      </h2>

      {error && (
        <p className="text-rose-600 text-sm mb-4 text-center font-semibold">
          {error}
        </p>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombres"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 placeholder:text-emerald-400 border-emerald-200 bg-white"
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellidos"
          value={formData.apellido}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 placeholder:text-emerald-400 border-emerald-200 bg-white"
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 placeholder:text-emerald-400 border-emerald-200 bg-white"
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 placeholder:text-emerald-400 border-emerald-200 bg-white"
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 placeholder:text-emerald-400 border-emerald-200 bg-white"
          required
        />
        {modo === "agregar" && (
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 placeholder:text-emerald-400 border-emerald-200 bg-white"
            required
          />
        )}
        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 border-emerald-200 bg-white"
        >
          <option value="vendedor">Vendedor</option>
          <option value="domiciliario">Domiciliario</option>
        </select>

        <motion.button
          type="submit"
          className="w-full inline-flex items-center justify-center
                     bg-emerald-600 hover:bg-emerald-700
                     text-white font-semibold text-lg py-3 rounded-full
                     shadow-lg hover:shadow-xl
                     transform hover:scale-105 transition-all duration-300 ease-out
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
          whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
          whileTap={{ scale: 0.97 }}
        >
          {modo === "agregar" ? "Registrar" : "Guardar"}
        </motion.button>
      </form>
    </motion.div>
  );
};
