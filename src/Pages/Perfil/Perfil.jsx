import React, { useState, useEffect } from "react";
import CambiarContraseñaForm from "../../Components/CambiarContraseñaForm/CambiarContraseñaForm";
import { motion, AnimatePresence } from "framer-motion";
import axiosClient from "../../api/axion";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true); // Para saber si ya verificamos login
  const navigate = useNavigate();

  useEffect(() => {
    const verificarAutenticacion = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      try {
        const response = await axiosClient.get("/profile");
        setUsuario(response.data);
      } catch (error) {
        console.error("Token inválido o expirado:", error);
        localStorage.removeItem("token");
      } finally {
        setCargando(false);
      }
    };

    verificarAutenticacion();
  }, []);

  const redirigirLogin = () => navigate("/Login");

  if (cargando) {
    return (
      <div className="text-center mt-20 text-gray-600 text-lg">
        Verificando sesión...
      </div>
    );
  }

  if (!usuario) {
    // No logueado
    return (
      <motion.div
        className="max-w-md mx-auto mt-20 text-center p-10 bg-white shadow-xl rounded-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Acceso denegado
        </h2>
        <p className="text-gray-600 mb-8">
          Debes iniciar sesión para acceder a tu perfil.
        </p>

        <motion.button
          onClick={redirigirLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Iniciar Sesión
        </motion.button>
      </motion.div>
    );
  }

  // ✅ Usuario logueado, renderizar perfil
  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-semibold text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Mi Perfil
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
        {/* Detalles del usuario */}
        <motion.div
          className="bg-gray-50 p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:shadow-xl hover:scale-105 ease-in-out"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-lg font-medium text-gray-700 mb-2">
            <strong>Nombre:</strong> {usuario.nombre}
          </p>
          <p className="text-lg font-medium text-gray-700 mb-2">
            <strong>Correo:</strong> {usuario.correo}
          </p>
          <p className="text-lg font-medium text-gray-700 mb-2">
            <strong>Teléfono:</strong> {usuario.telefono}
          </p>
          <p className="text-lg font-medium text-gray-700 mb-4">
            <strong>Dirección:</strong> {usuario.direccion}
          </p>

          <div className="text-center">
            <button
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out"
            >
              {mostrarFormulario ? "Cancelar" : "Cambiar Contraseña"}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center items-center p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-white text-center">
            <motion.h2
              className="text-3xl font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              ¡Bienvenido de nuevo, {usuario.nombre}!
            </motion.h2>
            <p className="text-lg">
              Aquí puedes actualizar tu información o cambiar tu contraseña.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Formulario para cambiar contraseña */}
      <AnimatePresence>
        {mostrarFormulario && (
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <CambiarContraseñaForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Perfil;
