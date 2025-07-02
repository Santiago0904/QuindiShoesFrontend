import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axiosClient from "../../api/axion";
import ModalActualizarEmpleado from "./Modal/Modal"; // Ajusta la ruta si la tienes en otra carpeta

const EmpleadoCard = ({ empleado, onUpdate, onDelete }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-start ">
    <h2 className="text-lg font-bold ">
      {empleado.nombre} {empleado.apellido}
    </h2>
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
  const [mostrarModal, setMostrarModal] = useState(false);
  const [empleadoEditar, setEmpleadoEditar] = useState(null);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = () => {
    axiosClient
      .get("/empleado")
      .then((res) => {
        console.log("Empleados recibidos:", res.data);
        setEmpleados(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar empleados:", err);
        if (err.response?.status === 401) {
          alert("No autorizado. Inicia sesión nuevamente.");
        }
      });
  };

  const handleEliminar = (id) => {
    const token = localStorage.getItem("token");
    axiosClient
      .delete(`/empleado/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => cargarEmpleados())
      .catch((err) => console.error("Error al eliminar empleado:", err));
  };

  const handleActualizar = (empleado) => {
    const empleadoActualizado = {
      id: empleado.id_usuario, 
      nombres: empleado.nombre,
      apellidos: empleado.apellido,
      telefono: empleado.telefono,
      direccion: empleado.direccion,
      correo: empleado.correo,
      rol: empleado.rol,
    };

    setEmpleadoEditar(empleadoActualizado);
    setMostrarModal(true);
  };

  const redirigirFormulario = () => {
    window.location.href = "/Empleados";
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {empleados.map((empleado) => (
          <EmpleadoCard
            key={empleado.id}
            empleado={empleado}
            onUpdate={() => handleActualizar(empleado)}
            onDelete={() => handleEliminar(empleado.id_usuario)}
          />
        ))}

        {mostrarModal && empleadoEditar && (
          <ModalActualizarEmpleado
            empleado={empleadoEditar}
            onClose={() => setMostrarModal(false)}
            onActualizar={cargarEmpleados}
          />
        )}
      </div>

      <button
        onClick={redirigirFormulario}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
        title="Agregar Empleado"
      >
        <FaPlus size={20} />
      </button>
    </>
    
  );
};
