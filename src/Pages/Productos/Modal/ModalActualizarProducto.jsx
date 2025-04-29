import React, { useState } from "react";
import axiosClient from "../../../api/axion"; 

const ModalActualizarProducto = ({ producto, onClose, onActualizar }) => {
  const [formData, setFormData] = useState({ ...producto });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "stockProducto" || name === "precioProducto"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos a enviar:", formData);
      await axiosClient.put(
        `/producto/${formData.id_producto}`, 
        formData
      );
      onActualizar(); 
      onClose(); 
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      alert("Error al actualizar producto");
    }
  };

  return (
    <div className="fixed inset-0 bg-black opacity-98 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Actualizar Producto
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="tipoProducto"
            value={formData.tipoProducto}
            onChange={handleChange}
            placeholder="Tipo de producto"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="nombreProducto"
            value={formData.nombreProducto}
            onChange={handleChange}
            placeholder="Nombre del producto"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="generoProducto"
            value={formData.generoProducto}
            onChange={handleChange}
            placeholder="Género"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="stockProducto"
            type="number"
            value={formData.stockProducto}
            onChange={handleChange}
            placeholder="Stock"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="tallaProducto"
            value={formData.tallaProducto}
            onChange={handleChange}
            placeholder="Talla"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="precioProducto"
            type="number"
            value={formData.precioProducto}
            onChange={handleChange}
            placeholder="Precio"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="colorProducto"
            value={formData.colorProducto}
            onChange={handleChange}
            placeholder="Color"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="imagenProducto"
            value={formData.imagenProducto}
            onChange={handleChange}
            placeholder="URL de imagen"
            required
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-red-500 px-4 py-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalActualizarProducto;
