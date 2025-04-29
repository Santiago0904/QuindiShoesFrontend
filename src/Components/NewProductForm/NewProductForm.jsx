import React, { useState } from "react";
import axiosClient from "../../api/axion";

export const NewProductForm = () => {
  const [producto, setProducto] = useState({
    tipoProducto: "",
    nombreProducto: "",
    generoProducto: "",
    stockProducto: 0,
    tallaProducto: "",
    precioProducto: 0,
    colorProducto: "",
    imagenProducto: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: name === "stockProducto" || name === "precioProducto" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
  
      const response = await axiosClient.post("/producto", producto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Producto registrado:", response.data);
      alert("¡Producto registrado con éxito!");
  
      // Actualiza el token si fue renovado
      const nuevoToken = response.headers["x-renewed-token"];
      if (nuevoToken) {
        localStorage.setItem("token", nuevoToken);
      }
  
    } catch (error) {
      console.error("Error al registrar producto:", error);
      alert("Hubo un error al registrar el producto.");
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Registrar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="tipoProducto" placeholder="Tipo de producto" onChange={handleChange} required className="w-full p-2 border rounded-md" />
        <input name="nombreProducto" placeholder="Nombre del producto" onChange={handleChange} required className="w-full p-2 border rounded-md" />
        <input name="generoProducto" placeholder="Género del producto" onChange={handleChange} required className="w-full p-2 border rounded-md" />
        <input name="stockProducto" type="number" placeholder="Stock" onChange={handleChange} required className="w-full p-2 border rounded-md" />
        <input name="tallaProducto" placeholder="Talla" onChange={handleChange} required className="w-full p-2 border rounded-md" />
        <input name="precioProducto" type="number" placeholder="Precio" onChange={handleChange} required className="w-full p-2 border rounded-md" />
        <input name="colorProducto" placeholder="Color" onChange={handleChange} required className="w-full p-2 border rounded-md" />
        <input name="imagenProducto" placeholder="URL de imagen" onChange={handleChange} required className="w-full p-2 border rounded-md" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Registrar Producto
        </button>
      </form>
    </div>
  );
};

