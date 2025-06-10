import PersonalizadorCanvas from './PersonalizadorCanvas';
import ZonaPersonalizar from './ZonaPersonalizar';
import { GuardarPersonalizado } from './GuardarPersonalizado';

export default function PersonalizadorLayout() {
  const fetchData = GuardarPersonalizado((state) => state.fetchData);

  useEffect(() => {
    fetchData(); // Carga colores, materiales y zonas
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-100">
      {/* Vista 3D */}
      <div className="flex-1 h-1/2 md:h-full bg-white border-b md:border-b-0 md:border-r border-gray-300">
        <PersonalizadorCanvas />
      </div>

      {/* Panel de control lateral */}
      <div className="w-full md:w-80 p-4 overflow-y-auto bg-gray-50">
        <ZonaPersonalizar />
      </div>
    </div>
  );
}
