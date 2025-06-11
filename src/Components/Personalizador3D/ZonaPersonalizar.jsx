import { GuardarPersonalizado } from "./GuardarPersonalizado";
import { zonaDisplayNames, zonaMap } from "../PersonalizadorUtils/utils";

export default function ZonaPersonalizar() {
  const { colores, materiales, personalizacion, setPersonalizacion } = GuardarPersonalizado();

  const zonasModelo = Object.entries(zonaMap).map(([nombre_malla, id_zona]) => ({
    id_zona,
    nombre_malla,
    display: zonaDisplayNames[nombre_malla] || nombre_malla,
  }));

  // Log para ver el estado de personalización y colores
  console.log("personalizacion:", personalizacion);
  console.log("colores:", colores);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Personaliza tu zapato</h2>
      {zonasModelo.map((zona) => (
        <div key={zona.id_zona} className="mb-4">
          <h3 className="font-semibold">{zona.display}</h3>
          <label className="block text-sm mt-1">Color:</label>
          <select
            className="w-full p-1 border rounded"
            value={personalizacion[zona.id_zona]?.colorId || ''}
            onChange={(e) => {
              console.log(
                "Seleccionado colorId:",
                e.target.value,
                "para zonaId:",
                zona.id_zona
              );
              setPersonalizacion(
                zona.id_zona,
                parseInt(e.target.value),
                personalizacion[zona.id_zona]?.materialId
              );
            }}
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
            value={personalizacion[zona.id_zona]?.materialId || ''}
            onChange={(e) =>
              setPersonalizacion(
                zona.id_zona,
                personalizacion[zona.id_zona]?.colorId,
                parseInt(e.target.value)
              )
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
