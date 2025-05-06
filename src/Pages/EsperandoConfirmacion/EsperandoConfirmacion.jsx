import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const EsperandoConfirmacion = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState("Confirmando correo...");
    const [error, setError] = useState(false);
  
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get("token");
      console.log("Token extraído:", token); // <-- Aquí debe salir bien
  
      if (token) {
        axios
          .get(`http://localhost:3000/verificar-correo?token=${token}`)
          .then(() => {
            setMensaje("Correo confirmado con éxito. Redirigiendo...");
            setError(false);
            setTimeout(() => navigate("/login"), 3000);
          })
          .catch(() => {
            setMensaje("Error al confirmar el correo. El token es inválido o expiró.");
            setError(true);
          });
      } else {
        setMensaje("Token no proporcionado.");
        setError(true);
      }
    }, [location.search, navigate]);
  
    return (
      <div className="text-center mt-10">
        <p className={`text-lg ${error ? "text-red-500" : "text-green-500"}`}>
          {mensaje}
        </p>
      </div>
    );
  };
  
  export default EsperandoConfirmacion;
  