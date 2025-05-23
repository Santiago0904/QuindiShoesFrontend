import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContadorCarritoContext } from "../../Contexts/ContadorCarritoContext";
import { jwtDecode } from "jwt-decode";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [userId, setUserId] = useState(null); // ← NUEVO
  const navigate = useNavigate();
  const { resetear } = useContext(ContadorCarritoContext);

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
    navigate('/');
  };

  const handlePSEPayment = () => {
    if (!userId) {
      console.error("No se encontró el ID del usuario");
      return;
    }

    const handler = window.ePayco.checkout.configure({
      key: "76018558cee4255d423b4753fee3fdf1",
      test: true,
    });

    const data = {
      name: "Pago de productos",
      description: "Compra en QuindiShoes",
      invoice: "ORD-" + Date.now(),
      currency: "cop",
      amount: "5000",
      tax_base: "0",
      tax: "0",
      country: "co",
      method: "POST",
      response: "https://www.youtube.com/?reload=9&app=desktop&hl=es",
      confirmation: "https://e878-179-1-217-71.ngrok-free.app/api/pagos/confirmacion",
      external: "false",
      x_extra1: userId.toString(), // ← Ahora sí existe
    };

    handler.open(data);
  };

  const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    setCarrito([]);
    resetear();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
          🛒 Tu Carrito de Compras
        </h2>

        {carrito.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="mb-4">Tu carrito está vacío.</p>
            <button
              onClick={irAProductos}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Ir a productos
            </button>
            <button
              onClick={handlePSEPayment}
              className="px-6 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 transition"
            >
              Comprar
            </button>
          </div>
        ) : (
          // Tu lógica de carrito con productos llenos
          <></>
        )}
      </div>
    </div>
  );
};

export default Carrito;
