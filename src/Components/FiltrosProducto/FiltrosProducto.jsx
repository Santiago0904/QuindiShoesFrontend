    import React, { useState } from "react";

export const FiltrosProductos = ({ onFilterChange }) => {
  const [filtros, setFiltros] = useState({
    nombre: "",
    tipo: "",
    genero: "",
    stock: "",
    talla: "",
    precio: "",
    color: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevosFiltros = { ...filtros, [name]: value };
    setFiltros(nuevosFiltros);
    onFilterChange(nuevosFiltros);
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
      </select>

      <select name="genero" className="border p-2 rounded" onChange={handleChange}>
        <option value="">Género</option>
        <option value="hombre">Hombre</option>
        <option value="mujer">Mujer</option>
        <option value="unisex">Unisex</option>
      </select>

      <select name="stock" className="border p-2 rounded" onChange={handleChange}>
        <option value="">Stock</option>
        <option value="asc">Menor a mayor</option>
        <option value="desc">Mayor a menor</option>
      </select>

      <select name="talla" className="border p-2 rounded" onChange={handleChange}>
        <option value="">Talla</option>
        <option value="36">36</option>
        <option value="37">37</option>
        <option value="38">38</option>
        <option value="39">39</option>
      </select>

      <select name="precio" className="border p-2 rounded" onChange={handleChange}>
        <option value="">Precio</option>
        <option value="asc">Menor a mayor</option>
        <option value="desc">Mayor a menor</option>
      </select>

      <select name="color" className="border p-2 rounded" onChange={handleChange}>
        <option value="">Color</option>
        <option value="negro">Negro</option>
        <option value="blanco">Blanco</option>
        <option value="rojo">Rojo</option>
      </select>
    </div>
  );
};

