import React, { useContext, useEffect, useRef, useState } from "react";
import { ContadorCarritoContext } from "../../Contexts/ContadorCarritoContext";
import { useNavigate } from "react-router-dom";
import ColorThief from "colorthief";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

function hslToRgb(h, s, l) {
  s /= 100; l /= 100; h /= 360;

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hacerPastel(rgb) {
  let [r, g, b] = rgb;
  let [h, s, l] = rgbToHsl(r, g, b);
  l = Math.min(l + 80, 90);
  s = Math.max(s - 20, 90);
  return hslToRgb(h, s, l);
}

export const CartaProducto = ({ producto }) => {
  const { incrementarContador } = useContext(ContadorCarritoContext);
  const navigate = useNavigate();

  const [bgColor, setBgColor] = useState("#fde8f0");
  const [esFavorito, setEsFavorito] = useState(false);
  const imgRef = useRef(null);

  const imagenPrincipal =
    producto.imagenes && producto.imagenes.length > 0
      ? producto.imagenes[0]
      : "https://via.placeholder.com/300x200?text=Sin+Imagen";

  const irADetalle = () => navigate(`/producto/${producto.id_producto}`);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setEsFavorito(favoritos.some((p) => p.id_producto === producto.id_producto));
  }, [producto.id_producto]);

  const toggleFavorito = (e) => {
    e.stopPropagation();
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const yaExiste = favoritos.some((p) => p.id_producto === producto.id_producto);

    let nuevosFavoritos;
    if (yaExiste) {
      nuevosFavoritos = favoritos.filter((p) => p.id_producto !== producto.id_producto);
    } else {
      nuevosFavoritos = [...favoritos, producto];
    }
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    setEsFavorito(!yaExiste);

    window.dispatchEvent(new Event("favoritos-updated"));
  };

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const colorThief = new ColorThief();

    const onLoad = () => {
      try {
        const color = colorThief.getColor(img);
        const pastel = hacerPastel(color);
        const rgbString = `rgb(${pastel[0]}, ${pastel[1]}, ${pastel[2]})`;
        setBgColor(rgbString);
      } catch (error) {
        setBgColor("#fde8f0");
      }
    };

    img.crossOrigin = "anonymous";

    if (img.complete) {
      onLoad();
    } else {
      img.addEventListener("load", onLoad);
      return () => img.removeEventListener("load", onLoad);
    }
  }, [imagenPrincipal]);

  return (
    <div
      onClick={irADetalle}
      style={{ backgroundColor: bgColor }}
      className="rounded-3xl p-4 shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl group border border-white/50 backdrop-blur-md"
    >
      <div className="relative">
        <img
          ref={imgRef}
          src={imagenPrincipal}
          alt={producto.nombre_producto}
          crossOrigin="anonymous"
          className="w-full h-48 object-contain mb-3 rounded-2xl bg-white transition-transform duration-300 group-hover:scale-105"
        />

        <button
          onClick={toggleFavorito}
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-pink-400 hover:text-pink-600 p-2 rounded-full shadow-md transition duration-300 z-10"
          title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {esFavorito ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
        </button>

        <span className="absolute bottom-3 left-3 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
          {producto.genero_producto}
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-pink-700 truncate">{producto.nombre_producto}</h3>
        <p className="text-sm text-pink-400">Tipo: {producto.tipo_producto}</p>

        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-bold text-green-600">${producto.precio_producto}</p>
          <span className="text-xs text-gray-500 group-hover:text-gray-600">Ver más</span>
        </div>
      </div>
    </div>
  );
}

export const MostrarProducto = ({ productosProp }) => {
  const [productos, setProductos] = React.useState([]);

  React.useEffect(() => {
    if (!productosProp || productosProp.length === 0) {
      cargarProductos();
    }
  }, [productosProp]);

  const cargarProductos = () => {
    import("axios").then(({ default: axios }) => {
      axios
        .get("http://localhost:3000/producto/public")
        .then((res) => {
          const data = Array.isArray(res.data) ? res.data : res.data.productos || [];
          setProductos(data);
        })
        .catch((err) => console.error("Error al cargar productos:", err));
    });
  };

  const productosMostrar =
    Array.isArray(productosProp) && productosProp.length > 0
      ? productosProp
      : Array.isArray(productos) ? productos : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productosMostrar.map((producto) => (
        <CartaProducto key={producto.id_producto} producto={producto} />
      ))}
    </div>
  );
};
