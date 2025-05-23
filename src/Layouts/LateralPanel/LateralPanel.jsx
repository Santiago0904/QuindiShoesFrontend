import React from 'react';
import { BtnPanelControl } from '../../Components/BtnPanelControl/BtnPanelControl';
import userIcon from '../../assets/images/meme-shitpost.gif'; // Iconos personalizados como en la imagen
import productIcon from '../../assets/images/67db34d77521e6de2491f7d5051a109c.jpg';
import ventasIcon from '../../assets/images/artworks-IiwL2PchxdsduPxo-Zfp2zQ-t240x240.jpg';
import mesrivasIcon from '../../assets/images/atars.jpeg';
import mietasIcon from '../../assets/images/b5nmfD1C_400x400.jpg';
import reservaIcon from '../../assets/images/cover256x256-5b5eca22d3894d5ca7034cb3b0561b62.jpg';

export const LateralPanel = ({ onSelectSection }) => {
  const sections = [
    { title: 'Usuarios', bgColor: 'bg-[#fcd9d9]', icon: userIcon, key: 'usuarios' },
    { title: 'Productos', bgColor: 'bg-[#c9ece4]', icon: productIcon, key: 'inventario' },
    { title: 'Ventas', bgColor: 'bg-[#f2eee9]', icon: ventasIcon, key: 'ventas' },
    { title: 'Mesrivas', bgColor: 'bg-white', icon: mesrivasIcon, key: 'mesrivas' },
    { title: 'Mietas', bgColor: 'bg-[#fcd9d9]', icon: mietasIcon, key: 'domicilios' },
    { title: 'Reservatios', bgColor: 'bg-[#161c23]', icon: reservaIcon, key: 'reservas', textColor: 'text-white' }
  ];

  return (
    <div className="grid grid-cols-3 gap-6 p-10 rounded-3xl ">
      {sections.map(({ title, icon, bgColor, key, textColor }) => (
        <BtnPanelControl
          key={key}
          title={title}
          icon={icon}
          bgColor={`${bgColor} ${textColor || ''}`}
          onClick={() => onSelectSection(key)}
        />
      ))}
    </div>
  );
};
