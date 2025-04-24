import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ModalActualizarProducto from "./Modal/ModalActualizarProducto"; // Ajusta la ruta si la tienes en otra carpeta

const ProductoCard = ({ producto, onDelete, onUpdate }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-start">
      <img
        src={producto.imagen_producto}
        alt={producto.nombre_producto}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-bold">{producto.nombre_producto}</h3>
      <p>Tipo: {producto.tipo_producto}</p>
      <p>Género: {producto.genero_producto}</p>
      <p>Color: {producto.colores_producto}</p>
      <p>Talla: {producto.tallas_producto}</p>
      <p>Stock: {producto.stock}</p>
      <p>Precio: ${producto.precio_producto}</p>
      <div className="flex gap-3 mt-3">
        <button
          onClick={onUpdate}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-1"
        >
          <FaEdit /> Actualizar
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1"
        >
          <FaTrash /> Eliminar
        </button>
      </div>
    </div>
  );
};

export const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Carga inicial de productos
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    axios
      .get("http://localhost:3000/producto")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));
  };

  const handleEliminar = (id) => {
    axios
      .delete(`http://localhost:3000/producto/${id}`)
      .then(() => cargarProductos())
      .catch((err) => console.error("Error al eliminar producto:", err));
  };

  const handleActualizar = (producto) => {
    // Mapea snake_case → camelCase para el modal
    const productoFormateado = {
      id_producto: producto.id_producto,
      tipoProducto: producto.tipo_producto,
      nombreProducto: producto.nombre_producto,
      generoProducto: producto.genero_producto,
      stockProducto: producto.stock,
      tallaProducto: producto.tallas_producto,
      precioProducto: producto.precio_producto,
      colorProducto: producto.colores_producto,
      imagenProducto: producto.imagen_producto,
    };

    setProductoEditar(productoFormateado);
    setMostrarModal(true);
  };

  const redirigirFormulario = () => {
    window.location.href = "/nuevoProducto";
  };

  return (
    <>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {productos.map((prod) => (
          <ProductoCard
            key={prod.id_producto}
            producto={prod}
            onDelete={() => handleEliminar(prod.id_producto)}
            onUpdate={() => handleActualizar(prod)}
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

      {mostrarModal && productoEditar && (
        <ModalActualizarProducto
          producto={productoEditar}
          onClose={() => setMostrarModal(false)}
          onActualizar={() => {
            setMostrarModal(false);
            cargarProductos();
          }}
        />
      )}
    </>
  );
};
