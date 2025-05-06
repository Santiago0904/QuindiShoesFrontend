import React from 'react';

type Props = {
  onClick: () => void;
};

export const BotonReseñas = ({ onClick }: Props) => {
  return (
    <div className="cursor-pointer flex items-center" onClick={onClick}>
      <span className="text-xl mr-2">⭐️⭐️⭐️⭐️⭐️</span>
      <span className="font-semibold">Reseñas</span>
    </div>
  );
};

