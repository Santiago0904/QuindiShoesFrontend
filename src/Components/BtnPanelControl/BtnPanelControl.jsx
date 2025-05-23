import React from 'react';
import { motion } from 'framer-motion';

export const BtnPanelControl = ({ icon, title, bgColor, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex flex-col items-center justify-center rounded-3xl p-5 h-[380px] w-[360px] cursor-pointer transition-all shadow-md ${bgColor}`}
      onClick={onClick}
    >
      <div className="mb-2">
        <img src={icon} alt={title} className="w-70 h-50" />
      </div>
      <h3 className="font-semibold text-neutral-800 text-[30px]">{title}</h3>
    </motion.div>
  );
};
