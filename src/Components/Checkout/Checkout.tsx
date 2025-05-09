// src/components/Checkout.tsx
import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';

export function Checkout() {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago('APP_USR-b602255f-0632-4a80-b9c9-   ');
  }, []);

  const createCheckout = async () => {
    const res = await axios.post('http://localhost:3000/mercadopago/create_preference', {
      items: [
        {
          title: 'Zapatos deportivos',
          description: 'Zapatos deportivos de alta calidad',
          unit_price: 100,
          quantity: 1,
        },
      ],
    });

    setPreferenceId(res.data.id);
  };

  return (
    <div>
      <button onClick={createCheckout}>Generar pago</button>

      {preferenceId && (
        <Wallet initialization={{ preferenceId }}/>
      )}
    </div>
  );
}