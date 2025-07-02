import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ModalActualizarProducto from "./Modal/ModalActualizarProducto";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { motion } from "framer-motion";
import { ParticlesBackground } from "../../Components/Particulas/ParticlesBackground";

const ProductoCard = ({ producto, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const imagenPrincipal =
    producto.imagenes && producto.imagenes.length > 0
      ? producto.imagenes[0]
      : "https://via.placeholder.com/300x200?text=Sin+Imagen";

  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    navigate(`/producto/${producto.id_producto}/variantes`);
  };

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-3xl p-4 bg-gradient-to-tr from-white to-pink-50 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
        <ParticlesBackground />
      <img
        src={imagenPrincipal}
        alt={producto.nombre_producto}
        className="w-full h-48 object-contain rounded-xl mb-4"
      />
      <h3 className="text-lg font-semibold text-pink-600">
        {producto.nombre_producto}
      </h3>
      <p className="text-sm text-gray-500">Tipo: {producto.tipo_producto}</p>
      <p className="text-sm text-gray-500">Género: {producto.genero_producto}</p>
      <p className="text-md text-emerald-600 font-semibold">
        ${producto.precio_producto.toLocaleString("es-CO")}
      </p>
      <div className="flex gap-3 mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate();
          }}
          className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-full shadow-sm"
        >
          <FaEdit /> Actualizar
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-full shadow-sm"
        >
          <FaTrash /> Eliminar
        </button>
      </div>
    </motion.div>
  );
};

export const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtros, setFiltros] = useState({});

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

  const filtrarProductos = (productos, filtros) => {
    return productos.filter(producto => {
      if (
        filtros.nombre &&
        !producto.nombre_producto.toLowerCase().includes(filtros.nombre.toLowerCase())
      ) return false;
      if (
        filtros.tipo &&
        producto.tipo_producto.trim().toLowerCase() !== filtros.tipo.trim().toLowerCase()
      ) return false;
      if (
        filtros.genero &&
        producto.genero_producto.trim().toLowerCase() !== filtros.genero.trim().toLowerCase()
      ) return false;
      return true;
    });
  };

  const productosFiltrados = filtrarProductos(productos, filtros);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen relative py-12 px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold text-pink-600">
            Productos Disponibles
          </h2>
          <button
            onClick={redirigirFormulario}
            className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all shadow-md"
          >
            <FaPlus /> Nuevo Producto
          </button>
        </div>
        <FiltrosProducto onFiltrar={setFiltros} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-8">
          {productosFiltrados.map((producto) => (
            <ProductoCard
              key={producto.id_producto}
              producto={producto}
              onDelete={() => handleEliminar(producto.id_producto)}
              onUpdate={() => handleActualizar(producto)}
            />
          ))}
        </div>
        {mostrarModal && (
          <ModalActualizarProducto
            producto={productoEditar}
            onClose={() => setMostrarModal(false)}
            onActualizar={cargarProductos}
          />
        )}
      </div>
    </motion.div>
  );
};
