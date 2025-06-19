// ParaTi.jsx
import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axion";
import { CartaProducto } from "../CartaProducto/CartaProducto";

export const ParaTi = ({ userId }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    axiosClient
      .get(`/api/recomendados/${userId}`)
      .then(res => setProductos(res.data))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Para ti</h2>
      {loading ? (
        <div className="text-center text-gray-400 py-10">Cargando recomendaciones...</div>
      ) : productos.length === 0 ? (
        <div className="text-center text-gray-400 py-10">No hay recomendaciones por ahora.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productos.map(producto => (
            <CartaProducto key={producto.id_producto} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
};