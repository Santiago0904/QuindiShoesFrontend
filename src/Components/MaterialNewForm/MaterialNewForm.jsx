
import React, { useState } from "react";
import axios from "axios";

export const MaterialNewForm = () => {
  const [material, setMaterial] = useState({
    nombre_material: ""
  });

  const handleChange = (e) => {
    setMaterial({
      ...material,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/material_register", material);
      console.log("Material:", response.data);
  
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro de Material</h2>
      <form className="space-y-4">
        <input
          type="text"
          name="nombre_material"
          placeholder="Nombre del material"
          value={material.nombre_material}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Registrar material
        </button>
      </form>
    </div>
  );
};
