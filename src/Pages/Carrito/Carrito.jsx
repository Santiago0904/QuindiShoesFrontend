import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContadorCarritoContext } from "../../Contexts/ContadorCarritoContext";
import PaymentBrick from "../../Components/Checkout/Checkout";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();
  const { resetear } = useContext(ContadorCarritoContext);

  useEffect(() => {
    const datosGuardados = localStorage.getItem("carrito");
    if (datosGuardados) {
      setCarrito(JSON.parse(datosGuardados));
    }
  }, []);

  const irAProductos = () => {
    navigate('/');
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
          </div>
        ) : (
          <div className="space-y-6">
            {carrito.map((producto, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-6 bg-white border border-gray-200 rounded-2xl shadow-md p-6"
              >
                {/* ... (renderizado de la información del producto) ... */}
              </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <button
                onClick={vaciarCarrito}
                className="px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition"
              >
                Vaciar carrito
              </button>
              <PaymentBrick /> {/* El PaymentBrick ahora siempre se renderiza */}
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