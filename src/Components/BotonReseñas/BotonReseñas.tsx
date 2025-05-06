import React from 'react';

interface Props {
  onClick: () => void;
}

export const BotonReseñas: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-500 transition"
    >
      ⭐⭐⭐⭐⭐ Reseñas
    </button>
  );
};

