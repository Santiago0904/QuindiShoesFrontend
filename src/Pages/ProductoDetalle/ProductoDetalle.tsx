import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axiosClient from "../../api/axion";
import { ContadorCarritoContext } from "../../Contexts/ContadorCarritoContext";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ResenasProducto from "../../Components/ResenasProducto/ResenasProducto";

// Extiende la interfaz Window para incluir ePayco
declare global {
  interface Window {
    ePayco?: any;
  }
}

interface Variante {
  id_variantes: number;
  id_talla: number;
  talla: string;
  id_color: number;
  color: string;
  stock: number;
}

interface DetalleProducto {
  id_producto: number;
  tipo_producto: string;
  nombre_producto: string;
  reseña_producto: string;
  genero_producto: string;
  precio_producto: number;
  imagenes: string[];
  colores: { id_color: number; color: string; codigo_hex: string }[];
  tallas: { id_talla: number; talla: string }[];
  variantes: Variante[];
  reserva_activa?: number | boolean; // Puede ser 1/0 (number) o true/false (boolean)
}

export function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState<DetalleProducto | null>(null);
  const [colorSeleccionado, setColorSeleccionado] = useState<number | null>(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [esFavorito, setEsFavorito] = useState(false);
  const { incrementarContador } = useContext(ContadorCarritoContext);
  const usuario_id = localStorage.getItem("id");
  const usuario = usuario_id ? { id: Number(usuario_id) } : null;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID recibido:", id);
    axiosClient.get(`/productoDetalle/${id}`)
      .then(res => {
        setProducto(res.data);
        console.log("Detalle producto:", res.data);
      })
      .catch((err) => {
        console.error("Error al obtener producto:", err);
        setProducto(null);
      });
  }, [id]);

  useEffect(() => {
    if (!producto) return;
    const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    setEsFavorito(favoritos.some((p: any) => p.id_producto === producto.id_producto));
  }, [producto]);

  useEffect(() => {
    if (!window.ePayco) {
      const script = document.createElement("script");
      script.src = "https://checkout.epayco.co/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (!producto) return <div className="text-center mt-20 text-xl animate-pulse">Cargando...</div>;

  const varianteSeleccionada = producto.variantes.find(
    v => v.id_color === colorSeleccionado && v.id_talla === tallaSeleccionada
  );
  const stockDisponible = varianteSeleccionada ? varianteSeleccionada.stock : 0;

  const handleAgregarCarrito = () => {
    if (!colorSeleccionado || !tallaSeleccionada) {
      Swal.fire({
        icon: "warning",
        title: "Selecciona color y talla",
        text: "Por favor selecciona un color y una talla antes de agregar al carrito.",
        confirmButtonColor: "#2563eb"
      });
      return;
    }

    if (cantidad > stockDisponible) {
      Swal.fire({
        icon: "error",
        title: "Stock insuficiente",
        text: "No hay suficiente stock disponible para la cantidad seleccionada.",
        confirmButtonColor: "#2563eb"
      });
      return;
    }

    const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]");
    const nuevaEntrada = {
      id_producto: producto.id_producto,
      nombre_producto: producto.nombre_producto,
      precio_producto: producto.precio_producto,
      imagen: producto.imagenes[0],
      color: producto.colores.find(c => c.id_color === colorSeleccionado)?.color,
      talla: producto.tallas.find(t => t.id_talla === tallaSeleccionada)?.talla,
      id_color: colorSeleccionado,
      id_talla: tallaSeleccionada,
      cantidad,
      id_variante: varianteSeleccionada?.id_variantes,
      stock: varianteSeleccionada?.stock
    };

    const idx = carritoActual.findIndex(
      (item: any) =>
        item.id_producto === nuevaEntrada.id_producto &&
        item.id_color === nuevaEntrada.id_color &&
        item.id_talla === nuevaEntrada.id_talla
    );

    if (idx >= 0) {
      carritoActual[idx].cantidad += cantidad;
    } else {
      carritoActual.push(nuevaEntrada);
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    incrementarContador();

    Swal.fire({
      icon: "success",
      title: "¡Agregado al carrito!",
      html: `
        <div class="flex flex-col items-center">
          <img src="${producto.imagenes[0]}" alt="${producto.nombre_producto}" class="mx-auto rounded-xl shadow mb-3" style="width:90px;height:90px;object-fit:cover"/>
          <div class="font-bold text-lg mb-1">${producto.nombre_producto}</div>
          <div class="text-base text-gray-700 mb-1">
            Color: <span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:${producto.colores.find(c => c.id_color === colorSeleccionado)?.codigo_hex};border:1px solid #ccc;vertical-align:middle"></span>
          </div>
          <div class="text-base text-gray-700 mb-1">Talla: <span class="font-semibold">${producto.tallas.find(t => t.id_talla === tallaSeleccionada)?.talla}</span></div>
          <div class="text-base text-gray-700">Cantidad: <span class="font-semibold">${cantidad}</span></div>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: "Seguir comprando",
      confirmButtonColor: "#2563eb",
      timer: 1800,
      timerProgressBar: true,
      customClass: {
        popup: "rounded-2xl shadow-2xl p-6"
      }
    });
  };

  const toggleFavorito = () => {
    if (!producto) return;
    const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    const yaExiste = favoritos.some((p: any) => p.id_producto === producto.id_producto);

    let nuevosFavoritos;
    if (yaExiste) {
      nuevosFavoritos = favoritos.filter((p: any) => p.id_producto !== producto.id_producto);
    } else {
      nuevosFavoritos = [...favoritos, producto];
    }
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    setEsFavorito(!yaExiste);
    window.dispatchEvent(new Event("favoritos-updated"));
  };

  // Botón de reservar (ePayco)
  const handleReservar = () => {
    if (!usuario_id) {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión para reservar",
        text: "Debes iniciar sesión para poder reservar este producto.",
        confirmButtonColor: "#2563eb"
      });
      return;
    }

    if (!window.ePayco) {
      alert("No se pudo cargar la pasarela de pagos. Intenta de nuevo.");
      return;
    }

    // Busca la variante seleccionada
    const varianteSeleccionada = producto?.variantes.find(
      v => v.id_color === colorSeleccionado && v.id_talla === tallaSeleccionada
    );

    if (!colorSeleccionado || !tallaSeleccionada || !varianteSeleccionada) {
      Swal.fire({
        icon: "warning",
        title: "Selecciona color y talla",
        text: "Por favor selecciona un color y una talla antes de reservar.",
        confirmButtonColor: "#2563eb"
      });
      return;
    }

    if (cantidad > varianteSeleccionada.stock) {
      Swal.fire({
        icon: "error",
        title: "Stock insuficiente",
        text: "No hay suficiente stock disponible para la cantidad seleccionada.",
        confirmButtonColor: "#2563eb"
      });
      return;
    }

    const handler = window.ePayco.checkout.configure({
      key: "76018558cee4255d423b4753fee3fdf1", // Tu llave pública de ePayco
      test: true,
    });

    const reservaData = {
      name: producto.nombre_producto,
      description: `Reserva de ${producto.nombre_producto}`,
      invoice: "ORD-" + Date.now(),
      currency: "cop",
      amount: (producto.precio_producto * cantidad).toString(),
      tax_base: "0",
      tax: "0",
      country: "co",
      method: "POST",
      response: "https://quindi-shoes-frontend-yemj.vercel.app/pagos/respuesta", // URL pública de tu frontend
      confirmation: "https://quindishoes-backend-3.onrender.com/api/pagos/confirmacion", // URL pública de tu backend
      external: "false",
      x_extra1: String(usuario_id), // Asegúrate que sea string o número simple, NO un objeto
      x_extra2: JSON.stringify({
        tipo: "reserva", // Identificador para el backend
        id_producto: producto.id_producto,
        nombre_producto: producto.nombre_producto,
        color: producto.colores.find(c => c.id_color === colorSeleccionado)?.color,
        talla: producto.tallas.find(t => t.id_talla === tallaSeleccionada)?.talla,
        cantidad,
        id_variante: varianteSeleccionada.id_variantes,
      }),
    };

    handler.open(reservaData);
  };

  // Utilidad para saber si la reserva está activa (soporta tinyint 1/0, boolean)
  const reservaActiva = producto && (
    producto.reserva_activa === 1 ||
    producto.reserva_activa === true
  );

  const imagenPrincipal =
    producto.imagenes && producto.imagenes.length > 0
      ? producto.imagenes[0]
      : "https://via.placeholder.com/500x400?text=Sin+Imagen";

  return (
    // Contenedor principal que abarca tanto el detalle como las reseñas
    <div className="max-w-6xl mx-auto my-10">
      {/* Sección del detalle del producto */}
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-2xl p-8 animate-fade-in"> {/* Ajuste en el gap */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative w-full flex flex-col items-center">
            <img
              src={imagenPrincipal}
              alt={producto.nombre_producto}
              className="w-96 h-96 object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
            />
            {/* Botón de favoritos */}
            <button
              onClick={toggleFavorito}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-pink-400 hover:text-pink-600 p-3 rounded-full shadow-md transition duration-300 z-10"
              title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
              style={{ fontSize: 28 }}
            >
              {esFavorito ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <div className="flex gap-3 mt-4">
            {producto.imagenes.slice(1).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${producto.nombre_producto} ${idx + 2}`}
                className="w-16 h-16 object-cover rounded-md border border-gray-200 shadow-sm hover:scale-110 transition-transform duration-200"
              />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-2 text-gray-800 animate-fade-in-down">{producto.nombre_producto}</h2>
          <p className="text-lg text-gray-500 mb-1">{producto.tipo_producto} • {producto.genero_producto}</p>
          <p className="font-bold text-3xl text-blue-700 mb-6 animate-fade-in-up">${producto.precio_producto}</p>

          {/* Colores */}
          <div className="mb-5">
            <h4 className="mb-2 font-semibold">Colores disponibles:</h4>
            <div className="flex gap-2"> {/* Ajuste en el gap */}
              {producto.colores.map(c => {
                const hex = (c.codigo_hex || "#ccc").trim();
                return (
                  <button
                    key={c.id_color}
                    onClick={() => setColorSeleccionado(c.id_color)}
                    className={`w-10 h-10 rounded-full border-2 shadow-sm transition-all duration-200 outline-none flex items-center justify-center ${colorSeleccionado === c.id_color ? "border-blue-600 scale-110 ring-2 ring-blue-200" : "border-gray-300"}`}
                    title={c.color}
                    type="button"
                    style={{
                      backgroundColor: "transparent",
                    }}
                  >
                    <span
                      className="block w-8 h-8 rounded-full"
                      style={{
                        backgroundColor: hex,
                        border: hex.toLowerCase() === "#fff" || hex.toLowerCase() === "#ffffff" ? "1px solid #888" : "1px solid #ccc"
                      }}
                    ></span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tallas */}
          <div className="mb-5">
            <h4 className="mb-2 font-semibold">Tallas disponibles:</h4>
            <div className="flex gap-2 flex-wrap"> {/* Ajuste en el gap */}
              {producto.tallas.map(t => (
                <button
                  key={t.id_talla}
                  onClick={() => setTallaSeleccionada(t.id_talla)}
                  className={`px-4 py-2 rounded-lg font-semibold text-lg transition-all duration-200 ${tallaSeleccionada === t.id_talla
                    ? "bg-blue-600 text-white border-2 border-blue-600 scale-105 shadow-lg"
                    : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-blue-100"}
                  `}
                >
                  {t.talla}
                </button>
              ))}
            </div>
          </div>

          {/* Cantidad */}
          <div className="mb-5 flex items-center gap-4"> {/* Ajuste en el gap */}
            <label className="text-base font-medium">Cantidad:</label>
            <button
              onClick={() => setCantidad(c => Math.max(1, c - 1))}
              className="w-8 h-8 rounded-full border border-gray-400 bg-gray-100 text-xl font-bold flex items-center justify-center hover:bg-blue-100 transition"
              disabled={cantidad <= 1}
            >-</button>
            <span className="text-lg font-semibold w-8 text-center">{cantidad}</span>
            <button
              onClick={() => setCantidad(c => Math.min(stockDisponible, c + 1))}
              className="w-8 h-8 rounded-full border border-gray-400 bg-gray-100 text-xl font-bold flex items-center justify-center hover:bg-blue-100 transition"
              disabled={cantidad >= stockDisponible}
            >+</button>
            <span className="text-gray-500 text-sm ml-2">
              {stockDisponible > 0 ? `Stock disponible: ${stockDisponible}` : "Selecciona color y talla"}
            </span>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAgregarCarrito}
              className={`flex-1 px-8 py-3 rounded-xl font-bold text-lg shadow-xl transition-all duration-200 ${(!colorSeleccionado || !tallaSeleccionada || stockDisponible === 0) && "opacity-50 cursor-not-allowed"} bg-blue-600 text-white hover:bg-blue-700 hover:scale-105`} // Ajuste en el padding
              disabled={!colorSeleccionado || !tallaSeleccionada || stockDisponible === 0}
            >
              Añadir al carrito
            </button>
            {/* Botón de reservar solo si la reserva está activa */}
            {reservaActiva && (
              <button
                onClick={handleReservar}
                className={`flex-1 px-8 py-3 rounded-xl font-bold text-lg shadow-xl transition-all duration-200 ${(!colorSeleccionado || !tallaSeleccionada || stockDisponible === 0) && "opacity-50 cursor-not-allowed"} bg-pink-500 text-white hover:bg-pink-600 hover:scale-105 animate-pulse`} // Ajuste en el padding
                disabled={!colorSeleccionado || !tallaSeleccionada || stockDisponible === 0 || !usuario_id}
                title={!usuario_id ? "Inicia sesión para reservar" : "Reservar"}
              >
                Reservar
              </button>
            )}
          </div>

          {/* Mensaje de reserva disponible */}
          {reservaActiva && (
            <div className="mt-4">
              <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium shadow">
                Reserva disponible para este producto
              </span>
            </div>
          )}

          <div className="mt-8 text-gray-500 text-base animate-fade-in">
            <p>Envío gratis a partir de $150. Cambios y devoluciones fáciles.</p>
          </div>
        </div>
      </div> {/* Cierre del div del detalle del producto */}

      {/* Sección de reseñas: AHORA APARECERÁ DEBAJO */}
      <div className="mt-12 bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
        <ResenasProducto id_producto={producto.id_producto} usuario={usuario} />
      </div>
    </div>
  );
}