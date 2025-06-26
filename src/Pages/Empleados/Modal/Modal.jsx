import React, { useState } from "react";
import axiosClient from "../../../api/axion";

const ModalActualizarEmpleado = ({ empleado, onClose, onActualizar }) => {
  const [formData, setFormData] = useState({ ...empleado });
    const [mostrarModal, setMostrarModal] = useState(false);
    const [empleadoEditar, setEmpleadoEditar] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos a enviar:", formData);
      console.log("ID del empleado:", formData.id);
      await axiosClient.put(`/empleado/${formData.id}`, formData);
      onActualizar();
      onClose();
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      alert("Error al actualizar empleado");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Actualizar Empleado</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            placeholder="Nombres"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            placeholder="Apellidos"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Dirección"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="Correo"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            placeholder="Rol"
            required
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-red-500 px-4 py-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalActualizarEmpleado;
