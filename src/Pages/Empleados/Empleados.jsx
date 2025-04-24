import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, PencilLine, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/empleados")
      .then(response => {
        setEmpleados(response.data);
      })
      .catch(error => {
        console.error("Error al obtener empleados:", error);
      });
  }, []);

  const handleEliminar = (id) => {
    axios.delete(`http://localhost:3000/empleados/${id}`)
      .then(() => {
        setEmpleados(prev => prev.filter(emp => emp.id !== id));
      })
      .catch(error => {
        console.error("Error al eliminar empleado:", error);
      });
  };

  const handleActualizar = (id) => {
    navigate(`/editarEmpleado/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Empleados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {empleados.map((empleado) => (
          <div key={empleado.id} className="bg-white p-4 rounded-xl shadow-md relative">
            <h3 className="text-lg font-semibold">{empleado.nombre} {empleado.apellido}</h3>
            <p><strong>Correo:</strong> {empleado.correo}</p>
            <p><strong>Rol:</strong> {empleado.rol}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleActualizar(empleado.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md flex items-center gap-1"
              >
                <PencilLine size={16} /> Actualizar
              </button>
              <button
                onClick={() => handleEliminar(empleado.id)}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md flex items-center gap-1"
              >
                <Trash2 size={16} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/nuevoEmpleado")}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg flex items-center gap-2"
      >
        <PlusCircle size={20} /> Agregar empleado
      </button>
    </div>
  );
};
