import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BtnAgregarCarrito } from '../BtnAgregarCarrito/BtnAgregarCarrito';
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

export const CartaProducto = ({ producto }) => {

    const navigate = useNavigate();

  const handleAgregarAlCarrito = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/carrito/${producto.id_producto}`);
      console.log(producto.id_producto)
      const productoObtenido = response.data;

      const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]");

   
      const existe = carritoActual.some(p => p.id_producto === productoObtenido.id_producto);
      if (!existe) {
        carritoActual.push(productoObtenido);
        localStorage.setItem("carrito", JSON.stringify(carritoActual));
      }

      navigate("/carrito");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-start">
      <img
        src={producto.imagen_producto}
        alt={producto.nombre_producto}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-bold">{producto.nombre_producto}</h3>
      <p>Tipo: {producto.tipo_producto}</p>
      <p>Género: {producto.genero_producto}</p>
      <p>Color: {producto.colores_producto}</p>
      <p>Talla: {producto.tallas_producto}</p>
      <p>Stock: {producto.stock}</p>
      <p>Precio: ${producto.precio_producto}</p>
      
      <BtnAgregarCarrito
  contenido="Agregar al carrito"
  icono={FaShoppingCart}
  onClick={handleAgregarAlCarrito}
/>
    </div>
  );
};

// Componente que muestra todos los productos
export const MostrarProducto = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    axios.get("http://localhost:3000/producto/public",{
    })
      .then((res) => { 
        console.log("Respuesta del backend:", res.data);
        setProductos(res.data)})
      .catch((err) => console.error("Error al cargar productos:", err));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {productos.map((producto) => (
        <CartaProducto key={producto.id_producto} producto={producto} />
      ))}
    </div>
  );
};
