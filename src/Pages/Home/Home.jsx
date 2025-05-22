import React from 'react'
import { BuscadorProductos } from '../../Components/BuscadorProducto.ts/BuscadorProducto'
import ChatWidget from '../../Components/ChatBot/ChatBot'
export const Home = () => {
  return (
    <div>
      <BuscadorProductos />
      <p>HOLAAA</p>
      <ChatWidget/> 
    </div>
  )
}
