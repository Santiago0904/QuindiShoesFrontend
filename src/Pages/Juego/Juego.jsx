import React, {useState, useEffect, useCallback} from 'react';
import FlappyBirdGame from '../../Layouts/Juego/Juego';
import { motion, AnimatePresence } from 'framer-motion';
import axiosClient from '../../api/axion';

export const Juego = () => {
  const [topJugadores, setTopJugadores] = useState([]);
  

  const obtenerTopJugadores = useCallback(async () => {
    try {
      const res = await axiosClient.get("/juego");
      setTopJugadores(res.data[0]?.slice(0, 10) || []);
    } catch (error) {
      console.error("Error al obtener el top:", error);
    }
  }, []);

  useEffect(() => {
    obtenerTopJugadores();
  }, [obtenerTopJugadores]);


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-amber-100 to-sky-100 text-gray-800 px-4 py-10 font-sans">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-12">

        {/* Contenedor del juego */}
        <div className="flex items-center justify-center rounded-xl shadow-lg bg-white p-4 border border-gray-200">
          <FlappyBirdGame onGameOver={obtenerTopJugadores}/>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-center text-rose-500 tracking-wide drop-shadow-sm">
          🐊 Flappy Gator
        </h1>

        {/* Ranking real */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full max-w-xl bg-white rounded-xl shadow-lg border-2 border-amber-300 p-6"
        >
          <h2 className="text-2xl font-semibold text-center text-orange-400 mb-4">
            🏆 ¡Top Aventureros!
          </h2>
          <ul className="space-y-3 max-h-[520px] overflow-y-auto scroll-invisible">
            <AnimatePresence>
              {topJugadores.length === 0 ? (
                <motion.li
                  key="no-score"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-400"
                >
                  No hay puntajes aún.
                </motion.li>
              ) : (
                topJugadores.map((player, idx) => (
                  <motion.li
                    layout
                    key={player.usuarioId || idx}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="flex justify-between items-center px-5 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 transition border border-amber-200"
                  >
                    <span className="font-medium text-amber-700 text-lg">
                      {idx + 1}. {player.nombre || player.username || 'Jugador'}
                    </span>
                    <span className="text-amber-500 font-bold">{player.record} pts</span>
                  </motion.li>
                ))
              )}
            </AnimatePresence>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};
