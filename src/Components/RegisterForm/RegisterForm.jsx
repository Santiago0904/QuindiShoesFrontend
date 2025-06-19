import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WavesBackground } from "../Particulas2/Particulas2";
import { motion } from "framer-motion"; // Import motion for animations

export function RegisterForm() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    direccion: "",
    contrasena: "",
    rol: "cliente",
  });

  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState("");

  const manejarCambio = (e) => {
    setFormulario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!formulario.nombres) nuevosErrores.nombres = "El nombre es obligatorio.";
    if (!formulario.apellidos) nuevosErrores.apellidos = "El apellido es obligatorio.";
    if (!formulario.correo) nuevosErrores.correo = "El correo es obligatorio.";
    if (!formulario.telefono) nuevosErrores.telefono = "El teléfono es obligatorio.";
    if (!formulario.direccion) nuevosErrores.direccion = "La dirección es obligatoria.";
    if (!formulario.contrasena) nuevosErrores.contrasena = "La contraseña es obligatoria.";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    try {
      await axios.post("https://quindishoes-backend-3.onrender.com/register", formulario);
      navigate("/esperando-confirmacion");
    } catch (error) {
      console.error("Error al registrar:", error);
      const mensaje = error.response?.data?.mensaje || "Error en el registro. Intenta nuevamente.";
      setErrorServidor(mensaje);
    }
  };

  return (
    <>
      <WavesBackground />
      <div className="min-h-screen flex z-1  items-center justify-center px-4 "> {/* Added pastel background */}
        <motion.div // Added motion for animations
          className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-pink-100" // Pastel border
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6 drop-shadow-sm"> {/* Pastel purple heading */}
            Registro de Usuario
          </h2>

          {errorServidor && (
            <p className="text-red-400 text-sm mb-4 text-center">{errorServidor}</p>
          )}

          <form className="space-y-5" onSubmit={manejarEnvio}>
            {[
              { id: "nombres", label: "Nombres", tipo: "text" },
              { id: "apellidos", label: "Apellidos", tipo: "text" },
              { id: "correo", label: "Correo electrónico", tipo: "email" },
              { id: "telefono", label: "Teléfono", tipo: "text" },
              { id: "direccion", label: "Dirección", tipo: "text" },
              { id: "contrasena", label: "Contraseña", tipo: "password" },
            ].map((campo) => (
              <div key={campo.id}>
                <input
                  id={campo.id}
                  name={campo.id}
                  type={campo.tipo}
                  placeholder={campo.label}
                  value={formulario[campo.id]}
                  onChange={manejarCambio}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder:text-pink-400 ${ // Pastel pink/purple inputs
                    errores[campo.id]
                      ? "border-red-400"
                      : "border-pink-200" // Pastel border for non-error
                  }`}
                />
                {errores[campo.id] && (
                  <p className="text-red-400 text-xs italic mt-1">
                    {errores[campo.id]}
                  </p>
                )}
              </div>
            ))}

            <motion.button // Added motion to the button
              type="submit"
              className="w-full inline-flex items-center justify-center
                         bg-gradient-to-r from-purple-400 to-pink-500 {/* Pastel pink gradient */}
                         hover:from-purple-500 hover:to-pink-600
                         text-white font-semibold text-lg py-3 rounded-full
                         shadow-lg hover:shadow-xl
                         transform hover:scale-105 transition-all duration-300 ease-out
                         focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-75" // Pastel focus ring
              whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.97 }}
            >
              Registrar
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default RegisterForm;