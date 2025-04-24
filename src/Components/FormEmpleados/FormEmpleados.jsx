import React, { useState } from "react";
import axios from "axios";

export const FormEmpleados = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    correo: "",
    contraseña: "",
    rol:"Empleado",
  });

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
      console.log("Empleado registrado:", response.data);
  
    } catch (error) {
      console.error("Error al registrar Empleado:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro de Empleados</h2>
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

        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="vendedor">Vendedor</option>
          <option value="domiciliario">Domiciliario</option>
        </select>
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

