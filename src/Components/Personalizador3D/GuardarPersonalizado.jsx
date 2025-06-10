import { create } from 'zustand';
import axiosClient from '../../api/axion'; // Usa tu cliente axios configurado

export const GuardarPersonalizado = create((set, get) => ({
  zonas: [],
  colores: [],
  materiales: [],
  personalizacion: {},

  // Carga todos los datos del backend usando axiosClient
  fetchData: async () => {
    try {
      const [resZonas, resColores, resMateriales] = await Promise.all([
        axiosClient.get('/obtenerZonaProducto'),
        axiosClient.get('/obtenerColores'),
        axiosClient.get('/obtenerMateriales'),
      ]);

      set({
        zonas: resZonas.data,
        colores: resColores.data,
        materiales: resMateriales.data,
      });
    } catch (error) {
      console.error('Error al cargar datos del backend:', error);
    }
  },

  // Establece color y material para una zona específica
  setPersonalizacion: (zonaId, colorId, materialId) => {
    const current = get().personalizacion;
    set({
      personalizacion: {
        ...current,
        [zonaId]: {
          colorId,
          materialId,
        },
      },
    });
  },

  // Para enviar al backend (opcional por ahora)
  getPersonalizacionPayload: () => {
    const { personalizacion } = get();
    return Object.entries(personalizacion).map(([zonaId, { colorId, materialId }]) => ({
      zonaId: parseInt(zonaId),
      colorId,
      materialId,
    }));
  },
}));
