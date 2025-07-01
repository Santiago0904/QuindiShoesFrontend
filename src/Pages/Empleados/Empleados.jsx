import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axion";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ModalActualizarEmpleado from "./Modal/Modal";
import { FormEmpleados } from "../../Components/FormEmpleados/FormEmpleados";

export const ListaEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [empleadoEditar, setEmpleadoEditar] = useState(null);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = () => {
    axiosClient
      .get("/empleado")
      .then((res) => setEmpleados(res.data))
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los empleados.",
          background: "#F9FAFB",
          confirmButtonColor: "#047857", // emerald-700
        });
      });
  };

  const handleEliminar = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El empleado será eliminado permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E11D48", // rose-600
      cancelButtonColor: "#D1FAE5", // emerald-100
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#F9FAFB",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        axiosClient
          .delete(`/empleado/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Eliminado",
              text: "El empleado ha sido eliminado.",
              background: "#F0FFF4",
              confirmButtonColor: "#059669", // emerald-600
              timer: 1200,
              showConfirmButton: false,
            });
            cargarEmpleados();
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo eliminar el empleado.",
              background: "#F9FAFB",
              confirmButtonColor: "#047857", // emerald-700
            });
          });
      }
    });
  };

  const handleActualizar = (empleado) => {
    setEmpleadoEditar({
      id: empleado.id_usuario,
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      telefono: empleado.telefono,
      direccion: empleado.direccion,
      correo: empleado.correo,
      rol: empleado.rol,
    });
    setMostrarModal(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-extrabold text-emerald-700 drop-shadow">
          Empleados
        </h2>
        {!mostrarFormulario && (
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-emerald-200 text-emerald-800 font-bold p-4 rounded-full shadow-xl hover:scale-110 transition-all border-2 border-emerald-300"
            title="Agregar Empleado"
          >
            <FaPlus />
          </button>
        )}
      </div>

      <AnimatePresence>
        {mostrarFormulario && (
          <motion.div
            key="formulario"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          >
            <div className="w-full max-w-3xl">
              <FormEmpleados
                onSuccess={() => {
                  Swal.fire({
                    icon: "success",
                    title: "Empleado agregado",
                    text: "El empleado fue registrado correctamente.",
                    confirmButtonColor: "#059669", // emerald-600
                    background: "#F9FAFB",
                    timer: 1400,
                    showConfirmButton: false,
                  });
                  cargarEmpleados();
                  setMostrarFormulario(false);
                }}
                modo="agregar"
              />
              <div className="flex justify-center mt-4">
                <motion.button
                  onClick={() => setMostrarFormulario(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full shadow font-semibold text-sm hover:bg-gray-300 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancelar
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {empleados.map((empleado) => (
          <motion.div
            key={empleado.id_usuario}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 flex flex-col gap-4"
          >
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-emerald-100 rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold text-emerald-700 shadow">
                  {empleado.nombre?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-lg text-emerald-800">
                    {empleado.nombre} {empleado.apellido}
                  </div>
                  <div className="text-xs text-gray-400">
                    ID: {empleado.id_usuario}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="block text-gray-500">Correo</span>
                  <span className="block text-gray-800">{empleado.correo}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Teléfono</span>
                  <span className="block text-gray-800">{empleado.telefono}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Dirección</span>
                  <span className="block text-gray-700">{empleado.direccion}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Rol</span>
                  <span className="block text-emerald-700 font-semibold">
                    {empleado.rol}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleActualizar(empleado)}
                className="bg-emerald-100 text-emerald-900 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-all shadow font-semibold flex items-center gap-2"
              >
                <FaEdit /> Actualizar
              </button>
              <button
                onClick={() => handleEliminar(empleado.id_usuario)}
                className="bg-rose-100 text-rose-800 px-4 py-2 rounded-lg hover:bg-rose-200 transition-all shadow font-semibold flex items-center gap-2"
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {mostrarModal && empleadoEditar && (
          <ModalActualizarEmpleado
            empleado={empleadoEditar}
            onClose={() => setMostrarModal(false)}
            onActualizar={() => {
              setMostrarModal(false);
              cargarEmpleados();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};
