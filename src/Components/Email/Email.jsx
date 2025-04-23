// ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";

export const Email = () => {
  const [correo, setCorreo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:3000/RecuperarContrasena", { correo });
      alert("Revisa tu correo para continuar con el cambio de contraseña.");
    } catch (error) {
      console.error("Error al enviar correo de recuperación:", error);
      alert("Hubo un error al enviar el correo. Intenta nuevamente.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Recuperar Contraseña</h2>
      <form  className="space-y-4">
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
        <button
        onClick={handleSubmit}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Enviar enlace
        </button>
      </form>
    </div>
  );
};
