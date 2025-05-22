import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BtnAgregarCarrito } from '../BtnAgregarCarrito/BtnAgregarCarrito';
import { FaShoppingCart } from "react-icons/fa";
import { ContadorCarritoContext } from '../../Contexts/ContadorCarritoContext';

export const CartaProducto = ({ producto }) => {
  const { incrementarContador } = useContext(ContadorCarritoContext);

  // Estado para selects
  const [tallaSeleccionada, setTallaSeleccionada] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);

  // Tallas y colores únicos de las variantes
  const tallasDisponibles = [
    ...new Set(producto.variantes.map((v) => v.talla)),
  ];
  const coloresDisponibles = [
    ...new Set(producto.variantes.map((v) => v.color)),
  ];

  // Variante seleccionada
  const varianteSeleccionada = producto.variantes.find(
    (v) =>
      v.talla === tallaSeleccionada && v.color === colorSeleccionado
  );

  // Imagen principal
  const imagenPrincipal =
    producto.imagenes && producto.imagenes.length > 0
      ? producto.imagenes[0]
      : "https://via.placeholder.com/300x200?text=Sin+Imagen";

  // Agregar al carrito
  const handleAgregarAlCarrito = () => {
    if (!varianteSeleccionada) {
      alert("Selecciona talla y color");
      return;
    }
    const itemCarrito = {
      id_producto: producto.id_producto,
      nombre_producto: producto.nombre_producto,
      imagen: imagenPrincipal,
      precio: producto.precio_producto,
      id_talla: varianteSeleccionada.id_talla,
      talla: varianteSeleccionada.talla,
      id_color: varianteSeleccionada.id_color,
      color: varianteSeleccionada.color,
      cantidad,
      stock: varianteSeleccionada.stock,
    };
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(itemCarrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    incrementarContador();
    alert("Producto agregado al carrito");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-start">
      <img
        src={imagenPrincipal}
        alt={producto.nombre_producto}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-bold">{producto.nombre_producto}</h3>
      <p>Tipo: {producto.tipo_producto}</p>
      <p>Género: {producto.genero_producto}</p>
      <p>Precio: ${producto.precio_producto}</p>
      <div className="flex gap-2 my-2 w-full">
        <select
          className="p-1 border rounded w-1/2"
          value={tallaSeleccionada}
          onChange={(e) => setTallaSeleccionada(e.target.value)}
        >
          <option value="">Talla</option>
          {tallasDisponibles.map((talla) => (
            <option key={talla} value={talla}>
              {talla}
            </option>
          ))}
        </select>
        <select
          className="p-1 border rounded w-1/2"
          value={colorSeleccionado}
          onChange={(e) => setColorSeleccionado(e.target.value)}
        >
          <option value="">Color</option>
          {coloresDisponibles.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      {varianteSeleccionada && (
        <div className="mb-2 text-sm">
          <p>
            <span className="font-semibold">Talla:</span> {varianteSeleccionada.talla}
          </p>
          <p>
            <span className="font-semibold">Color:</span> {varianteSeleccionada.color}
          </p>
          <p>
            <span className="font-semibold">Stock disponible:</span> {varianteSeleccionada.stock}
          </p>
        </div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <input
          type="number"
          min={1}
          max={varianteSeleccionada ? varianteSeleccionada.stock : 1}
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="w-16 p-1 border rounded"
          disabled={!varianteSeleccionada}
        />
        <BtnAgregarCarrito
          contenido="Agregar al carrito"
          icono={FaShoppingCart}
          onClick={handleAgregarAlCarrito}
          disabled={!varianteSeleccionada || cantidad > (varianteSeleccionada ? varianteSeleccionada.stock : 0)}
        />
      </div>
    </div>
  );
};

// Componente que muestra todos los productos (usuario)
export const MostrarProducto = ({ productosProp }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (!productosProp || productosProp.length === 0) {
      cargarProductos();
    }
  }, [productosProp]);

  const cargarProductos = () => {
    axios.get("http://localhost:3000/producto/public")
      .then((res) => {
        setProductos(res.data);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  };

  const productosMostrar = productosProp && productosProp.length > 0 ? productosProp : productos;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {productosMostrar.map((producto) => (
        <CartaProducto key={producto.id_producto} producto={producto} />
      ))}
    </div>
  );
};