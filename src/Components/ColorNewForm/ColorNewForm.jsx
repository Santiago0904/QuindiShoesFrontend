import React, { useState } from "react";
import axios from "axios";

export const ColorNewForm = () => {
  const [color, setColor] = useState({
    nombreColor: "",
    codigoHax: "#000000"
  });

  const handleChange = (e) => {
    setColor({
      ...color,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/color_register", color);
      console.log("Color:", response.data);
  
    } catch (error) {
      console.error("Error al registrar color:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro de Color</h2>
      <form className="space-y-4">
        <input
          type="text"
          name="nombreColor"
          placeholder="Nombre del color"
          value={color.nombreColor}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <div>
          <label className="block mb-1">Selecciona un color:</label>
          <input
            type="color"
            name="codigoHax"
            value={color.codigoHax}
            onChange={handleChange}
            className="w-full h-10 cursor-pointer"
          />
        </div>
        
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Registrar color
        </button>
      </form>
    </div>
  );
};

