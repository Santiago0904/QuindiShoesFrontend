import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ParticlesBackground } from "../Particulas/ParticlesBackground";

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
      await axios.post("http://localhost:3000/register", formulario);
      navigate("/esperando-confirmacion");
    } catch (error) {
      console.error("Error al registrar:", error);
      const mensaje = error.response?.data?.mensaje || "Error en el registro. Intenta nuevamente.";
      setErrorServidor(mensaje);
    }
  };

  return (
    <>
      <ParticlesBackground />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-pink-100">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
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
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder:text-pink-400 ${
                    errores[campo.id]
                      ? "border-red-400"
                      : "border-pink-200"
                  }`}
                />
                {errores[campo.id] && (
                  <p className="text-red-400 text-xs italic mt-1">
                    {errores[campo.id]}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white py-3 rounded-full shadow-md transition duration-300 font-semibold"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
