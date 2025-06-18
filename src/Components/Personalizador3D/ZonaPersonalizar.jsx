import { GuardarPersonalizado } from "./GuardarPersonalizado";
import { zonaDisplayNames, zonaMap } from "../PersonalizadorUtils/utils";
import axiosClient from "../../api/axion";

export default function ZonaPersonalizar() {
  const { colores, personalizacion, setPersonalizacion } = GuardarPersonalizado();

  const zonasModelo = Object.entries(zonaMap).map(([nombre_malla, id_zona]) => ({
    id_zona,
    nombre_malla,
    display: zonaDisplayNames[nombre_malla] || nombre_malla,
  }));

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-xl shadow-lg p-6 space-y-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center tracking-tight">
        Personaliza tu zapato
      </h2>
      <div className="divide-y divide-gray-100">
        {zonasModelo.map((zona) => (
          <div key={zona.id_zona} className="py-4 flex flex-col gap-2">
            <span className="font-medium text-gray-700">{zona.display}</span>
            <select
              className="w-full px-3 py-2 rounded-md border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={personalizacion[zona.id_zona]?.colorId || ''}
              onChange={(e) => {
                setPersonalizacion(
                  zona.id_zona,
                  parseInt(e.target.value),
                  undefined // Material ya no se usa
                );
              }}
            >
              <option value="">Selecciona color</option>
              {colores.map((color) => (
                <option key={color.id_color} value={color.id_color}>
                  {color.nombre_color}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button
        className="w-full mt-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        onClick={async () => {
          // Extrae los nombres de color seleccionados correctamente
          const coloresSeleccionados = Object.values(personalizacion)
            .map(zona => {
              // Busca el color seleccionado en el array de colores
              const color = colores.find(c => c.id_color === zona.colorId);
              return color?.nombre_color;
            })
            .filter(Boolean);

          await axiosClient.post("/color/sumar-uso", { colores: coloresSeleccionados });
          alert("¡Personalización guardada!");
        }}
      >
        Guardar Personalización
      </button>
    </div>
  );
}
