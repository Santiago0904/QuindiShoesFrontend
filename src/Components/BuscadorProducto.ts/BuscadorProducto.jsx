import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MostrarProducto } from "../CartaProducto/CartaProducto";

export const BuscadorProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [filtros, setFiltros] = useState({
    tipo: "",
    precioMin: "",
    precioMax: "",
    color: "",
    genero: "",
    talla: ""
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
    obtenerTodosLosProductos();
  }, []);

  useEffect(() => {
    if (
      !nombre &&
      !filtros.tipo &&
      !filtros.precioMin &&
      !filtros.precioMax &&
      !filtros.color &&
      !filtros.genero &&
      !filtros.talla
    ) {
      obtenerTodosLosProductos();
      return;
    }
    buscarProductos();
  }, [nombre, filtros]);

  const obtenerTodosLosProductos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/producto/public");
      setProductos(res.data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  };

  const buscarProductos = async () => {
    try {
      const res = await axios.post("http://localhost:3000/buscadorProducto", {
        nombre,
        ...filtros
      });
      setProductos(res.data);
    } catch (err) {
      console.error("Error en búsqueda:", err);
    }
  };

  const handleInputChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  return (
    <div className="px-8 py-6 space-y-6 mb-10">
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Buscar por nombre"
          className="rounded-xl px-4 py-2 border border-pink-200 shadow-sm w-64 bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
        />
        <button
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="bg-pink-200 text-pink-800 rounded-xl px-4 py-2 font-semibold shadow hover:bg-pink-300 transition"
        >
          {mostrarFiltros ? "Ocultar filtros" : "Mostrar filtros"}
        </button>
      </div>

     <AnimatePresence>
  {mostrarFiltros && (
    <motion.div
      key="filtros"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="overflow-hidden grid grid-cols-2 md:grid-cols-3 gap-4 bg-white/80 rounded-xl p-4 shadow-inner"
    >
      {/* Tipo */}
      <select
        name="tipo"
        value={filtros.tipo}
        onChange={handleInputChange}
        className="rounded-xl px-4 py-2 border border-green-200 shadow-sm bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
      >
        <option value="">Tipo</option>
        <option value="zapatilla">Zapatilla</option>
        <option value="bota">Bota</option>
        <option value="sandalia">Sandalia</option>
      </select>

      {/* Precio mínimo */}
      <input
        name="precioMin"
        type="number"
        placeholder="Precio mínimo"
        value={filtros.precioMin}
        onChange={handleInputChange}
        className="rounded-xl px-4 py-2 border border-green-200 shadow-sm bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
      />

      {/* Precio máximo */}
      <input
        name="precioMax"
        type="number"
        placeholder="Precio máximo"
        value={filtros.precioMax}
        onChange={handleInputChange}
        className="rounded-xl px-4 py-2 border border-green-200 shadow-sm bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
      />

      {/* Color */}
      <select
        name="color"
        value={filtros.color}
        onChange={handleInputChange}
        className="rounded-xl px-4 py-2 border border-pink-200 shadow-sm bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
      >
        <option value="">Color</option>
        <option value="Azul">Azul</option>
        <option value="Rojo">Rojo</option>
        <option value="Negro">Negro</option>
        <option value="Blanco">Blanco</option>
      </select>

      {/* Género */}
      <select
        name="genero"
        value={filtros.genero}
        onChange={handleInputChange}
        className="rounded-xl px-4 py-2 border border-pink-200 shadow-sm bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
      >
        <option value="">Género</option>
        <option value="Hombre">Hombre</option>
        <option value="Mujer">Mujer</option>
        <option value="Unisex">Unisex</option>
      </select>

      {/* Talla */}
      <select
        name="talla"
        value={filtros.talla}
        onChange={handleInputChange}
        className="rounded-xl px-4 py-2 border border-green-200 shadow-sm bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
      >
        <option value="">Talla</option>
        <option value="34">34</option>
        <option value="35">35</option>
        <option value="36">36</option>
        <option value="37">37</option>
        <option value="38">38</option>
        <option value="39">39</option>
        <option value="40">40</option>
        <option value="41">41</option>
        <option value="42">42</option>
      </select>
    </motion.div>
  )}
</AnimatePresence>

      <MostrarProducto productosProp={productos} />
    </div>
  );
};
