import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import axiosClient from "../../api/axion";
import ModalActualizarEmpleado from "./Modal/Modal";
import { FormEmpleados } from "../../Components/FormEmpleados/FormEmpleados";

// Componente de una tarjeta individual del empleado
const EmpleadoCard = ({ empleado, onUpdate, onDelete }) => {
  const inicial = empleado.nombre?.charAt(0)?.toUpperCase() || "?";

  const confirmarEliminar = () => {
    Swal.fire({
      title: "¿Eliminar empleado?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E53935",
      cancelButtonColor: "#9e9e9e",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
        Swal.fire({
          icon: "success",
          title: "Empleado eliminado",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Inicial redonda */}
      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-green-100 text-green-700 font-bold text-2xl flex items-center justify-center shadow-inner">
        {inicial}
      </div>

      {/* Info del empleado */}
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-800">
            {empleado.nombre} {empleado.apellido}
          </h2>
          <span className="text-sm text-white bg-green-600 px-3 py-1 rounded-full shadow">
            {empleado.rol}
          </span>
        </div>
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p>
            📧{" "}
            <span className="font-medium text-gray-700">
              {empleado.correo}
            </span>
          </p>
          <p>
            📞{" "}
            <span className="font-medium text-gray-700">
              {empleado.telefono}
            </span>
          </p>
          <p>
            🏠{" "}
            <span className="font-medium text-gray-700">
              {empleado.direccion}
            </span>
          </p>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onUpdate}
            className="bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-300 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 shadow transition"
          >
            <FaEdit /> Actualizar
          </button>
          <button
            onClick={confirmarEliminar}
            className="bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-300 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 shadow transition"
          >
            <FaTrash /> Eliminar
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const ListaEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
  const [empleadoEditar, setEmpleadoEditar] = useState(null);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = () => {
    axiosClient
      .get("/empleado")
      .then((res) => setEmpleados(res.data))
      .catch((err) => console.error("Error:", err));
  };

  const handleEliminar = (id) => {
    const token = localStorage.getItem("token");
    axiosClient
      .delete(`/empleado/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => cargarEmpleados())
      .catch((err) => console.error("Error al eliminar empleado:", err));
  };

  const handleActualizar = (empleado) => {
    setEmpleadoEditar({
      id: empleado.id_usuario,
      nombres: empleado.nombre,
      apellidos: empleado.apellido,
      telefono: empleado.telefono,
      direccion: empleado.direccion,
      correo: empleado.correo,
      rol: empleado.rol,
    });
    setMostrarModalActualizar(true);
  };

  return (
    <>
      {/* Lista de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-10">
        {empleados.map((empleado) => (
          <EmpleadoCard
            key={empleado.id_usuario}
            empleado={empleado}
            onUpdate={() => handleActualizar(empleado)}
            onDelete={() => handleEliminar(empleado.id_usuario)}
          />
        ))}
      </div>

      {/* Botón flotante para agregar */}
      <button
        onClick={() => setMostrarModalCrear(true)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300"
        title="Agregar Empleado"
      >
        <FaPlus size={20} />
      </button>

      {/* Modal para actualizar */}
      {mostrarModalActualizar && empleadoEditar && (
        <ModalActualizarEmpleado
          empleado={empleadoEditar}
          onClose={() => setMostrarModalActualizar(false)}
          onActualizar={cargarEmpleados}
        />
      )}

      {/* Modal para crear */}
      {mostrarModalCrear && (
        <FormEmpleados
          modoModal
          onClose={() => {
            setMostrarModalCrear(false);
            cargarEmpleados();
          }}
        />
      )}
    </>
  );
};
