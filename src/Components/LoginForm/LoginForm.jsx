import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export const LoginForm = () => {
    const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    correo: "",
    contraseña: "",
    recaptchaToken:""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecaptchaChange = (token) => {
    setLoginData({
      ...loginData,
      recaptchaToken: token,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

   
  
     

    if (!loginData.recaptchaToken) {
      alert("Por favor, completa el reCAPTCHA.");
      return;
    }
  
    axios.post('http://localhost:3000/auth', loginData)
      .then(response => {
        console.log('Login exitoso:', response.data);
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('rol', response.data.rol);
        if(response.data.rol === 'Empleado' || response.data.rol === 'domiciliario' || response.data.rol === 'vendedor') {
          navigate('/PanelControl')
        }else if(response.data.rol === 'cliente') {
            navigate('/')
        }

        alert('Bienvenido/a!');
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        alert('Correo o contraseña incorrectos');
      });
  };
  

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
      <form  className="space-y-4">
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={loginData.correo}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={loginData.contraseña}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <ReCAPTCHA
          sitekey="6LfVFi4rAAAAAB6uL2mfebBzOhH5ua9lburpWMBn"
          onChange={handleRecaptchaChange}
          className="mb-4"
        />
        <NavLink className="hover:underline" to="/recuperarContrasena">Recuperar contraseña</NavLink>
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

