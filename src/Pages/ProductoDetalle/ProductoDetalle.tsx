import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ContadorCarritoContext } from "../../Contexts/ContadorCarritoContext";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

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
  colores: { id_color: number; color: string }[];
  tallas: { id_talla: number; talla: string }[];
  variantes: Variante[];
}

export function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState<DetalleProducto | null>(null);

  // Nueva lógica para selección
  const [colorSeleccionado, setColorSeleccionado] = useState<number | null>(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState(1);

  const { incrementarContador } = useContext(ContadorCarritoContext);

  useEffect(() => {
    axios.get(`http://localhost:3000/productoDetalle/${id}`)
      .then(res => setProducto(res.data))
      .catch(() => setProducto(null));
  }, [id]);

  if (!producto) return <div className="text-center mt-20 text-xl animate-pulse">Cargando...</div>;

  // Buscar stock disponible para la combinación seleccionada
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
        <div class="text-base text-gray-700 mb-1">Color: <span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:${producto.colores.find(c => c.id_color === colorSeleccionado)?.color};border:1px solid #ccc;vertical-align:middle"></span></div>
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

  return (
    <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto my-10 bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
      {/* Imagen principal y miniaturas */}
      <div className="flex-1 flex flex-col items-center">
        <img
          src={producto.imagenes[0]}
          alt={producto.nombre_producto}
          className="w-96 h-96 object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
        />
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
      {/* Detalles del producto */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-2 text-gray-800 animate-fade-in-down">{producto.nombre_producto}</h2>
        <p className="text-lg text-gray-500 mb-1">{producto.tipo_producto} • {producto.genero_producto}</p>
        <p className="text-xl text-gray-700 my-4">{producto.reseña_producto}</p>
        <p className="font-bold text-3xl text-blue-700 mb-6 animate-fade-in-up">${producto.precio_producto}</p>
        {/* Colores */}
        <div className="mb-5">
          <h4 className="mb-2 font-semibold">Colores disponibles:</h4>
          <div className="flex gap-3">
            {producto.colores.map(c => (
              <button
                key={c.id_color}
                onClick={() => setColorSeleccionado(c.id_color)}
                className={`w-10 h-10 rounded-full border-2 shadow-sm transition-all duration-200 outline-none
                  ${colorSeleccionado === c.id_color ? "border-blue-600 scale-110 ring-2 ring-blue-200" : "border-gray-300"}
                `}
                style={{ background: c.color }}
                title={c.color}
              />
            ))}
          </div>
        </div>
        {/* Tallas */}
        <div className="mb-5">
          <h4 className="mb-2 font-semibold">Tallas disponibles:</h4>
          <div className="flex gap-3 flex-wrap">
            {producto.tallas.map(t => (
              <button
                key={t.id_talla}
                onClick={() => setTallaSeleccionada(t.id_talla)}
                className={`px-5 py-2 rounded-lg font-semibold text-lg transition-all duration-200
                  ${tallaSeleccionada === t.id_talla
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
        <div className="mb-5 flex items-center gap-5">
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
        {/* Botón agregar al carrito */}
        <div className="mt-6">
          <button
            onClick={handleAgregarCarrito}
            className={`px-10 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-200
              bg-blue-600 text-white hover:bg-blue-700 hover:scale-105
              ${(!colorSeleccionado || !tallaSeleccionada || stockDisponible === 0) && "opacity-50 cursor-not-allowed"}
            `}
            disabled={!colorSeleccionado || !tallaSeleccionada || stockDisponible === 0}
          >
            Añadir al carrito
          </button>
        </div>
        <div className="mt-8 text-gray-500 text-base animate-fade-in">
          <p>Envío gratis a partir de $150. Cambios y devoluciones fáciles.</p>
        </div>
      </div>
    </div>
  );
}
