import { useEffect } from 'react';
import { GuardarPersonalizado } from '../../Components/Personalizador3D/GuardarPersonalizado';
import PersonalizadorCanvas from '../../Components/Personalizador3D/PersonalizadorCanvas';
import ZonaPersonalizar from '../../Components/Personalizador3D/ZonaPersonalizar';

export default function PersonalizadorLayout() {
  const fetchData = GuardarPersonalizado((state) => state.fetchData);

  useEffect(() => {
    fetchData(); // Carga colores y materiales
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-100">
      <div className="flex-1 h-1/2 md:h-full bg-white border-b md:border-b-0 md:border-r border-gray-300">
        <PersonalizadorCanvas />
      </div>
      <div className="w-full md:w-80 p-4 overflow-y-auto bg-gray-50">
        <ZonaPersonalizar />
      </div>
    </div>
  );
}
