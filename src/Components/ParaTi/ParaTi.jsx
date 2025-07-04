// ParaTi.jsx
import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axion";
import { CartaProducto } from "../CartaProducto/CartaProducto";
import { motion } from "framer-motion";
import { FaRegSadTear } from "react-icons/fa";

export const ParaTi = ({ userId }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
console.log("📦 userId recibido en ParaTi:", userId);
  useEffect(() => {
  if (!userId) return;

  setLoading(true);
  axiosClient
    .get(`/api/recomendados/${userId}`)
    .then(res => {
      console.log("📦 Productos recomendados:", res.data); // <-- Agrega esto
      setProductos(res.data);
    })
    .catch(() => setProductos([]))
    .finally(() => setLoading(false));
}, [userId]);
  const MensajeInfo = ({ mensaje }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-16 px-6 rounded-xl bg-gradient-to-br from-pink-50 to-green-50 shadow-md"
    >
      <FaRegSadTear className="text-6xl text-pink-300 mb-4 animate-bounce" />
      <p className="text-lg text-gray-500 text-center font-medium max-w-md">
        {mensaje}
      </p>
    </motion.div>
  );

  if (!userId) {
    return (
      <div className="my-12 px-4 sm:px-8">
        <h2 className="text-3xl font-bold text-center text-pink-500 mb-10">
          Recomendados para ti
        </h2>
        <MensajeInfo mensaje="Inicia sesión para descubrir productos recomendados especialmente para ti. ❤️" />
      </div>
    );
  }

  return (
    <div className="my-12 px-4 sm:px-8">
      <h2 className="text-3xl font-bold text-center text-pink-500 mb-10">
        Recomendados para ti
      </h2>

      {loading ? (
        <div className="text-center text-gray-400 py-10">Cargando recomendaciones...</div>
      ) : productos.length === 0 ? (
        <MensajeInfo mensaje="No hay recomendaciones disponibles por ahora. ¡Sigue explorando y pronto aparecerán! 🌟" />
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {productos.map(producto => (
            <motion.div
              key={producto.id_producto}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CartaProducto producto={producto} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
