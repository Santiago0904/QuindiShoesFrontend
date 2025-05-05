import React, { useState } from "react";
import CambiarContraseñaForm from "../../Components/CambiarContraseñaForm/CambiarContraseñaForm";

const Perfil = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-4 text-center">Mi Perfil</h1>
      
      {/* Datos del usuario, puedes completar con los tuyos */}
      <div className="mb-6">
        <p><strong>Nombre:</strong> Juan Pérez</p>
        <p><strong>Correo:</strong> juanperez@email.com</p>
      </div>

      <div className="text-center">
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
        >
          {mostrarFormulario ? "Cancelar" : "Cambiar Contraseña"}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="mt-6">
          <CambiarContraseñaForm />
        </div>
      )}
    </div>
  );
};

export default Perfil;
