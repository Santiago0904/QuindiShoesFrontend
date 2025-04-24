// ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";

export const Password = () => {
  const [nuevaContraseña, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const token = new URLSearchParams(window.location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nuevaContraseña !== confirmarPassword) {
      return alert("Las contraseñas no coinciden.");
    }

    try {
      await axios.post("http://localhost:3000/reiniciarContrasena", {
        token,
        contraseña: nuevaContraseña,
      });
      alert("Contraseña actualizada correctamente.");
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      alert("No se pudo restablecer la contraseña.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Nueva Contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nuevaContraseña}
          onChange={(e) => setNuevaPassword(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Restablecer contraseñas
        </button>
      </form>
    </div>
  );
};
