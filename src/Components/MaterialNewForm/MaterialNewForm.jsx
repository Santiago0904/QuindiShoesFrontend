import React, { useState } from "react";
import axiosClient from "../../api/axion";

export const MaterialNewForm = () => {
  const [material, setMaterial] = useState({
    nombre_material: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial({
      ...material,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axiosClient.post("/material", material, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Material registrado:", response.data);
      alert("¡Material registrado con éxito!");

      const nuevoToken = response.headers["x-renewed-token"];
      if (nuevoToken) {
        localStorage.setItem("token", nuevoToken);
      }

      // Limpiar el formulario
      setMaterial({ nombre_material: "" });

    } catch (error) {
      console.error("Error al registrar material:", error);
      alert("Hubo un error al registrar el material.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro de Material</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Registrar material
        </button>
      </form>
    </div>
  );
};
