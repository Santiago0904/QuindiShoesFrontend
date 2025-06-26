import React, { useState } from "react";
import axiosClient from "../../api/axion";
import { motion } from "framer-motion";

export const FormEmpleados = ({ onSuccess, initialData = null, modo = "agregar" }) => {
  const [formData, setFormData] = useState(
    initialData || {
      nombre: "",
      apellido: "",
      telefono: "",
      direccion: "",
      correo: "",
      contrasena: "",
      rol: "vendedor",
    }
  );
  const [error, setError] = useState("");

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
      if (modo === "agregar") {
        await axiosClient.post("/register", formData);
      } else {
        await axiosClient.put(`/empleado/${formData.id}`, formData);
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      setError("Error al guardar empleado.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-3xl bg-gray-100 p-10 rounded-3xl shadow-xl border border-pink-100 mx-auto"
    >
      <h2 className="text-3xl font-extrabold text-center text-pink-400 mb-6 drop-shadow-sm">
        {modo === "agregar" ? "Registro de Empleado" : "Actualizar Empleado"}
      </h2>
      {error && (
        <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
      )}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombres"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder:text-pink-400 border-pink-200 bg-white"
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellidos"
          value={formData.apellido}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder:text-pink-400 border-pink-200 bg-white"
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 placeholder:text-green-400 border-green-200 bg-white"
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder:text-pink-400 border-pink-200 bg-white"
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 placeholder:text-green-400 border-green-200 bg-white"
          required
        />
        {modo === "agregar" && (
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder:text-pink-400 border-pink-200 bg-white"
            required
          />
        )}
        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 border-green-200 bg-white"
        >
          <option value="vendedor">Vendedor</option>
          <option value="domiciliario">Domiciliario</option>
        </select>
        <motion.button
          type="submit"
          className="w-full inline-flex items-center justify-center
                     bg-pink-400 hover:bg-pink-500
                     text-white font-semibold text-lg py-3 rounded-full
                     shadow-lg hover:shadow-xl
                     transform hover:scale-105 transition-all duration-300 ease-out
                     focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-75"
          whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
          whileTap={{ scale: 0.97 }}
        >
          {modo === "agregar" ? "Registrar" : "Guardar"}
        </motion.button>
      </form>
    </motion.div>
  );
};

