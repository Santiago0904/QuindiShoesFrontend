// src/pages/Favoritos.jsx
import React, { useEffect, useState } from "react";
import { CartaProducto } from "../../Components/CartaProducto/CartaProducto";
import { ParticlesBackground } from "../../Components/Particulas/ParticlesBackground";

export const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  // Escucha cambios en localStorage para actualizar la lista en tiempo real
  useEffect(() => {
    const cargarFavoritos = () => {
      const guardados = JSON.parse(localStorage.getItem("favoritos")) || [];
      setFavoritos(guardados);
    };
    cargarFavoritos();

    // Escuchar evento personalizado para sincronizar entre componentes
    window.addEventListener("favoritos-updated", cargarFavoritos);
    // Escuchar cambios directos en localStorage (por si hay varias pestañas)
    window.addEventListener("storage", cargarFavoritos);

    return () => {
      window.removeEventListener("favoritos-updated", cargarFavoritos);
      window.removeEventListener("storage", cargarFavoritos);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-x-hidden">
      <ParticlesBackground />
      <h1 className="text-4xl font-extrabold mb-6 mt-10 text-center bg-gradient-to-r from-pink-300 via-green-200 to-pink-200 bg-clip-text text-transparent drop-shadow-lg animate__animated animate__fadeInDown"
          style={{ color: "#a7f3d0" }} // verde pastel tailwind: green-200
      >
        🌸 Mis Productos Favoritos 🌿
      </h1>
      {favoritos.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 animate__animated animate__fadeInUp">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-100 via-pink-100 to-green-200 flex items-center justify-center shadow-lg mb-6 animate-bounce">
            <span className="text-6xl text-pink-300">💖</span>
          </div>
          <p className="text-xl text-green-600 font-semibold mb-2">¡Aún no tienes favoritos!</p>
          <p className="text-md text-pink-400">Agrega productos a favoritos tocando el <span className="inline-block align-middle"><svg className="inline" width="20" height="20" viewBox="0 0 20 20"><path fill="#ec4899" d="M10 18l-1.45-1.32C4.4 12.36 2 10.28 2 7.5 2 5.42 3.42 4 5.5 4c1.54 0 3.04.99 3.57 2.36h1.87C11.46 4.99 12.96 4 14.5 4 16.58 4 18 5.42 18 7.5c0 2.78-2.4 4.86-6.55 9.18L10 18z"/></svg></span> en cada producto.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4 animate__animated animate__fadeInUp">
          {favoritos.map((producto) => (
            <div
              key={producto.id_producto}
              className="animate__animated animate__zoomIn"
              style={{
                animationDelay: `${Math.random() * 0.3 + 0.1}s`,
                animationDuration: "0.7s",
              }}
            >
              <CartaProducto producto={producto} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


