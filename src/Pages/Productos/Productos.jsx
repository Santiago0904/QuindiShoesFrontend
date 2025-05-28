import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ModalActualizarProducto from "./Modal/ModalActualizarProducto";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const STOCK_MINIMO = 5;

// Componente de carta para cada producto (panel de control)
const ProductoCard = ({ producto, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  // Imagen principal
  const imagenPrincipal =
    producto.imagenes && producto.imagenes.length > 0
      ? producto.imagenes[0]
      : "https://via.placeholder.com/300x200?text=Sin+Imagen";

  // Nueva función para navegar solo si se hace click fuera de los botones
  const handleCardClick = (e) => {
    // Si el click fue en un botón, no navegar
    if (e.target.closest("button")) return;
    navigate(`/producto/${producto.id_producto}/variantes`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 flex flex-col items-start w-full max-w-xs mx-auto"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <img
        src={imagenPrincipal}
        alt={producto.nombre_producto}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-bold">{producto.nombre_producto}</h3>
      <p>Tipo: {producto.tipo_producto}</p>
      <p>Género: {producto.genero_producto}</p>
      <p>Precio: ${producto.precio_producto}</p>
      <div className="flex gap-3 mt-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate();
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-1"
        >
          <FaEdit /> Actualizar
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1"
        >
          <FaTrash /> Eliminar
        </button>
      </div>
    </div>
  );
};

// Lista de productos (panel de control)
export const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    const token = localStorage.getItem("token");
    axiosClient
      .get("/producto", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));
  };

  const handleEliminar = (idProducto) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El producto se eliminará permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" }
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        axiosClient
          .delete(`/producto/${idProducto}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(() => {
            setProductos(productos.filter(p => p.id_producto !== idProducto));
            Swal.fire({
              icon: "success",
              title: "Eliminado",
              text: "El producto ha sido eliminado.",
              timer: 1200,
              showConfirmButton: false,
              showClass: { popup: "animate__animated animate__fadeInDown" },
              hideClass: { popup: "animate__animated animate__fadeOutUp" }
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo eliminar el producto.",
              confirmButtonColor: "#2563eb",
              showClass: { popup: "animate__animated animate__shakeX" }
            });
          });
      }
    });
  };

  const handleActualizar = (producto) => {
    setProductoEditar(producto);
    setMostrarModal(true);
  };

  const redirigirFormulario = () => {
    window.location.href = "/nuevoProducto";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-600">
            Productos Disponibles
          </h2>
          <button
            onClick={redirigirFormulario}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <FaPlus /> Nuevo Producto
          </button>
        </div>
        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productos.map((producto) => (
            <ProductoCard
              key={producto.id_producto}
              producto={producto}
              onDelete={() => handleEliminar(producto.id_producto)}
              onUpdate={() => handleActualizar(producto)}
            />
          ))}
        </div>
        {/* Modal para actualizar producto */}
        {mostrarModal && (
          <ModalActualizarProducto
            producto={productoEditar}
            onClose={() => setMostrarModal(false)}
            onActualizar={cargarProductos}
          />
        )}
      </div>
    </div>
  );
};