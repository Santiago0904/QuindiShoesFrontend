import { GuardarPersonalizado } from "./GuardarPersonalizado";

export default function ZonaPersonalizar() {
  const { zonas, colores, materiales, personalizacion, setPersonalizacion } = GuardarPersonalizado();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Personaliza tu zapato</h2>
      {zonas.map((zona) => (
        <div key={zona.id_zonaProductos} className="mb-4">
          <h3 className="font-semibold">{zona.nombre_zona}</h3>
          
          <label className="block text-sm mt-1">Color:</label>
          <select
            className="w-full p-1 border rounded"
            value={personalizacion[zona.id_zonaProductos]?.colorId || ''}
            onChange={(e) =>
              setPersonalizacion(zona.id_zonaProductos, parseInt(e.target.value), personalizacion[zona.id_zonaProductos]?.materialId)
            }
          >
            <option value="">-- Selecciona color --</option>
            {colores.map((color) => (
              <option key={color.id_color} value={color.id_color}>
                {color.nombre_color}
              </option>
            ))}
          </select>

          <label className="block text-sm mt-1">Material:</label>
          <select
            className="w-full p-1 border rounded"
            value={personalizacion[zona.id_zonaProductos]?.materialId || ''}
            onChange={(e) =>
              setPersonalizacion(zona.id_zonaProductos, personalizacion[zona.id_zonaProductos]?.colorId, parseInt(e.target.value))
            }
          >
            <option value="">-- Selecciona material --</option>
            {materiales.map((mat) => (
              <option key={mat.id_material} value={mat.id_material}>
                {mat.nombre_material}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
