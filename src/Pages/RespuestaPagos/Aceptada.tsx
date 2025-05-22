// src/pages/SuccessPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export function Aceptada() {
    return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600">¡Pago exitoso!</h1>
      <p>Gracias por tu compra.</p>
    </div>

  );
}
