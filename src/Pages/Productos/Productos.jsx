import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ProductoCard = ({ producto, onDelete, onUpdate }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-start">
      <img src={producto.imagenProducto} alt={producto.nombreProducto} className="w-full h-40 object-cover rounded-md mb-3" />
      <h3 className="text-lg font-bold">{producto.nombreProducto}</h3>
      <p>Tipo: {producto.tipoProducto}</p>
      <p>Género: {producto.generoProducto}</p>
      <p>Color: {producto.colorProducto}</p>
      <p>Talla: {producto.tallaProducto}</p>
      <p>Stock: {producto.stockProducto}</p>
      <p>Precio: ${producto.precioProducto}</p>
      <div className="flex gap-3 mt-3">
        <button onClick={onUpdate} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-1">
          <FaEdit /> Actualizar
        </button>
        <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1">
          <FaTrash /> Eliminar
        </button>
      </div>
    </div>
  );
};

export const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/productos")
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  const handleEliminar = (id) => {
    axios.delete(`http://localhost:3000/productos/${id}`)
      .then(() => setProductos(productos.filter(p => p.id !== id)))
      .catch(err => console.error("Error al eliminar producto:", err));
  };

  const handleActualizar = (id) => {
    // Aquí puedes redirigir a un formulario o abrir un modal
    console.log("Actualizar producto con id:", id);
  };

  const redirigirFormulario = () => {
    window.location.href = "/agregar-producto";
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
      {productos.map((producto) => (
        <ProductoCard
          key={producto.id}
          producto={producto}
          onDelete={() => handleEliminar(producto.id)}
          onUpdate={() => handleActualizar(producto.id)}
        />
      ))}

      <button
        onClick={redirigirFormulario}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
        title="Agregar producto"
      >
        <FaPlus size={20} />
      </button>
    </div>
  );
};
