import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const agrupaciones = ['dia', 'semana', 'mes', 'anio'] as const;

export default function VentasPorRango() {
  const [agrupacion, setAgrupacion] = useState<'dia' | 'semana' | 'mes' | 'anio'>('anio');
  const [datos, setDatos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/metricas/ventas?agrupacion=${agrupacion}`);
        setDatos(res.data);
      } catch (err) {
        console.error('Error al obtener datos de métricas:', err);
      }
      setLoading(false);
    };

    cargarDatos();
  }, [agrupacion]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Ventas por {agrupacion}</h2>

      <div className="mb-4">
        <label className="font-semibold mr-2">Agrupación:</label>
        <select
          className="border rounded px-2 py-1"
          value={agrupacion}
          onChange={(e) => setAgrupacion(e.target.value as typeof agrupacion)}
        >
          {agrupaciones.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={agrupacion === 'anio' ? 'anio' : agrupacion === 'mes' ? 'mes' : 'fecha'} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_ventas" fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
