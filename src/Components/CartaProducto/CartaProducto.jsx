import React, { useContext } from 'react';
import { ContadorCarritoContext } from '../../Contexts/ContadorCarritoContext';
import { useNavigate } from 'react-router-dom';

export const CartaProducto = ({ producto }) => {
  const { incrementarContador } = useContext(ContadorCarritoContext);
  const navigate = useNavigate();

  // Imagen principal
  const imagenPrincipal =
    producto.imagenes && producto.imagenes.length > 0
      ? producto.imagenes[0]
      : "https://via.placeholder.com/300x200?text=Sin+Imagen";

  // Ir al detalle del producto
  const irADetalle = () => {
    navigate(`/producto/${producto.id_producto}`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 flex flex-col items-start hover:shadow-lg transition cursor-pointer"
      onClick={irADetalle}
    >
      <img
        src={imagenPrincipal}
        alt={producto.nombre_producto}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-bold">{producto.nombre_producto}</h3>
      <p>Tipo: {producto.tipo_producto}</p>
      <p>Género: {producto.genero_producto}</p>
      <p>Precio: ${producto.precio_producto}</p>
    </div>
  );
};

// Componente que muestra todos los productos (usuario)
export const MostrarProducto = ({ productosProp }) => {
  const [productos, setProductos] = React.useState([]);

  React.useEffect(() => {
    if (!productosProp || productosProp.length === 0) {
      cargarProductos();
    }
  }, [productosProp]);

  const cargarProductos = () => {
    import('axios').then(({ default: axios }) => {
      axios.get("http://localhost:3000/producto/public")
        .then((res) => {
          setProductos(res.data);
        })
        .catch((err) => console.error("Error al cargar productos:", err));
    });
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