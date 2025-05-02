import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const datosGuardados = localStorage.getItem("carrito");
    if (datosGuardados) {
      setCarrito(JSON.parse(datosGuardados));
    }
  }, []);

  const irAProductos = () => {
    navigate("/"); 
  };

  const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    setCarrito([]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🛒 Tu Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div>
          <p>Tu carrito está vacío.</p>
          <button onClick={irAProductos}>Ir a productos</button>
        </div>
      ) : (
        <div>
          {carrito.map((producto, index) => (
            <div key={index} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}>
              <h4>{producto.nombre || producto.nombre_producto}</h4>
              <p>Precio: ${producto.precio}</p>
              <p>Descripción: {producto.descripcion}</p>
            </div>
          ))}
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
