import React, { useEffect, useState, useRef, useCallback } from "react";
import axiosClient from "../../api/axion";
import { FaEdit, FaTrash, FaPlus, FaPalette, FaCubes, FaList } from "react-icons/fa";
import ModalActualizarProducto from "./Modal/ModalActualizarProducto";
import Swal from "sweetalert2";
import { FiltrosProducto } from "../../Components/FiltrosProducto/FiltrosProducto";

import { motion } from "framer-motion";
import { ParticlesBackground } from "../../Components/Particulas/ParticlesBackground";
import VisorModeloGLB from "../../Components/VisorModeloGLB/VisorModeloGLB";
import { ColorNewForm } from "../../Components/ColorNewForm/ColorNewForm";

// CRUD de colores estilizado
const CrudColores = ({ colores, onActualizar, onEliminar }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-pink-100">
    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-pink-700">
      <FaList /> CRUD de Colores
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {colores.map((color) => (
        <div
          key={color.id_color}
          className="flex items-center gap-4 bg-gradient-to-tr from-pink-50 to-white p-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <span
            className="inline-block w-10 h-10 rounded-full border-2 border-pink-200 shadow"
            style={{ backgroundColor: color.codigo_hex }}
            title={color.color}
          />
          <span className="font-semibold text-lg text-gray-700 flex-1">{color.color}</span>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs font-semibold shadow"
            onClick={() => onActualizar(color)}
            title="Actualizar"
          >
            <FaEdit />
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs font-semibold shadow"
            onClick={() => onEliminar(color.id_color)}
            title="Eliminar"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  </div>
);

// Top colores más usados estilizado tipo podio
const TopColores = ({ colores }) => {
  if (!colores || colores.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-indigo-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-indigo-700">
          <FaPalette /> Top colores más usados
        </h3>
        <span className="text-gray-500">No hay datos aún.</span>
      </div>
    );
  }

  // Podio: 1°, 2°, 3°
  const podio = colores.slice(0, 3);
  const resto = colores.slice(3);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-indigo-100">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-indigo-700">
        <FaPalette /> Top colores más usados
      </h3>
      {/* Podio */}
      <div className="flex justify-center items-end gap-8 mb-8">
        {/* Segundo lugar */}
        {podio[1] && (
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-gray-500 mb-1">2°</span>
            <span
              className="inline-block w-16 h-16 rounded-full border-4 border-indigo-300 shadow-lg mb-2"
              style={{ backgroundColor: podio[1].codigo_hex }}
              title={podio[1].color}
            />
            <span className="font-semibold text-indigo-700">{podio[1].color}</span>
            <span className="text-xs text-gray-500">{podio[1].usos} usos</span>
          </div>
        )}
        {/* Primer lugar */}
        {podio[0] && (
          <div className="flex flex-col items-center">
            <span className="text-2xl font-extrabold text-yellow-500 mb-1">1°</span>
            <span
              className="inline-block w-24 h-24 rounded-full border-4 border-yellow-400 shadow-2xl mb-2"
              style={{ backgroundColor: podio[0].codigo_hex }}
              title={podio[0].color}
            />
            <span className="font-bold text-yellow-600">{podio[0].color}</span>
            <span className="text-xs text-gray-500">{podio[0].usos} usos</span>
          </div>
        )}
        {/* Tercer lugar */}
        {podio[2] && (
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-gray-500 mb-1">3°</span>
            <span
              className="inline-block w-14 h-14 rounded-full border-4 border-orange-400 shadow-lg mb-2"
              style={{ backgroundColor: podio[2].codigo_hex }}
              title={podio[2].color}
            />
            <span className="font-semibold text-orange-700">{podio[2].color}</span>
            <span className="text-xs text-gray-500">{podio[2].usos} usos</span>
          </div>
        )}
      </div>
      {/* Resto de colores */}
      <div className="flex flex-wrap gap-4 justify-center">
        {resto.map((color, idx) => (
          <div
            key={color.id_color}
            className="flex flex-col items-center gap-1 bg-indigo-50 px-4 py-3 rounded-xl shadow border border-indigo-200"
          >
            <span
              className="inline-block w-10 h-10 rounded-full border-2 border-indigo-300 shadow"
              style={{ backgroundColor: color.codigo_hex }}
              title={color.color}
            />
            <span className="font-semibold text-indigo-700">{color.color}</span>
            <span className="text-xs text-gray-500">{color.usos} usos</span>
          </div>
        ))}
      </div>
    </div>
  );
};

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
          <div key={modelo.id} className="bg-gray-50 rounded-xl p-4 shadow flex flex-col">
            <VisorModeloGLB
              url={`http://localhost:3000/personalizacion/modelo/${modelo.id}`}
            />
            {modelo.fecha && (
              <p className="mt-2 text-xs text-gray-400">
                {new Date(modelo.fecha).toLocaleDateString()}
              </p>
            )}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-indigo-600 font-semibold">
                <FaCubes className="inline mr-1" />
                {modelo.nombre_usuario || "Usuario desconocido"}
              </span>
              <span className="text-xs text-gray-400">ID: {modelo.id_usuario}</span>
            </div>
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
      .then((res) => {
        const colores = res.data.map(c => ({
          id_color: c.id_color,
          color: c.nombre_color,
          codigo_hex: c.codigo_hax
        }));
        setColores(colores);
      })
      .catch(() => setColores([]));
  };

  // GET /color/top-usados
  const cargarTopColores = () => {
    axiosClient
      .get("/color/top-usados")
      .then((res) => {
        const topColores = res.data
          .map(c => ({
            id_color: c.id_color,
            color: c.nombre_color,
            codigo_hex: c.codigo_hax,
            usos: c.usos // <-- aquí el cambio
          }))
          .sort((a, b) => b.usos - a.usos); // Ordena de mayor a menor
        setTopColores(topColores);
      })
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
      cargarTopColores(); // <-- Recarga el top colores después de eliminar
      Swal.fire({ icon: "success", title: "Color eliminado", timer: 1200, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: "error", title: "Error al eliminar color" });
    }
  };

  // PUT /color/:id
  const handleActualizarColor = (color) => {
    Swal.fire({
      title: `<span class="font-bold text-pink-700">Actualizar color</span>`,
      html: `
      <input id="swal-input-nombre" class="swal2-input" placeholder="Nombre" value="${color.color}" style="font-size:1.1rem; border-radius:0.75rem; border:2px solid #f472b6; margin-bottom:1rem;" />
      <div style="display:flex;justify-content:center;">
        <input id="swal-input-hex" class="swal2-input" type="color" value="${color.codigo_hex}" style="width:4rem;height:3rem;border-radius:1rem;border:2px solid #818cf8;background:#fff;padding:0;box-shadow:0 1px 6px #818cf855;margin-bottom:0;" />
      </div>
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "rounded-2xl p-6",
        title: "text-2xl font-bold mb-4 flex items-center justify-center gap-2 text-pink-700",
        confirmButton: "bg-pink-600 text-white px-6 py-2 rounded-lg mx-2 font-semibold shadow hover:bg-pink-700 transition",
        cancelButton: "bg-gray-200 text-gray-700 px-6 py-2 rounded-lg mx-2 font-semibold shadow hover:bg-gray-300 transition",
      },
      buttonsStyling: false,
      preConfirm: () => {
        const nuevoNombre = document.getElementById("swal-input-nombre").value;
        const nuevoHex = document.getElementById("swal-input-hex").value;
        if (!nuevoNombre || !nuevoHex) {
          Swal.showValidationMessage("Debes ingresar nombre y color");
          return false;
        }
        return { nuevoNombre, nuevoHex };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        axiosClient
          .put(`/color/${color.id_color}`, {
            nombreColor: result.value.nuevoNombre,
            codigoHax: result.value.nuevoHex,
          })
          .then(() => {
            cargarColores();
            cargarTopColores();
            Swal.fire({
              icon: "success",
              title: "Color actualizado",
              timer: 1200,
              showConfirmButton: false,
              customClass: { popup: "rounded-xl" },
            });
          })
          .catch(() =>
            Swal.fire({
              icon: "error",
              title: "Error al actualizar color",
              customClass: { popup: "rounded-xl" },
            })
          );
      }
    });
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
            <ColorNewForm onColorGuardado={() => { cargarColores(); cargarTopColores(); }} />

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
