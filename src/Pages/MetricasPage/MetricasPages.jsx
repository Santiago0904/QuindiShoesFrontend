import React from 'react';
import { TopsProductos } from '../../Components/TopsProdcutos/TopsProductos';
import { BtnPanelControl } from '../../Components/BtnPanelControl/BtnPanelControl';

export const MetricasPages = () => {
  return (
    <div className="min-h-screen bg-[#f5fafa] p-6">
      {/* Contenedor principal con altura ajustada */}
      <div className="grid grid-cols-3 gap-4"> {/* Reduje el gap a 4 */}
        {/* Columna izquierda - Métricas principales */}
        <div className="col-span-2 space-y-4"> {/* Reduje el space-y a 4 */}
          {/* Fila de botones más compacta */}
          <div className="grid grid-cols-4 gap-3"> {/* Reduje el gap a 3 */}
            <BtnPanelControl color="purple" content="COBROS" className="h-12" /> {/* Reduje altura a h-12 */}
            <BtnPanelControl color="teal" content="CARGOS" className="h-12" />
            <BtnPanelControl color="slate" content="COORD. SEMANA" className="h-12" />
            <BtnPanelControl color="rose" content="COORD. HOY" className="h-12" />
          </div>

          {/* Sección de métricas con altura controlada */}
          <div className="bg-white rounded-xl p-4 shadow-md min-h-[300px]"> {/* Reduje padding y añadí altura mínima */}
            <h1 className="text-lg font-semibold mb-3">Métricas</h1> {/* Texto más pequeño */}
            <div className="h-150"> {/* Contenedor con altura calculada */}
              <TopsProductos color="#E5F1F0" className="h-full" />
            </div>
          </div>
        </div>

        {/* Columna derecha - 3 tarjetas verticales más compactas */}
        <div className="col-span-1 space-y-30"> {/* Reduje el space-y a 3 */}
          <TopsProductos color="#e9f4f1" className="h-[32%]" /> {/* Alturas porcentuales */}
          <TopsProductos color="#eef0fc" className="h-[32%]" />
       
        </div>

        {/* Tarjetas inferiores más compactas */}
        <div className="col-span-3 grid grid-cols-3 gap-4 mt-4"> {/* Reduje gap y añadí margen top */}
          <TopsProductos color="#f5f5f5" className="h-40" /> {/* Altura fija */}
          <TopsProductos color="#d7f0ea" className="h-40" />
          <TopsProductos color="#fde9ea" className="h-40" />
        </div>
      </div>
    </div>
  );
};