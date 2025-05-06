import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    correo: "",
    contraseña: "",
    rol:"cliente",
  });
  const [mensajeError, setMensajeError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/register", formData);
      console.log("Usuario registrado:", response.data);
      navigate('/Login')
    } catch (error) {
        console.error("Error al registrar usuario:", error);
  const mensaje = error.response?.data?.error || "Error desconocido";
  setMensajeError(mensaje);
      }
  };
  const [errores, setErrores] = useState([]);
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro de Usuario</h2>
      {mensajeError && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
    {mensajeError}
  </div>
)}
      {errores.length > 0 && (
  <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl shadow-sm mb-4">
    <div className="flex items-start space-x-2">
      <svg className="w-5 h-5 mt-1 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z" />
      </svg>
      <div>
        <p className="font-semibold">Por favor corrige los siguientes campos:</p>
        <ul className="mt-1 list-disc list-inside text-sm space-y-1">
          {errores.map((err, i) => (
            <li key={i}><strong>{err.path}:</strong> {err.msg}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}
      <form className="space-y-4">
        <input
          type="text"
          name="nombres"
          placeholder="Nombre"
          value={formData.nombres}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellido"
          value={formData.apellidos}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

