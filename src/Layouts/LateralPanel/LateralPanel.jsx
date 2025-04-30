import React from 'react';
import { BtnPanelControl } from '../../Components/BtnPanelControl/BtnPanelControl';

export const LateralPanel = ({ onSelectSection }) => {
  return (
    <div className="space-y-15 flex flex-col items-center w-[280px] h-full bg-white shadow-lg ">
      <div className='mb-30 mt-6'>
        <BtnPanelControl color="purple" content="Perfil" onClick={() => onSelectSection('perfil')} />
      </div>
      <BtnPanelControl color="slate" content="Usuarios" onClick={() => onSelectSection('usuarios')} />
      <BtnPanelControl color="rose" content="Inventario" onClick={() => onSelectSection('inventario')} />
      <BtnPanelControl color="teal" content="Ventas" onClick={() => onSelectSection('ventas')} />
      <BtnPanelControl color="purple" content="Domicilios" onClick={() => onSelectSection('domicilios')} />
      <BtnPanelControl color="slate" content="Reservas" onClick={() => onSelectSection('reservas')} />
      <BtnPanelControl color="rose" content="Personalizacion" onClick={() => onSelectSection('personalizacion')} />
    </div>
  );
};
