import React from "react";
import { FormEmpleados } from "../../../Components/FormEmpleados/FormEmpleados";

const ModalActualizarEmpleado = ({ empleado, onClose, onActualizar }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div className="w-full max-w-3xl">
      <FormEmpleados
        initialData={empleado}
        modo="actualizar"
        onSuccess={onActualizar}
      />
      <button
        onClick={onClose}
        className="w-full mt-4 bg-pink-200 text-pink-700 px-6 py-2 rounded-lg shadow hover:bg-pink-300 transition-all font-semibold"
      >
        Cancelar
      </button>
    </div>
  </div>
);

export default ModalActualizarEmpleado;
