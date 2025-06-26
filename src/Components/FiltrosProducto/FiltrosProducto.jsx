import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axion";

export const FiltrosProducto = (props) => {
  const { filtros, setFiltros } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevosFiltros = { ...filtros, [name]: value };
    setFiltros(nuevosFiltros);
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-xl shadow-md mb-6">
      <input
        type="text"
        name="nombre"
        placeholder="Buscar por nombre"
        className="border p-2 rounded w-full sm:w-auto"
        onChange={handleChange}
      />
      <select name="tipo" className="border p-2 rounded" onChange={handleChange}>
        <option value="">Tipo</option>
        <option value="zapato">Zapato</option>
        <option value="tenis">Tenis</option>
        <option value="sandalia">Sandalia</option>
      </select>
      <select name="genero" className="border p-2 rounded" onChange={handleChange}>
        <option value="">Género</option>
        <option value="Femenino">Femenino</option>
        <option value="Masculino">Masculino</option>
        <option value="Unisex">Unisex</option>
      </select>
      <select
        value={filtros.categoria}
        onChange={e => setFiltros(f => ({ ...f, categoria: e.target.value }))}
        className="border p-2 rounded"
      >
        <option value="">Todas las categorías</option>
        <option value="zapatillas">Zapatillas</option>
        <option value="botas">Botas</option>
      </select>
      <select
        value={filtros.color}
        onChange={e => setFiltros(f => ({ ...f, color: e.target.value }))}
        className="border p-2 rounded"
      >
        <option value="">Todos los colores</option>
        <option value="azul">Azul</option>
        <option value="rojo">Rojo</option>
      </select>
    </div>
  );
};

// Supón que cada producto tiene un array producto.variaciones
const filtrarProductos = (productos, filtros) => {
  return productos.filter(producto => {
    // Filtros principales
    if (filtros.nombre && !producto.nombre_producto.toLowerCase().includes(filtros.nombre.toLowerCase())) return false;
    if (filtros.tipo && producto.tipo_producto !== filtros.tipo) return false;
    if (filtros.genero && producto.genero_producto !== filtros.genero) return false;

    // Filtros de variaciones
    if (filtros.talla || filtros.color || filtros.stock) {
      return producto.variaciones.some(variacion => {
        if (filtros.talla && variacion.talla !== filtros.talla) return false;
        if (filtros.color && variacion.color !== filtros.color) return false;
        if (filtros.stock && filtros.stock === "asc" && variacion.stock <= 0) return false;
        if (filtros.stock && filtros.stock === "desc" && variacion.stock > 0) return false;
        return true;
      });
    }

    return true;
  });
};

export default FiltrosProducto;

