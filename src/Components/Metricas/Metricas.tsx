import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const agrupaciones = ['dia', 'semana', 'mes', 'año'] as const;

export default function VentasPorRango() {
  const [agrupacion, setAgrupacion] = useState<'dia' | 'semana' | 'mes' | 'año'>('año');
  const [datos, setDatos] = useState<any[]>([]);
  const [topProductosMas, setTopProductosMas] = useState<any[]>([]);
  const [topProductosMenos, setTopProductosMenos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [productosInactivos, setProductosInactivos] = useState<any[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/metricas/ventas?agrupacion=${agrupacion}`);
        const datosFormateados = res.data.map((item: any) => {
          if (agrupacion === 'dia' && item.fecha) {
            const fechaObj = new Date(item.fecha);
            const fechaFormateada = fechaObj.toISOString().split('T')[0];
            return { ...item, fecha: fechaFormateada };
          }
          return item;
        });
        setDatos(datosFormateados);
      } catch (err) {
        console.error('Error al obtener datos de ventas:', err);
      }
      setLoading(false);
    };
    cargarDatos();
  }, [agrupacion]);

  useEffect(() => {
    const cargarTopProductos = async () => {
      try {
        const [masRes, menosRes] = await Promise.all([
          axios.get('http://localhost:3000/metricas/top-productos?tipo=mas&limite=5'),
          axios.get('http://localhost:3000/metricas/top-productos?tipo=menos&limite=5')
        ]);
        setTopProductosMas(masRes.data);
        setTopProductosMenos(menosRes.data);
      } catch (err) {
        console.error('Error al obtener top productos:', err);
      }
    };
    cargarTopProductos();
  }, []);

useEffect(() => {
  const cargarInactivos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/metricas/productos-inactivos');
      setProductosInactivos(res.data);
    } catch (err) {
      console.error('Error al obtener productos inactivos:', err);
    }
  };
  cargarInactivos();
}, []);


  const dataKeyX = agrupacion === 'año' ? 'año' : agrupacion === 'mes' ? 'mes' : 'fecha';
  const colorVerdePastel = '#D4F6DB';
  const colorRosaPastel = '#F7D6E0';

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">Ventas por {agrupacion.toUpperCase()}</h2>

      <div className="mb-8 flex justify-center">
        <label className="font-semibold text-gray-700 mr-3 text-lg">Agrupación:</label>
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out"
          value={agrupacion}
          onChange={(e) => setAgrupacion(e.target.value as typeof agrupacion)}
        >
          {agrupaciones.map((a) => (
            <option key={a} value={a} className="text-gray-800">{a.charAt(0).toUpperCase() + a.slice(1)}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-gray-600 text-lg animate-pulse font-medium">Cargando datos del informe...</p>
        </div>
      ) : (
        <>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datos} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
                <XAxis dataKey={dataKeyX} tickLine={false} axisLine={{ stroke: '#ccc', strokeWidth: 1 }} />
                <YAxis tickLine={false} axisLine={{ stroke: '#ccc', strokeWidth: 1 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  labelStyle={{ color: '#555', fontWeight: 'bold' }}
                  itemStyle={{ color: '#333' }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="total_ventas" fill="#60A5FA" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
            {/* Top Productos Más Vendidos */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
                <span className="text-green-600 text-3xl">🚀</span> Top Productos Más Vendidos
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {topProductosMas.map((prod, index) => (
                  <div
                    key={prod.id}
                    className="relative flex items-center gap-5 bg-white p-5 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out border-2 border-transparent hover:border-green-400"
                    style={{ backgroundColor: colorVerdePastel }}
                  >
                    <div className="absolute -top-3 -left-3 bg-green-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold shadow-md transform rotate-[-10deg]">
                      {index + 1}
                    </div>
                    <img
                      src={prod.imagen_producto}
                      alt={prod.nombre}
                      className="w-24 h-24 object-cover rounded-xl shadow-md border border-gray-200 flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <h4 className="font-extrabold text-xl text-gray-800 mb-1 leading-tight truncate">{prod.nombre}</h4>
                      <p className="text-md text-gray-700">
                        Cantidad Vendida: <span className="font-bold text-green-700 text-lg">{prod.total_vendido}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Productos Menos Vendidos */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
                <span className="text-red-500 text-3xl">📉</span> Top Productos Menos Vendidos
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {topProductosMenos.map((prod, index) => (
                  <div
                    key={prod.id}
                    className="relative flex items-center gap-5 bg-white p-5 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out border-2 border-transparent hover:border-red-400"
                    style={{ backgroundColor: colorRosaPastel }}
                  >
                    <div className="absolute -top-3 -left-3 bg-red-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold shadow-md transform rotate-[-10deg]">
                      {index + 1}
                    </div>
                    <img
                      src={prod.imagen_producto}
                      alt={prod.nombre}
                      className="w-24 h-24 object-cover rounded-xl shadow-md border border-gray-200 flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <h4 className="font-extrabold text-xl text-gray-800 mb-1 leading-tight truncate">{prod.nombre}</h4>
                      <p className="text-md text-gray-700">
                        Cantidad Vendida: <span className="font-bold text-red-700 text-lg">{prod.total_vendido}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <div className="mt-20">
  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
    <span className="text-gray-500 text-3xl">🕸️</span> Productos Inactivos (Nunca Vendidos)
  </h3>

  {productosInactivos.length === 0 ? (
    <p className="text-center text-green-600 font-semibold text-lg">¡Todos los productos han sido vendidos al menos una vez! 🎉</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left">Imagen</th>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Nombre</th>
            <th className="py-3 px-4 text-left">Precio</th>
            <th className="py-3 px-4 text-left">Stock</th>
          </tr>
        </thead>
    <tbody>
  {productosInactivos.map((producto) => (
    console.log(producto),
  
    <tr key={producto.id} className="border-t hover:bg-gray-50 transition">
        <td className="py-3 px-4">
          <img src={producto.url_imagen} alt={producto.url_imagen} className="w-16 h-16 object-cover rounded-md" />
        </td>
      <td className="py-3 px-4">{producto.id_producto}</td>
      <td className="py-3 px-4">{producto.nombre_producto}</td>
      <td className="py-3 px-4">
        {producto.precio_producto !== undefined ? `$${producto.precio_producto.toFixed(2)}` : 'N/A'}
      </td>
      <td className="py-3 px-4">{producto.stock ?? 0}</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  )}
</div>
    </div>
  );
}