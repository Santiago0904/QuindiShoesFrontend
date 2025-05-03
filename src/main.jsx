import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { ContadorCarritoContextProvider } from './Contexts/ContadorCarritoContext.jsx'

createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <BrowserRouter>
      <ContadorCarritoContextProvider>
        <App />
      </ContadorCarritoContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
