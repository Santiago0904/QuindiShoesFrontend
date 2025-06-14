import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContadorCarritoContext } from "../../Contexts/ContadorCarritoContext";
import { jwtDecode } from "jwt-decode";
import axiosClient from "../../api/axion";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null); // ← NUEVO
  const { resetear } = useContext(ContadorCarritoContext);
  const [descuento, setDescuento] = useState(0);
  const [productoConDescuento, setProductoConDescuento] = useState(null);

  useEffect(() => {
    axiosClient.get("/profile/recompensa")
      .then(res => {
        setDescuento(res.data.recompensa_juego || 0);
      })
      .catch(() => setDescuento(0));
  }, []);
  const totalVisual = carrito.reduce((acc, p, idx) => {
  if (productoConDescuento === idx && descuento > 0) {
    const precioConDescuento = p.precio_producto * (1 - descuento / 100);
    return acc + (p.cantidad * Math.max(0, precioConDescuento));
  }
  return acc + (p.cantidad * p.precio_producto);


}, 0);
  useEffect(() => {
    const datosGuardados = localStorage.getItem("carrito");
    if (datosGuardados) {
      setCarrito(JSON.parse(datosGuardados));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Token decodificado:", decoded);
        setUserId(decoded.data?.id); // ← Guardamos userId en el estado
      } catch (error) {
        console.error("Token inválido:", error);
      }
    }

    const script = document.createElement("script");
    script.src = "https://checkout.epayco.co/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const irAProductos = () => {
    navigate("/");
  };

const handlePSEPayment = () => {
  if (!userId) {
    console.error("No se encontró el ID del usuario");
    return;
  }

  const carritoReducido = carrito.map(({ id_producto, nombre_producto,precio_producto ,talla, id_color, id_talla, cantidad, imagen }) => ({
    id_producto,
    nombre_producto,
    precio_producto,
    talla,
    id_color,
    id_talla,
    cantidad,
    imagen
  }));

  // Calcula el total aplicando el descuento solo al producto seleccionado
  const total = carrito.reduce((acc, p, idx) => {
      if (productoConDescuento === idx && descuento > 0) {
        const precioConDescuento = p.precio_producto * (1 - descuento / 100);
        return acc + (p.cantidad * Math.max(0, precioConDescuento));
      }
      return acc + (p.cantidad * p.precio_producto);
  }, 0);

  const handler = window.ePayco.checkout.configure({
    key: "76018558cee4255d423b4753fee3fdf1",
    test: true,
  });

  const data = {
    name: "Pago de productos",
    description: "Compra en QuindiShoes",
    invoice: "ORD-" + Date.now(),
    currency: "cop",
    amount: total.toString(),
    tax_base: "0",
    tax: "0",
    country: "co",
    method: "POST",
    response: "https://quindi-shoes-frontend-yemj.vercel.app/",
    confirmation: "https://quindishoes-backend-3.onrender.com/api/pagos/confirmacion",

    external: "false",
    x_extra1: userId.toString(),
    x_extra2: JSON.stringify(carritoReducido),
    x_extra3: productoConDescuento !== null && descuento > 0 ? descuento : 0
  };

  handler.open(data);
};



  const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    setCarrito([]);
    resetear();
  };
 console.log("Carrito:", carrito);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
          🛒 Tu Carrito de Compras
        </h2>

        {/* Mostrar el descuento solo si hay */}
        {descuento > 0 && (
          <div className="mb-6 text-center">
            <span className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-semibold text-lg">
              Descuento disponible: <span className="text-amber-600 font-bold">%{descuento}</span>
            </span>
            {productoConDescuento !== null && (
              <div className="mt-2 text-green-600 font-semibold">
                ¡Descuento de %{descuento} aplicado al producto seleccionado!
              </div>
            )}
          </div>
        )}

        {carrito.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="mb-4">Tu carrito está vacío</p>
            <button
              onClick={irAProductos}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Ir a productos
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {carrito.map((producto, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-6 bg-white border border-gray-200 rounded-2xl shadow-md p-6"
              >
                <input
                  type="radio"
                  name="descuento-producto"
                  checked={productoConDescuento === index}
                  // Permite seleccionar y deseleccionar el radio
                  onClick={() =>
                    setProductoConDescuento(productoConDescuento === index ? null : index)
                  }
                  className="mr-2 accent-green-500 w-5 h-5"
                  disabled={descuento === 0}
                  title={descuento === 0 ? "No tienes descuento disponible" : "Aplicar descuento"}
                />
                <img
                  src={producto.imagen}
                  alt={producto.nombre_producto}
                  className="w-32 h-32 object-cover rounded-xl border border-gray-100 shadow-sm"
                />
                <div className="flex-1 text-left">
                  <h4 className="text-2xl font-semibold text-gray-800 mb-1">
                    {producto.nombre_producto}
                  </h4>
                  <p className="text-lg font-medium mb-2">
                    Precio: <span className="text-green-500">
                      {productoConDescuento === index && descuento > 0
                        ? `$${Math.max(0, (producto.precio_producto * (1 - descuento / 100)).toFixed(2))}`
                        : `$${producto.precio_producto}`}
                    </span>
                    {productoConDescuento === index && descuento > 0 && (
                      <span className="ml-2 text-xs text-amber-500 font-bold">
                        (Descuento aplicado: -{descuento}%)
                      </span>
                    )}
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-700">Color:</span> {producto.color}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Talla:</span> {producto.talla}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Cantidad:</span> {producto.cantidad}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Stock disponible:</span> {producto.stock}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-right text-2xl font-semibold text-gray-800">
              Total a pagar: <span className="text-green-600">${totalVisual}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <button
                onClick={vaciarCarrito}
                className="px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition"
              >
                Vaciar carrito
              </button>
              <button
                onClick={handlePSEPayment}
                className="px-6 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 transition"
              >
                Comprar
              </button>
              <button
                onClick={irAProductos}
                className="px-6 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 transition"
              >
                Seguir comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
