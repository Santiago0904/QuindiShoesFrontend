import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axion";
import { FaEdit, FaTrash, FaPlus, FaPalette, FaCubes, FaList } from "react-icons/fa";
import ModalActualizarProducto from "./Modal/ModalActualizarProducto";
import Swal from "sweetalert2";
import { FiltrosProducto } from "../../Components/FiltrosProducto/FiltrosProducto";
import { motion } from "framer-motion";
import { ParticlesBackground } from "../../Components/Particulas/ParticlesBackground";
import { ColorNewForm } from "../../Components/ColorNewForm/ColorNewForm";

// CRUD de colores para actualizar y eliminar
const CrudColores = ({ colores, onActualizar, onEliminar }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-pink-700">
      <FaList /> CRUD de Colores
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {colores.map((color) => (
        <div key={color.id_color} className="flex items-center gap-3 bg-pink-50 p-3 rounded-xl shadow">
          <span
            className="inline-block w-8 h-8 rounded-full border"
            style={{ backgroundColor: color.codigo_hex }}
            title={color.color}
          />
          <span className="font-semibold">{color.color}</span>
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
            onClick={() => onActualizar(color)}
          >
            Actualizar
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
            onClick={() => onEliminar(color.id_color)}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  </div>
);

// Top colores más usados
const TopColores = ({ colores }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-700">
      <FaPalette /> Top colores más usados
    </h3>
    <div className="flex flex-wrap gap-4">
      {colores.length === 0 ? (
        <span className="text-gray-500">No hay datos aún.</span>
      ) : (
        colores.map((color, idx) => (
          <div key={color.id_color} className="flex items-center gap-2">
            <span
              className="inline-block w-6 h-6 rounded-full border"
              style={{ backgroundColor: color.codigo_hex }}
              title={color.color}
            />
            <span className="font-semibold">{color.color}</span>
            <span className="text-xs text-gray-500">({color.usos} usos)</span>
            {idx < colores.length - 1 && <span className="mx-2">|</span>}
          </div>
        ))
      )}
    </div>
  </div>
);

// Modelos 3D guardados
const ModelosGuardados = ({ modelos }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-700">
      <FaCubes /> Modelos 3D guardados por usuarios
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {modelos.length === 0 ? (
        <span className="text-gray-500">No hay modelos guardados.</span>
      ) : (
        modelos.map((modelo) => (
          <div key={modelo.id} className="bg-gray-50 rounded-xl p-4 shadow">
            <iframe
              src={`${import.meta.env.VITE_API_URL || ""}/personalizacion/modelo/${modelo.id}`}
              title={`Modelo ${modelo.id}`}
              className="w-full h-40 rounded-lg border"
            />
            <p className="mt-2 text-sm text-gray-600">Modelo #{modelo.id}</p>
          </div>
        ))
      )}
    </div>
  </div>
);

const ProductoCard = ({ producto, onDelete, onUpdate, onTogglePersonalizacion }) => {
  const imagenPrincipal =
    producto.imagenes && producto.imagenes.length > 0
      ? producto.imagenes[0]
      : "https://via.placeholder.com/300x200?text=Sin+Imagen";

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-3xl p-4 bg-gradient-to-tr from-white to-pink-50 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
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
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() => onTogglePersonalizacion(producto)}
          className={`px-3 py-1 rounded-full text-xs font-semibold shadow transition 
            ${producto.personalizacion_activa ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          {producto.personalizacion_activa ? "Personalización Activada" : "Activar Personalización"}
        </button>
      </div>
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
  const [seccion, setSeccion] = useState("productos");

  // Personalización
  const [colores, setColores] = useState([]);
  const [topColores, setTopColores] = useState([]);
  const [modelos, setModelos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  useEffect(() => {
    if (seccion === "personalizacion") {
      cargarColores();
      cargarTopColores();
      cargarModelos();
    }
  }, [seccion]);

  // GET /producto
  const cargarProductos = () => {
    const token = localStorage.getItem("token");
    axiosClient
      .get("/producto", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));
  };

  // GET /color
  const cargarColores = () => {
    axiosClient
      .get("/color")
      .then((res) => setColores(res.data))
      .catch(() => setColores([]));
  };

  // GET /color/top-usados
  const cargarTopColores = () => {
    axiosClient
      .get("/color/top-usados")
      .then((res) => setTopColores(res.data))
      .catch(() => setTopColores([]));
  };

  // GET /personalizacion/modelos
  const cargarModelos = () => {
    axiosClient
      .get("/personalizacion/modelos")
      .then((res) => setModelos(res.data))
      .catch(() => setModelos([]));
  };

  // DELETE /color/:id
  const handleEliminarColor = async (id_color) => {
    try {
      await axiosClient.delete(`/color/${id_color}`);
      setColores((prev) => prev.filter((c) => c.id_color !== id_color));
      Swal.fire({ icon: "success", title: "Color eliminado", timer: 1200, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: "error", title: "Error al eliminar color" });
    }
  };

  // PUT /color/:id
  const handleActualizarColor = (color) => {
    const nuevoNombre = prompt("Nuevo nombre del color:", color.color);
    const nuevoHex = prompt("Nuevo código HEX:", color.codigo_hex);
    if (!nuevoNombre || !nuevoHex) return;
    axiosClient
      .put(`/color/${color.id_color}`, { nombreColor: nuevoNombre, codigoHax: nuevoHex })
      .then(() => {
        setColores((prev) =>
          prev.map((c) =>
            c.id_color === color.id_color
              ? { ...c, color: nuevoNombre, codigo_hex: nuevoHex }
              : c
          )
        );
        Swal.fire({ icon: "success", title: "Color actualizado", timer: 1200, showConfirmButton: false });
      })
      .catch(() => Swal.fire({ icon: "error", title: "Error al actualizar color" }));
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
  const productosPersonalizables = productos.filter(p => p.personalizacion_activa === 1);

  // PUT /producto/:id/personalizacion
  const handleTogglePersonalizacion = async (producto) => {
    try {
      const token = localStorage.getItem("token");
      const nuevoEstado = producto.personalizacion_activa ? 0 : 1;
      await axiosClient.put(
        `/producto/${producto.id_producto}/personalizacion`,
        { personalizacion_activa: nuevoEstado },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProductos((prev) =>
        prev.map((p) =>
          p.id_producto === producto.id_producto
            ? { ...p, personalizacion_activa: nuevoEstado }
            : p
        )
      );
    } catch (error) {
      alert("Error al actualizar la personalización");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen relative py-12 px-4 sm:px-8 overflow-hidden"
    >
      <ParticlesBackground />
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-10">
        <div className="flex gap-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full font-bold shadow transition-all flex items-center gap-2 ${
              seccion === "productos"
                ? "bg-pink-500 text-white scale-105"
                : "bg-white text-pink-600 border border-pink-300 hover:bg-pink-100"
            }`}
            onClick={() => setSeccion("productos")}
          >
            <FaPlus /> Productos
          </button>
          <button
            className={`px-6 py-2 rounded-full font-bold shadow transition-all flex items-center gap-2 ${
              seccion === "personalizacion"
                ? "bg-indigo-600 text-white scale-105"
                : "bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-100"
            }`}
            onClick={() => setSeccion("personalizacion")}
          >
            <FaPalette /> Personalización
          </button>
        </div>

        {seccion === "productos" && (
          <>
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
                  onTogglePersonalizacion={handleTogglePersonalizacion}
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
          </>
        )}

        {seccion === "personalizacion" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Solo productos personalizables */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-700">
                <FaPalette /> Productos Personalizables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {productosPersonalizables.length === 0 ? (
                  <span className="text-gray-500">No hay productos personalizables.</span>
                ) : (
                  productosPersonalizables.map((producto) => (
                    <div key={producto.id_producto} className="bg-pink-50 rounded-xl p-4 shadow">
                      <img
                        src={producto.imagenes?.[0] || "https://via.placeholder.com/300x200?text=Sin+Imagen"}
                        alt={producto.nombre_producto}
                        className="w-full h-40 object-contain rounded-lg mb-2"
                      />
                      <h4 className="font-bold text-pink-700">{producto.nombre_producto}</h4>
                      <p className="text-sm text-gray-500">{producto.tipo_producto}</p>
                      <p className="text-md text-emerald-600 font-semibold">
                        ${producto.precio_producto?.toLocaleString("es-CO")}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Formulario para agregar colores */}
            <ColorNewForm />

            {/* CRUD de colores */}
            <CrudColores
              colores={colores}
              onActualizar={handleActualizarColor}
              onEliminar={handleEliminarColor}
            />

            {/* Top colores más usados */}
            <TopColores colores={topColores} />

            {/* Modelos 3D guardados */}
            <ModelosGuardados modelos={modelos} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
