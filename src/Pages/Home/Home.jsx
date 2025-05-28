import React, { useState } from 'react';
import { BuscadorProductos } from '../../Components/BuscadorProducto.ts/BuscadorProducto';
import ChatWidget from '../../Components/ChatBot/ChatBot';
import indexWoman from '../../assets/images/women2.webp'; 
import { BotonReseñas } from '../../Components/BotonReseñas/BotonReseñas';
import { ModalReseñas } from '../../Components/ModalReseñas/ModalReseñas';

export const Home = () => {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="px-6 md:px-12 lg:px-20 py-10 space-y-12 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <img
          src={indexWoman}
          alt="Modelo principal"
          className="w-full max-w-md rounded-3xl shadow-xl mx-auto"
        />
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-gray-900">
            Encuentra tu <span className="text-pink-300">estilo ideal</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Zapatos de calidad para cada ocasión, diseñados para que te sientas único cada día.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="px-6 py-3 rounded-full border border-black text-black hover:bg-gray-100">
              Descubrir más
            </button>
            <button className="px-6 py-3 rounded-full bg-black text-white hover:bg-gray-900">
              Comprar ahora
            </button>
          </div>
        </div>
      </div>

      {/* Productos Destacados */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Productos Destacados
        </h2>
        <BuscadorProductos />
      </div>

      <ChatWidget />

      {/* BOTÓN DE RESEÑAS */}
      <div className="fixed bottom-6 right-6 z-50">
        <BotonReseñas onClick={() => setModalAbierto(true)} />
      </div>

      {/* MODAL DE RESEÑAS */}
      <ModalReseñas abierto={modalAbierto} cerrar={() => setModalAbierto(false)} />
    </div>
  );
};
