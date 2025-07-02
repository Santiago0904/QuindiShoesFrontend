// src/pages/HistorialPersonalizaciones.jsx
import { useEffect, useState } from "react";
import axiosClient from "../../api/axion";
import VisorModeloGLB from "../../Components/VisorModeloGLB/VisorModeloGLB";

export const HistorialPersonalizaciones = () => {
  const [modelos, setModelos] = useState([]);

  const BASE_URL = "http://localhost:3000";
  useEffect(() => {
    const id_usuario = localStorage.getItem("id");
    if (!id_usuario) return;

    axiosClient
      .get(`/personalizacion/historialGLB/${id_usuario}`)
      .then((res) => {
        setModelos(res.data || []);
      })
      .catch((err) => {
        console.error("Error al obtener modelos:", err);
      });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Historial de Personalizaciones</h1>

        {modelos.length === 0 ? (
        <p className="text-gray-600">No tienes personalizaciones guardadas.</p>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modelos.map((modelo) => (
            <div
                key={modelo.id}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
            >
                <VisorModeloGLB url={`${BASE_URL}/personalizacion/modelo/${modelo.id}`} />
                <p className="mt-2 text-sm text-gray-500">
                Modelo #{modelo.id}
                </p>
            </div>
            ))}
        </div>
        )}

    </div>
  );
};
