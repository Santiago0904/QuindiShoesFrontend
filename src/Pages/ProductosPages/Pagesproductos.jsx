import React, { useEffect, useState } from 'react';
import { MostrarProducto } from '../../Components/CartaProducto/CartaProducto';
import axiosClient from '../../api/axion';

export const Pagesproductos = () => {
  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState({
    nombre: '',
    color: '',
    precioMax: '',
    genero: '',
    tipo: '',
    ordenar: '',
  });

  // Obtener productos filtrados
  const obtenerProductosFiltrados = async () => {
    try {
      const { data } = await axiosClient.get('/producto/filtrados', {
        params: filtros,
      });
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos filtrados:', error);
    }
  };

  // Llamar cada vez que cambian los filtros
  useEffect(() => {
    obtenerProductosFiltrados();
  }, [filtros]);

  // Colores disponibles
  const colores = [
    { nombre: 'Negro', hex: 'black' },
    { nombre: 'Gris', hex: 'gray-500' },
    { nombre: 'Rojo', hex: 'red-500' },
    { nombre: 'Verde', hex: 'green-500' },
    { nombre: 'Azul', hex: 'blue-500' },
    { nombre: 'Morado', hex: 'purple-500' },
    { nombre: 'Rosa', hex: 'pink-400' },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 p-6 gap-6">
      {/* Panel lateral de filtros */}
      <div className="w-full lg:w-80 bg-white p-6 rounded-2xl shadow-lg h-fit">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Filtrar productos</h2>

        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar productos..."
          value={filtros.nombre}
          onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Colores */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-1 text-gray-700">Colores</p>
          <div className="flex gap-2 flex-wrap">
            {colores.map((color) => (
              <div
                key={color.hex}
                className={`w-6 h-6 rounded-full bg-${color.hex} border-2 ${
                  filtros.color === color.nombre ? 'border-black' : 'border-white'
                } shadow-md cursor-pointer`}
                onClick={() =>
                  setFiltros((prev) => ({
                    ...prev,
                    color: prev.color === color.nombre ? '' : color.nombre,
                  }))
                }
              />
            ))}
          </div>
        </div>

        {/* Precio */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-1 text-gray-700">Precio máximo</p>
          <input
            type="range"
            min={0}
            max={1000000}
            value={filtros.precioMax || 1000000}
            onChange={(e) => setFiltros({ ...filtros, precioMax: e.target.value })}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">Hasta: ${filtros.precioMax || '1.000.000'}</p>
        </div>

        {/* Marca (sin funcionalidad aún) */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-1 text-gray-700">Marca</p>
          <select
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
          >
            <option>Todas</option>
            <option>Nike</option>
            <option>Adidas</option>
          </select>
        </div>

        {/* Género */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-1 text-gray-700">Género</p>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            value={filtros.genero}
            onChange={(e) => setFiltros({ ...filtros, genero: e.target.value })}
          >
            <option value="">Todos</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Tipo de calzado */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-1 text-gray-700">Tipo de calzado</p>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            value={filtros.tipo}
            onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
          >
            <option value="">Todos</option>
            <option value="Tenis">Tenis</option>
            <option value="Sandalias">Sandalias</option>
            <option value="Botas">Botas</option>
          </select>
        </div>

        {/* Ordenar (solo decorativo por ahora) */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-1 text-gray-700">Ordenar por</p>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            value={filtros.ordenar}
            onChange={(e) => setFiltros({ ...filtros, ordenar: e.target.value })}
          >
            <option value="">Sin ordenar</option>
            <option value="precioAsc">Precio: menor a mayor</option>
            <option value="nombreAsc">Nombre: A-Z</option>
          </select>
        </div>
      </div>

      {/* Productos */}
      <div className="flex-1">
        <MostrarProducto productosProp={productos} />

      </div>
    </div>
  );
};
