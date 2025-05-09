// src/pages/SuccessPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export function Aceptada() {
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [error, setError] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentId = searchParams.get('payment_id');
    const preferenceId = searchParams.get('preference_id');
    const status = searchParams.get('status');

    if (paymentId && preferenceId && status) {
      // Verificamos el estado del pago con Axios
      axios
        .post('http://localhost:3000/api/payment/verify_payment', { paymentId, preferenceId })
        .then((response) => {
          // Aquí puedes manejar la respuesta y mostrar un mensaje dependiendo del estado del pago
          setPaymentStatus(`Pago verificado con éxito. Estado: ${response.data.status}`);
        })
        .catch((error) => {
          setError('Hubo un problema al verificar el pago.');
          console.error(error);
        });
    }
  }, [location]);

  return (
    <div>
      <h1>Pago aprobado</h1>
      {paymentStatus ? (
        <p>{paymentStatus}</p>
      ) : (
        <p>Estamos verificando tu pago. Por favor, espera...</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
