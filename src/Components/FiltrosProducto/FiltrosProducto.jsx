
export const FiltroProductos = ({ filtros, setFiltros }) => {
  return (
    <div className="flex flex-wrap gap-4 items-end mb-6">
      <input
        type="text"
        placeholder="Buscar producto"
        value={filtros.nombre}
        onChange={(e) => setFiltros(prev => ({ ...prev, nombre: e.target.value }))}
        className="border p-2 rounded"
      />
      <select
        value={filtros.genero}
        onChange={(e) => setFiltros(prev => ({ ...prev, genero: e.target.value }))}
        className="border p-2 rounded"
      >
        <option value="">Todos los géneros</option>
        <option value="hombre">Hombre</option>
        <option value="mujer">Mujer</option>
        <option value="unisex">Unisex</option>
      </select>
      <select
        value={filtros.tipo}
        onChange={(e) => setFiltros(prev => ({ ...prev, tipo: e.target.value }))}
        className="border p-2 rounded"
      >
        <option value="">Todos los tipos</option>
        <option value="deportivo">Deportivo</option>
        <option value="casual">Casual</option>
        {/* Agrega más según tus datos */}
      </select>
      {/* Más filtros aquí como talla, color, precioMin, precioMax */}
    </div>
  );
};

