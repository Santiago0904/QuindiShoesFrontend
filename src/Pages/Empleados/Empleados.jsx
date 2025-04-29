import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axiosClient from "../../api/axion"; // Asegúrate que el nombre del archivo esté bien

const EmpleadoCard = ({ empleado, onUpdate, onDelete }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-start">
    <h3 className="text-lg font-bold">{empleado.nombres} {empleado.apellidos}</h3>
    <p>Teléfono: {empleado.telefono}</p>
    <p>Dirección: {empleado.direccion}</p>
    <p>Correo: {empleado.correo}</p>
    <p>Rol: {empleado.rol}</p>
    <div className="flex gap-3 mt-3">
      <button
        onClick={onUpdate}
        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-1"
      >
        <FaEdit /> Actualizar
      </button>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1"
      >
        <FaTrash /> Eliminar
      </button>
    </div>
  </div>
);

export const ListaEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    cargarEmpleados();
  }, []);


  const cargarEmpleados = () => {
    axiosClient
      .get("/empleado")
      .then((res) => setEmpleados(res.data))
      .catch((err) => {
        console.error("Error al cargar empleados:", err);
        if (err.response?.status === 401) {
          alert("No autorizado. Inicia sesión nuevamente.");
        }
      });
  };

  const handleEliminar = (id) => {
    axiosClient
      .delete(`/empleado/${id}`)
      .then(() => cargarEmpleados())
      .catch((err) => console.error("Error al eliminar empleado:", err));
  };

  const handleActualizar = (id) => {
    console.log("Actualizar empleado con ID:", id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {empleados.map((empleado) => (
        <EmpleadoCard
          key={empleado.id}
          empleado={empleado}
          onUpdate={() => handleActualizar(empleado.id)}
          onDelete={() => handleEliminar(empleado.id)}
        />
      ))}
    </div>
  );
};
