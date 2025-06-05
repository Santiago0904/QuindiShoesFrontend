import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ParticlesBackground } from '../../Components/Particulas/ParticlesBackground';

export const HistorialFacturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [facturaActivaId, setFacturaActivaId] = useState(null);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const res = await fetch("http://localhost:3000/producto/facturas");
        const data = await res.json();
        const formateadas = data.map(f => ({
          ...f,
          contenido_factura: typeof f.contenido_factura === 'string' ? JSON.parse(f.contenido_factura) : f.contenido_factura,
        }));
        setFacturas(formateadas);
      } catch (error) {
        console.error("Error al obtener facturas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacturas();
  }, []);

  const toggleFactura = (id) => {
    setFacturaActivaId(prev => (prev === id ? null : id));
  };
  if (loading) return <div className="text-center mt-10 text-blue-400 font-semibold text-lg animate-pulse">Cargando historial... un momento por favor.</div>;

  return (
    
      <div className=" relative z-10 py-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto bg-white bg-opacity-90 shadow-xl rounded-3xl p-8 transform transition-transform duration-500 hover:scale-[1.005]">
          <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10 tracking-wide">
            📊 Tu Historial de Ventas 📊
          </h2>

          {facturas.length === 0 ? (
            <div className="text-center text-gray-600 p-6 bg-blue-50 bg-opacity-70 rounded-xl border border-blue-200">
              <p className="text-xl mb-4">No se encontraron registros de compras.</p>
              <p className="text-md">¡Explora nuestros productos para empezar a llenar tu historial!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {facturas.map((factura) => {
                const activa = facturaActivaId === factura.id;
                return (
                  <div
                    key={factura.id}
                    className="bg-gradient-to-r from-blue-100 to-green-100 bg-opacity-80 border border-blue-200 rounded-2xl p-6 shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:border-green-300 transform hover:-translate-y-1"
                    onClick={() => toggleFactura(factura.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-xl text-blue-800 mb-2">Factura #{factura.id}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm text-gray-700">
                          <p><span className="font-semibold text-blue-700">Valor Total:</span> <span className="text-green-600 font-bold text-base">${factura.valor}</span></p>
                          <p><span className="font-semibold text-blue-700">Método de Pago:</span> {factura.metodo_pago}</p>
                          <p><span className="font-semibold text-blue-700">Moneda:</span> {factura.moneda}</p>
                          <p><span className="font-semibold text-blue-700">ID Transacción:</span> {factura.transaction_id || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                         <span className={`text-sm px-4 py-1.5 rounded-full font-semibold shadow-sm transition-colors duration-300
                           ${factura.estado === 'Aceptada'  ? 'bg-green-200 text-green-700 ring-1 ring-green-300'
                             : factura.estado === 'Rechazada' ? 'bg-red-200 text-red-700 ring-1 ring-red-300'
                             : 'bg-yellow-200 text-yellow-700 ring-1 ring-yellow-300'}`}>
                           {factura.estado}
                         </span>
                         <ChevronDownIcon
                           className={`w-6 h-6 text-blue-500 transform transition-transform duration-300 ${activa ? 'rotate-180' : 'rotate-0'}`}
                         />
                      </div>
                    </div>

                    {/* Expanded Detail with Animation */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activa ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                      <h3 className="text-lg font-semibold text-green-600 mb-4 border-b border-green-200 pb-2">Productos Comprados:</h3>
                      <div className="space-y-3">
                        {Array.isArray(factura.contenido_factura) && factura.contenido_factura.map((item, i) => (
                          <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between transform transition-transform duration-200 hover:scale-[1.01]">
                            <div className="flex items-center gap-4">
                              {item.imagen && (
                                <img
                                  src={item.imagen}
                                  alt={item.nombre_producto}
                                  className="w-20 h-20 object-cover rounded-lg border border-blue-100 shadow-sm transition-transform duration-300 hover:scale-105"
                                />
                              )}
                              <div>
                                <p className="text-gray-900 font-semibold text-lg">{item.nombre_producto}</p>
                                <p className="text-sm text-gray-500">Talla: <span className="font-medium text-blue-500">{item.talla}</span> | Cantidad: <span className="font-medium text-green-500">{item.cantidad}</span></p>
                              </div>
                            </div>
                            <p className="text-green-600 font-bold text-lg">${item.precio_producto}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    
  );
};