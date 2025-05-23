import React, { useContext, useEffect, useRef, useState } from "react";
import { ContadorCarritoContext } from "../../Contexts/ContadorCarritoContext";
import { useNavigate } from "react-router-dom";
import ColorThief from "color-thief-browser";

export const CartaProducto = ({ producto }) => {
  const { incrementarContador } = useContext(ContadorCarritoContext);
  const navigate = useNavigate();

  const [bgColor, setBgColor] = useState("bg-pink-50");
  const imgRef = useRef(null);

  const imagenPrincipal =
    producto.imagenes && producto.imagenes.length > 0
      ? producto.imagenes[0]
      : "https://via.placeholder.com/300x200?text=Sin+Imagen";

  const irADetalle = () => navigate(`/producto/${producto.id_producto}`);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    img.crossOrigin = "anonymous"; // importante para CORS
    const colorThief = new ColorThief();

    img.onload = () => {
      try {
        // Usamos proxy CORS para la extracción
        const urlProxy = `https://cors-anywhere.herokuapp.com/${imagenPrincipal}`;

        // Crear imagen para extracción con proxy
        const imgProxy = new Image();
        imgProxy.crossOrigin = "anonymous";
        imgProxy.src = urlProxy;

        imgProxy.onload = () => {
          try {
            const color = colorThief.getColor(imgProxy);
            const rgbString = `rgb(${color[0]},${color[1]},${color[2]})`;
            setBgColor(rgbString);
          } catch (error) {
            setBgColor("#FDE8F0"); // fallback rosa pastel
          }
        };

        imgProxy.onerror = () => {
          setBgColor("#FDE8F0");
        };
      } catch (error) {
        setBgColor("#FDE8F0");
      }
    };

    // Si la imagen ya está cargada (cache), forzamos el onload para que funcione
    if (img.complete) {
      img.onload();
    }
  }, [imagenPrincipal]);

  return (
    <div
      onClick={irADetalle}
      style={{ backgroundColor: bgColor }}
      className="rounded-3xl p-6 shadow-lg cursor-pointer transition-all hover:shadow-xl"
    >
      <img
        ref={imgRef}
        src={imagenPrincipal}
        alt={producto.nombre_producto}
        crossOrigin="anonymous"
        className="w-full h-48 object-contain mb-4 rounded-2xl bg-white"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
        {producto.nombre_producto}
      </h3>
      <p className="text-sm text-gray-500">{producto.tipo_producto}</p>
      <p className="text-sm text-gray-500">{producto.genero_producto}</p>
      <p className="text-lg font-bold text-gray-900 mt-2">
        ${producto.precio_producto}
      </p>
    </div>
  );
};


export const MostrarProducto = ({ productosProp }) => {
  const [productos, setProductos] = React.useState([]);

  React.useEffect(() => {
    if (!productosProp || productosProp.length === 0) {
      cargarProductos();
    }
  }, [productosProp]);

  const cargarProductos = () => {
    import('axios').then(({ default: axios }) => {
      axios
        .get('http://localhost:3000/producto/public')
        .then((res) => setProductos(res.data))
        .catch((err) => console.error('Error al cargar productos:', err));
    });
  };

  const productosMostrar =
    productosProp && productosProp.length > 0 ? productosProp : productos;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productosMostrar.map((producto) => (
        <CartaProducto key={producto.id_producto} producto={producto} />
      ))}
    </div>
  );
};
