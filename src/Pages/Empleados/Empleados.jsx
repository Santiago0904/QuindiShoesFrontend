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
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los empleados.",
        });
      });
  };

  const handleEliminar = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El empleado será eliminado permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f472b6",
      cancelButtonColor: "#a7f3d0",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#fff1f2",
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
              confirmButtonColor: "#a7f3d0",
              background: "#f0fff4",
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
              confirmButtonColor: "#fda4af",
              background: "#fff1f2",
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
        <h2 className="text-4xl font-extrabold text-pink-400 drop-shadow">
          Empleados
        </h2>
        {!mostrarFormulario && (
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-pink-200 text-pink-700 font-bold p-4 rounded-full shadow-xl hover:scale-110 transition-all border-2 border-pink-300"
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="max-w-3xl mx-auto bg-gray-100 rounded-3xl shadow-2xl p-10"
          >
            <FormEmpleados
              onSuccess={() => {
                Swal.fire({
                  icon: "success",
                  title: "Empleado agregado",
                  text: "El empleado fue registrado correctamente.",
                  confirmButtonColor: "#22c55e",
                  background: "#f3f4f6",
                  timer: 1400,
                  showConfirmButton: false,
                });
                cargarEmpleados();
                setMostrarFormulario(false);
              }}
              modo="agregar"
            />
            <button
              onClick={() => setMostrarFormulario(false)}
              className="w-full mt-4 bg-pink-200 text-pink-700 px-6 py-2 rounded-lg shadow hover:bg-pink-300 transition-all font-semibold"
            >
              Cancelar
            </button>
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
            className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8 flex flex-col gap-4"
          >
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-pink-200 rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold text-pink-500 shadow">
                  {empleado.nombre?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-lg text-pink-700">
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
                  <span className="block text-green-700">{empleado.correo}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Teléfono</span>
                  <span className="block text-green-700">{empleado.telefono}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Dirección</span>
                  <span className="block text-pink-500">{empleado.direccion}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Rol</span>
                  <span className="block text-emerald-600 font-semibold">
                    {empleado.rol}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleActualizar(empleado)}
                className="bg-green-200 text-green-900 px-4 py-2 rounded-lg hover:bg-green-300 transition-all shadow font-semibold flex items-center gap-2"
              >
                <FaEdit /> Actualizar
              </button>
              <button
                onClick={() => handleEliminar(empleado.id_usuario)}
                className="bg-pink-200 text-pink-900 px-4 py-2 rounded-lg hover:bg-pink-300 transition-all shadow font-semibold flex items-center gap-2"
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
