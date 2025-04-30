import React, { useState } from 'react';
import { TopsProductos } from '../../Components/TopsProdcutos/TopsProductos';
import { BtnPanelControl } from '../../Components/BtnPanelControl/BtnPanelControl';
import { LateralPanel } from '../../Layouts/LateralPanel/LateralPanel';
import { SuperiorPanel } from '../../Layouts/SuperiorPanel/SuperiorPanel';
import { ListaProductos } from '../Productos/Productos';
import { ListaEmpleados } from '../Empleados/Empleados';
import { MetricasPages } from '../MetricasPage/MetricasPages';

export const PanelControl = () => {
  const [seccionSeleccionada, setSeccionSeleccionada] = useState('perfil');

  const renderContenido = () => {
    switch (seccionSeleccionada) {
      case 'perfil':
        return <div className="text-xl">Contenido del perfil</div>;
      case 'usuarios':
        return <div className="text-xl"><ListaEmpleados/></div>;
      case 'inventario':
        return <div className="text-xl"><ListaProductos/></div>;
      case 'ventas':
        return <div className="text-xl"><MetricasPages /></div>;
      case 'domicilios':
        return <div className="text-xl">Módulo de domicilios</div>;
      case 'reservas':
        return <div className="text-xl">Gestión de reservas</div>;
      case 'personalizacion':
        return <div className="text-xl">Gestión de Personalizacion</div>;
      default:
        return <div className="text-xl">Seleccione una opción</div>;
    }
  };

  return (
    <div className="grid grid-cols-[280px_1fr] grid-rows-[auto_1fr] min-h-screen bg-[#f5fafa]">
      
      {/* Sidebar izquierdo */}
      <div className="row-span-2 bg-white shadow-md">
        <LateralPanel onSelectSection={setSeccionSeleccionada} />
      </div>

      {/* Contenido principal dinámico */}
      <div className="p-6">
        {renderContenido()}
      </div>
    </div>
  );
};
