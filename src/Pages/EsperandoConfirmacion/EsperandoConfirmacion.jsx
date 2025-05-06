import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EsperandoConfirmacion = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("Confirmando correo...");

  useEffect(() => {
    if (token) {
      axios.get(`http://localhost:3000/register/confirmar?token=${token}`)
        .then(() => {
          setMensaje("Correo confirmado con éxito. Redirigiendo...");
          setTimeout(() => navigate("/login"), 3000);
        })
        .catch(() => {
          setMensaje("Error al confirmar el correo. El token es inválido o expiró.");
        });
    } else {
      setMensaje("Token no proporcionado.");
    }
  }, [token, navigate]);

  return (
    <div className="text-center mt-10">
      <p className="text-lg">{mensaje}</p>
    </div>
  );
};

export default EsperandoConfirmacion;
