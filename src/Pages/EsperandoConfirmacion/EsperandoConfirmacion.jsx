import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const EsperandoConfirmacion = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
        axios.get(`http://localhost:3000/register/confirmar/${token}`)
        .then(res => {
          console.log("Confirmación exitosa:", res.data);
        })
        .catch(err => {
          console.error("Error al confirmar:", err);
        });
    }
  }, [token]);

  return <div>Confirmando correo...</div>;
};

export default EsperandoConfirmacion;
