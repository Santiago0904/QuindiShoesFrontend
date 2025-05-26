import React from 'react';
import FlappyBirdGame from '../../Layouts/Juego/Juego';
import { motion } from 'framer-motion';

export const Juego = () => {
  const rankings = [
    { name: 'CocoLoco', score: 120 },
    { name: 'SaltaJuan', score: 98 },
    { name: 'PepeBrinco', score: 85 },
    { name: 'NataFly', score: 78 },
    { name: 'BrincaZoom', score: 60 }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-amber-100 to-sky-100 text-gray-800 px-4 py-10 font-sans">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-12">


        {/* Contenedor del juego */}
        <div className="flex items-center justify-center rounded-xl shadow-lg bg-white p-4 border border-gray-200">
          <FlappyBirdGame />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-center text-rose-500 tracking-wide drop-shadow-sm">
          🐊 Flappy Gator
        </h1>

        {/* Ranking infantil */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full max-w-xl h-[700px] bg-white rounded-xl shadow-lg border-2 border-amber-300 p-6"
        >
          <h2 className="text-2xl font-semibold text-center text-orange-400 mb-4">
            🏆 ¡Top Aventureros!
          </h2>
          <ul className="space-y-3 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
            {rankings.map((player, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center px-5 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 transition border border-amber-200"
              >
                <span className="font-medium text-amber-700 text-lg">
                  {idx + 1}. {player.name}
                </span>
                <span className="text-amber-500 font-bold">{player.score} pts</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};
