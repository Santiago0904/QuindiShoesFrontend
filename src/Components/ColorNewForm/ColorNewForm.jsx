import React, { useState } from "react";
import axiosClient from "../../api/axion";

export const ColorNewForm = () => {
  const [color, setColor] = useState({
    nombreColor: "",
    codigoHax: "#000000",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColor({
      ...color,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axiosClient.post("/color", color, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Color registrado:", response.data);
      alert("¡Color registrado con éxito!");

      const nuevoToken = response.headers["x-renewed-token"];
      if (nuevoToken) {
        localStorage.setItem("token", nuevoToken);
      }

      // Limpiar formulario
      setColor({ nombreColor: "", codigoHax: "#000000" });

    } catch (error) {
      console.error("Error al registrar color:", error);
      alert("Hubo un error al registrar el color.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro de Color</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block mb-1 font-medium">Selecciona un color:</label>
          <input
            type="color"
            name="codigoHax"
            value={color.codigoHax}
            onChange={handleChange}
            className="w-full h-10 cursor-pointer rounded-md border"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Registrar color
        </button>
      </form>
    </div>
  );
};
