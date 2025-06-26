// ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { WavesBackground } from "../../Components/Particulas2/Particulas2";

export const Password = () => {
  const [nuevaContraseña, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const token = new URLSearchParams(window.location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nuevaContraseña !== confirmarPassword) {
      Swal.fire({
        icon: "warning",
        title: "Las contraseñas no coinciden",
        text: "Por favor, verifica que ambas contraseñas sean iguales.",
        confirmButtonColor: "#f472b6",
        background: "#fff1f2",
      });
      return;
    }

    try {
      await axios.post("http://localhost:3000/reiniciarContrasena", {
        token,
        contraseña: nuevaContraseña,
      });
      await Swal.fire({
        icon: "success",
        title: "Contraseña actualizada",
        text: "Tu contraseña ha sido restablecida correctamente.",
        confirmButtonColor: "#a7f3d0",
        background: "#fff0f5",
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo restablecer la contraseña.",
        confirmButtonColor: "#fda4af",
        background: "#fff1f2",
      });
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center z-10 relative bg-transparent"
        style={{ minHeight: "100vh" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="w-full max-w-lg bg-white p-12 rounded-3xl shadow-lg border border-pink-100 z-10"
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Nueva Contraseña
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={nuevaContraseña}
              onChange={(e) => setNuevaPassword(e.target.value)}
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
            <motion.button
              type="submit"
              className="inline-flex items-center justify-center
                         bg-gradient-to-r from-purple-400 to-pink-500
                         hover:from-purple-500 hover:to-pink-600
                         text-white font-semibold text-base sm:text-lg px-6 py-3 rounded-full
                         shadow-lg hover:shadow-xl
                         transform hover:scale-105 transition-all duration-300 ease-out
                         focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-75"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <svg
                className="w-4 h-4 mr-2 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Restablecer contraseña
            </motion.button>
          </form>
        </motion.div>
      </div>
      {/* Fondo de olas decorativo */}
      <WavesBackground />
    </>
  );
};
