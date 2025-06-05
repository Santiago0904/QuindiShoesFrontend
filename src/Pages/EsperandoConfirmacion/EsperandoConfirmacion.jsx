import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const EsperandoConfirmacion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);
  const yaProcesado = useRef(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    // Si no hay token, simplemente mostrar mensaje de espera
    if (!token) {
      setMensaje("El registro está en proceso. Revisa tu correo para confirmar.");
      return;
    }

    // Si hay token, proceder a confirmación
    const confirmarCorreo = async () => {
      if (yaProcesado.current) return;
      yaProcesado.current = true;

      try {
        setMensaje("Confirmando correo...");
        await axios.get(`http://localhost:5173/verificar-correo?token=${token}`);
        setMensaje("Correo confirmado con éxito. Redirigiendo...");
        setError(false);
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setMensaje("Error al confirmar el correo. El token es inválido o expiró.");
        setError(true);
      }
    };

    confirmarCorreo();
  }, [location.search, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800 font-sans">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg w-96">
        {/* Animación de carga minimalista */}
        {!error && !mensaje.includes("Correo confirmado") && (
          <div className="mb-4">
            <div className="w-10 h-10 border-4 border-t-4 border-gray-500 border-solid rounded-full animate-spin mx-auto"></div>
          </div>
        )}
        <p className={`text-lg ${error ? "text-red-500" : "text-gray-800"} font-light`}>
          {mensaje}
        </p>
      </div>
    </div>
  );
};

export default EsperandoConfirmacion;
