import React, { useState } from "react";
import axios from "axios";

export const ZonaNewForm = () => {
  const [zona, setZona] = useState({
    nombreZona: ""
  });

  const handleChange = (e) => {
    setZona({
      ...zona,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/zona_register", zona);
      console.log("Zona producto:", response.data);
  
    } catch (error) {
      console.error("Error al registrar zona:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro de zona del producto</h2>
      <form className="space-y-4">
        <input
          type="text"
          name="nombreZona"
          placeholder="Nombre del material"
          value={zona.nombreZona}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Registrar zona
        </button>
      </form>
    </div>
  );
};

