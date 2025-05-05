import React, { useState } from "react";
import axiosClient from "../../api/axion"; // Asegúrate de importar axiosClient correctamente

const CambiarContraseñaForm = () => {
  const [contraseñaActual, setContraseñaActual] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (nuevaContraseña !== confirmarContraseña) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const response = await axiosClient.post(
        "/cambiarContrasenaR", // URL sin el http://localhost:3000 porque ya lo tienes en axiosClient
        {
          contraseñaActual: contraseñaActual,
          nuevaContraseña: nuevaContraseña,
        }
      );
  
      console.log("Respuesta:", response.data);
      setMensaje("Contraseña cambiada con éxito");
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setMensaje("Hubo un error al cambiar la contraseña.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="password"
        placeholder="Contraseña actual"
        value={contraseñaActual}
        onChange={(e) => setContraseñaActual(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={nuevaContraseña}
        onChange={(e) => setNuevaContraseña(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Confirmar nueva contraseña"
        value={confirmarContraseña}
        onChange={(e) => setConfirmarContraseña(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Cambiar Contraseña
      </button>

      {mensaje && <p className="mt-2 text-center text-sm text-red-600">{mensaje}</p>}
    </form>
  );
};

export default CambiarContraseñaForm;
