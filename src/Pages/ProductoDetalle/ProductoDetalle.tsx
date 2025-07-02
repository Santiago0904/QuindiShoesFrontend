import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axiosClient from "../../api/axion";
import { ContadorCarritoContext } from "../../Contexts/ContadorCarritoContext";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ResenasProducto from "../../Components/ResenasProducto/ResenasProducto";
import { motion } from "framer-motion";
import { FaShoppingCart } from 'react-icons/fa';
import { ParticlesBackground } from "../../Components/Particulas/ParticlesBackground";


interface Variante {
  id_variantes: number;
  id_talla: number;
  talla: string;
  id_color: number;
  color: string;
  stock: number;
}

interface DetalleProducto {
  id_producto: number;
  tipo_producto: string;
  nombre_producto: string;
  reseña_producto: string;
  genero_producto: string;
  precio_producto: number;
  imagenes: string[];
  colores: { id_color: number; color: string; codigo_hex: string }[];
  tallas: { id_talla: number; talla: string }[];
  variantes: Variante[];
  reserva_activa?: number | boolean;
  personalizacion_activa?: number | boolean;
}

export function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState<DetalleProducto | null>(null);
  const [colorSeleccionado, setColorSeleccionado] = useState<number | null>(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [esFavorito, setEsFavorito] = useState(false);
  const { incrementarContador } = useContext(ContadorCarritoContext);
  const usuario_id = localStorage.getItem("id");
  const usuario = usuario_id ? { id: Number(usuario_id) } : null;
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get(`/productoDetalle/${id}`)
      .then(res => setProducto(res.data))
      .catch(() => setProducto(null));
  }, [id]);

  // Agrega este useEffect para ver el valor de personalizacion_activa
  useEffect(() => {
    if (producto) {
      console.log("Estado de personalizacion_activa:", producto.personalizacion_activa);
    }
  }, [producto]);

  useEffect(() => {
    if (!producto) return;
    const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    setEsFavorito(favoritos.some((p: any) => p.id_producto === producto.id_producto));
  }, [producto]);

  if (!producto) return <div className="text-center mt-20 text-xl animate-pulse">Cargando...</div>;

  const varianteSeleccionada = producto.variantes.find(
    v => v.id_color === colorSeleccionado && v.id_talla === tallaSeleccionada
  );
  const stockDisponible = varianteSeleccionada ? varianteSeleccionada.stock : 0;

  const imagenPrincipal = producto.imagenes?.[0] || "https://via.placeholder.com/500x400?text=Sin+Imagen";

  const handleAgregarCarrito = () => {
    if (!colorSeleccionado || !tallaSeleccionada || cantidad > stockDisponible) {
      Swal.fire({ icon: "warning", title: "Verifica color, talla y stock", confirmButtonColor: "#2563eb" });
      return;
    }
    const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]");
    const nuevaEntrada = {
      id_producto: producto.id_producto,
      nombre_producto: producto.nombre_producto,
      precio_producto: producto.precio_producto,
      imagen: imagenPrincipal,
      color: producto.colores.find(c => c.id_color === colorSeleccionado)?.color,
      talla: producto.tallas.find(t => t.id_talla === tallaSeleccionada)?.talla,
      id_color: colorSeleccionado,
      id_talla: tallaSeleccionada,
      cantidad,
      id_variante: varianteSeleccionada?.id_variantes,
      stock: varianteSeleccionada?.stock
    };

    const idx = carritoActual.findIndex((item: any) => item.id_producto === nuevaEntrada.id_producto && item.id_color === nuevaEntrada.id_color && item.id_talla === nuevaEntrada.id_talla);
    if (idx >= 0) carritoActual[idx].cantidad += cantidad;
    else carritoActual.push(nuevaEntrada);

    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    incrementarContador();
    Swal.fire({ icon: "success", title: "Agregado al carrito", timer: 1500, showConfirmButton: false });
  };

  const handleReservar = () => {
    if (!usuario_id || !colorSeleccionado || !tallaSeleccionada || cantidad > stockDisponible) {
      Swal.fire({ icon: "warning", title: "Completa los campos y verifica stock", confirmButtonColor: "#2563eb" });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Reserva exitosa (simulado)",
      timer: 1500,
      showConfirmButton: false
    });
  };

  const toggleFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    const existe = favoritos.some((p: any) => p.id_producto === producto?.id_producto);
    const nuevos = existe ? favoritos.filter((p: any) => p.id_producto !== producto?.id_producto) : [...favoritos, producto];
    localStorage.setItem("favoritos", JSON.stringify(nuevos));
    setEsFavorito(!existe);
    window.dispatchEvent(new Event("favoritos-updated"));
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-pink-100 via-white to-green-100 px-16 pt-16 pb-24 flex flex-col gap-20">
        {/* Sección superior: imagen + detalles producto */}
        <div className="flex gap-16">
          <div className="flex-1 flex flex-col justify-center items-center mt-[100px]">
            <img
              src={imagenPrincipal}
              alt={producto.nombre_producto}
              className="w-[480px] h-[420px] object-contain"
            />
            <div className="flex gap-3 mt-4">
              {producto.imagenes.slice(1).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  className="w-14 h-14 rounded-full border border-gray-300"
                />
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center mt-[100px]">
            <h1 className="text-5xl font-bold text-black mb-3">
              {producto.nombre_producto}
            </h1>
            <p className="text-lg text-gray-600 mb-1">{producto.tipo_producto}</p>
            <p className="text-3xl font-black text-black mb-4">${producto.precio_producto}</p>

            <div className="mb-4">
              <div className="flex gap-4 mb-4">
                {producto.colores.map((c) => (
                  <button
                    key={c.id_color}
                    onClick={() => setColorSeleccionado(c.id_color)}
                    className={`w-11 h-18 rounded-full border-2 transition-all duration-300 ${
                      colorSeleccionado === c.id_color
                        ? "border-black scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: c.codigo_hex }}
                  ></button>
                ))}
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                {producto.tallas.map((t) => (
                  <button
                    key={t.id_talla}
                    onClick={() => setTallaSeleccionada(t.id_talla)}
                    className={`px-4 py-2 rounded-full text-sm border font-semibold transition-all duration-300 ${
                      tallaSeleccionada === t.id_talla
                        ? "bg-pink-500 text-white border-none"
                        : "bg-white text-black border-black"
                    }`}
                  >
                    {t.talla}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 items-center mb-6">
                <label className="text-gray-700 font-medium">Cantidad:</label>
                <button
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  className="w-8 h-8 rounded-full border hover:bg-pink-200"
                >
                  -
                </button>
                <span>{cantidad}</span>
                <button
                  onClick={() => setCantidad((c) => Math.min(stockDisponible, c + 1))}
                  className="w-8 h-8 rounded-full border hover:bg-green-200"
                >
                  +
                </button>
              </div>

              <div className="flex gap-4 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAgregarCarrito}
                  className="flex-1 bg-pink-500 text-white py-3 rounded-full font-semibold shadow-lg hover:bg-pink-600 transition flex items-center justify-center gap-2"
                >
                  Agregar al Carrito
                  <FaShoppingCart className="text-lg" />
                </motion.button>

                {producto.reserva_activa && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReservar}
                    className="flex-1 bg-white border-2 border-black text-black py-3 rounded-full font-semibold hover:bg-black hover:text-white transition"
                  >
                    Reservar
                  </motion.button>
                )}
              </div>

              {/* BOTÓN DE PERSONALIZAR */}
              {producto.personalizacion_activa === 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/personalizador", { state: { producto } })}
                  className="w-full bg-indigo-600 text-white py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition mb-4"
                >
                  Personalizar
                </motion.button>
              )}

              <motion.button
                onClick={toggleFavorito}
                whileTap={{ rotate: 360, scale: 1.3 }}
                className="p-3 rounded-full text-pink-500 text-3xl shadow-md hover:scale-110 transition-transform"
              >
                {esFavorito ? <FaHeart /> : <FaRegHeart />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Sección reseñas integrada */}
        <div className="w-full flex justify-center mt-[50px]">
          <div className="w-full max-w-3xl rounded-1xl shadow-2xl p-8 bg-white/60 backdrop-blur-md border border-pink-200">
            <ParticlesBackground />
            <ResenasProducto id_producto={producto.id_producto} usuario={usuario} />
          </div>
        </div>
      </div>
    </>
  );
}
