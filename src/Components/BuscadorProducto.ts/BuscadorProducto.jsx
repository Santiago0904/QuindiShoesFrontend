import React, { useEffect, useState } from "react";
import axios from "axios";
import { MostrarProducto } from "../CartaProducto/CartaProducto";

export const BuscadorProductos = () => {
  const [productos, setProductos] = useState([]); // Productos encontrados
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [filtros, setFiltros] = useState({
    precioMin: "",
    precioMax: "",
    marca: "",
    color: "",
    sexo: "",
    talla: "",
    tipo: ""
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false); // Estado para mostrar/ocultar filtros

  // Función para verificar si todos los filtros están vacíos
  const todosLosFiltrosVacios = () => {
    return (
      !nombre.trim() &&
      !categoria.trim() &&
      !filtros.precioMin &&
      !filtros.precioMax &&
      !filtros.marca.trim() &&
      !filtros.color.trim() &&
      !filtros.sexo.trim() &&
      !filtros.talla.trim() &&
      !filtros.tipo.trim()
    );
  };

  
  useEffect(() => {
    if (todosLosFiltrosVacios()) {
      
      obtenerTodosLosProductos();
    } else {
      
      buscarProductos();
    }
  }, [nombre, categoria, filtros]);

  // Función para obtener todos los productos
  const obtenerTodosLosProductos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/producto/public");
      setProductos(response.data); // Reemplazamos los productos con los productos completos
    } catch (error) {
      console.error("Error al obtener todos los productos:", error);
    }
  };

  // Función para buscar productos con filtros
  const buscarProductos = async () => {
    try {
      const filtrosCompletos = {
        nombre,
        categoria,
        precioMin: filtros.precioMin,
        precioMax: filtros.precioMax,
        marca: filtros.marca,
        color: filtros.color,
        sexo: filtros.sexo,
        talla: filtros.talla,
        tipo: filtros.tipo
      };

      const response = await axios.post("http://localhost:3000/buscadorProducto", filtrosCompletos);
      setProductos(response.data); // Reemplazamos los productos con los resultados filtrados
    } catch (error) {
      console.error("Error en búsqueda:", error);
    }
  };

  const handleInputChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  return (
<div className="p-4 space-y-4">
  <div className="flex flex-wrap gap-3 items-end">
    <input
      type="text"
      placeholder="Buscar por nombre"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ml-4"
    />

    {/* Botón para mostrar/ocultar filtros */}
    <button
      onClick={() => setMostrarFiltros(!mostrarFiltros)}
      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition-all duration-200"
    >
      {mostrarFiltros ? "Ocultar filtros" : "Mostrar filtros"}
    </button>
  </div>

  {mostrarFiltros && (
    <div className="flex flex-wrap gap-3 mt-4 ml-4">
      <input
        type="text"
        name="categoria"
        placeholder="Categoría"
        value={filtros.categoria}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="precioMin"
        placeholder="Precio mínimo"
        value={filtros.precioMin}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="precioMax"
        placeholder="Precio máximo"
        value={filtros.precioMax}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="marca"
        placeholder="Marca"
        value={filtros.marca}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="color"
        placeholder="Color"
        value={filtros.color}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="sexo"
        placeholder="Sexo"
        value={filtros.sexo}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="talla"
        placeholder="Talla"
        value={filtros.talla}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="tipo"
        placeholder="Tipo"
        value={filtros.tipo}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )}

  <MostrarProducto productosProp={productos} />
</div>

  );
};
