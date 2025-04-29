import React from 'react';
import { TopsProductos } from '../../Components/TopsProdcutos/TopsProductos';
import { BtnPanelControl } from '../../Components/BtnPanelControl/BtnPanelControl';
import { LateralPanel } from '../../Layouts/LateralPanel/LateralPanel';
import { SuperiorPanel } from '../../Layouts/SuperiorPanel/SuperiorPanel';

export const PanelControl = () => {
  return (
    <div className="grid grid-cols-[280px_1fr] grid-rows-[auto_1fr] min-h-screen bg-[#f5fafa]">
      
      {/* Sidebar izquierdo */}
      <div className="row-span-2 bg-white shadow-md">
        <LateralPanel />
      </div>

      {/* Header superior */}
      <div className="p-6">
        <SuperiorPanel />
      </div>

      {/* Contenido principal */}
      <div className="p-6 grid grid-cols-4 grid-rows-[auto_auto_1fr] gap-4">
        
        {/* Tarjetas estadísticas superiores */}
        <div className="col-span-4 grid grid-cols-4 gap-4">
          <BtnPanelControl color="rose" content="COORD. HOY" />
          <BtnPanelControl color="slate" content="COORD. SEMANA" />
          <BtnPanelControl color="teal" content="CARGOS" />
          <BtnPanelControl color="purple" content="COBROS" />
        </div>

        {/* Métricas con gráfico */}
        <div className="col-span-3 bg-white rounded-xl p-4 shadow-md">
          <h1 className="text-xl font-semibold mb-2">Métricas</h1>
          <TopsProductos color="#E5F1F0" />
        </div>

        {/* Card lateral derecha */}
        <div className="p-4 ">
          <TopsProductos color="#e9f4f1" />
        </div>

        {/* Cards inferiores */}
        <div className="col-span-4 grid grid-cols-4 gap-4">
          <TopsProductos color="#eef0fc" />
          <TopsProductos color="#f3e7ef" />
          <TopsProductos color="#d7f0ea" />
          <TopsProductos color="#fde9ea" />
        </div>
      </div>
    </div>
  );
};
