import React, { useState } from "react";
import axios from "axios";

export const EmpleadoForm = () => {
  const [empleado, setEmpleado] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    telefono: "",
    rol: "vendedor", // valor por defecto
  });

  const handleChange = (e) => {
    setEmpleado({
      ...empleado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/empleados", empleado)
      .then((res) => {
        alert("Empleado creado correctamente");
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error al crear el empleado:", err);
        alert("Hubo un error al registrar el empleado");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Crear Empleado</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="rol"
          value={empleado.rol}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="vendedor">Vendedor</option>
          <option value="domiciliario">Domiciliario</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Crear Empleado
        </button>
      </form>
    </div>
  );
};
