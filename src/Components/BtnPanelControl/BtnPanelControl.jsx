import React from 'react';

const colorClasses = {
  purple: 'bg-purple-50',
  slate: 'bg-slate-300',
  rose: 'bg-rose-50',
  teal: 'bg-teal-100',
};

export const BtnPanelControl = ({ color, content, onClick }) => {
  const bgColorClass = colorClasses[color] || 'bg-gray-500';

  return (
    <button
      onClick={onClick}
      className={`${bgColorClass} text-black px-4 py-2 w-40 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105`}
    >
      {content}
    </button>
  );
};
