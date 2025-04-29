import React from 'react';
import { BtnPanelControl } from '../../Components/BtnPanelControl/BtnPanelControl';

export const LateralPanel = () => {
  return (
    <div className="space-y-20 flex flex-col items-center  w-[280px] h-[100vh] bg-white shadow-lg">
      <div className='mb-40 mt-6'>
      <BtnPanelControl  color="purple" content="Perfil" />
      </div>
      <BtnPanelControl color="slate" content="Usuarios" />
      <BtnPanelControl color="rose" content="Inventario" />
      <BtnPanelControl color="teal" content="Ventas" />
      <BtnPanelControl color="purple" content="Domicilios" />
      <BtnPanelControl color="slate" content="Reservas" />
    </div>
  );
};
