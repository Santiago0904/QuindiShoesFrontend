import React, { useState } from "react";
import axios from "axios";

export const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:22057/auth', credenciales)
      .then(response => {
        console.log('Login exitoso:', response.data);
        alert('Bienvenida, ' + response.data.nombre + '!');
     
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        alert('Correo o contraseña incorrectos');
      });
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={loginData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={loginData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

