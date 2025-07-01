import React from "react";
import { FormEmpleados } from "../../../Components/FormEmpleados/FormEmpleados";
import { motion } from "framer-motion";

const ModalActualizarEmpleado = ({ empleado, onClose, onActualizar }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
    <div className="w-full max-w-3xl">
      <FormEmpleados
        initialData={empleado}
        modo="actualizar"
        onSuccess={onActualizar}
      />

      <div className="flex justify-center mt-4">
        <motion.button
          onClick={onClose}
          className="px-6 py-2 bg-rose-100 text-rose-800 rounded-full shadow font-semibold text-sm hover:bg-rose-200 transition-all"
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          Cancelar
        </motion.button>
      </div>
    </div>
  </div>
);

export default ModalActualizarEmpleado;
