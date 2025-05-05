import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ModalActualizarProducto from "./Modal/ModalActualizarProducto";
import { FiltrosProductos } from "../../Components/FiltrosProducto/FiltrosProducto";
import Swal from "sweetalert2";

const STOCK_MINIMO = 5;

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
  const [filtros, setFiltros] = useState({});
  const [productoEditar, setProductoEditar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alertasStock, setAlertasStock] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    const token = localStorage.getItem("token");
    axiosClient
      .get("/producto", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const productosCargados = res.data;
        setProductos(productosCargados);
  
        // 🔔 Verifica el stock bajo
        const productosConBajoStock = productosCargados.filter(p => p.stock < STOCK_MINIMO);
        setAlertasStock(productosConBajoStock);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  };

  const handleEliminar = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar este producto después de eliminarlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar", 
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        axiosClient
          .delete(`/producto/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
            cargarProductos();
          })
          .catch((err) => {
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
            console.error("Error al eliminar producto:", err);
          });
      }
    });
  };

  const handleActualizar = (producto) => {
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

  const filtrarProductos = () => {
    return productos
      .filter((p) =>
        filtros.nombre
          ? p.nombre_producto.toLowerCase().includes(filtros.nombre.toLowerCase())
          : true
      )
      .filter((p) => (filtros.tipo ? p.tipo_producto.toLowerCase() === filtros.tipo : true))
      .filter((p) => (filtros.genero ? p.genero_producto.toLowerCase() === filtros.genero : true))
      .filter((p) => (filtros.talla ? p.tallas_producto === parseInt(filtros.talla) : true))
      .filter((p) => (filtros.color ? p.colores_producto.toLowerCase() === filtros.color : true))
      .sort((a, b) => {
        if (filtros.stock === "asc") return a.stock - b.stock;
        if (filtros.stock === "desc") return b.stock - a.stock;
        return 0;
      })
      .sort((a, b) => {
        if (filtros.precio === "asc") return a.precio_producto - b.precio_producto;
        if (filtros.precio === "desc") return b.precio_producto - a.precio_producto;
        return 0;
      });
  };

  const redirigirFormulario = () => {
    window.location.href = "/nuevoProducto";
  };

  return (
    <>

      {/* Alertas */}
      {alertasStock.length > 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 m-6 rounded-lg shadow">
          <p className="font-semibold mb-2">⚠️ Productos con bajo stock:</p>
          <ul className="list-disc list-inside">
            {alertasStock.map((p) => (
              <li key={p.id_producto}>
                {p.nombre_producto} – Stock: {p.stock}
              </li>
            ))}
          </ul>
        </div>
      )}

      <FiltrosProductos onFilterChange={setFiltros} />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {filtrarProductos().map((prod) => (
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
