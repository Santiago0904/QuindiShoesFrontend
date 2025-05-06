import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
function RegisterForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Obtenemos ?token= de la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  // Efecto para verificar token de email cuando existe
  useEffect(() => {
    if (token) {
      fetch(`/api/verify-email?token=${token}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Token inválido');
          }
          return res.json();
        })
        .then(() => {
          // Verificación exitosa: redirigir al login
          navigate('/login');
        })
        .catch(err => {
          console.error(err);
          setServerError('Error al verificar el correo.');
        });
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    
    if (!formData.name) nuevosErrores.name = 'El nombre es obligatorio.';
    if (!formData.email) nuevosErrores.email = 'El correo es obligatorio.';
    if (!formData.password) nuevosErrores.password = 'La contraseña es obligatoria.';
  
    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      return;
    }
  
    try {
    await axios.post('http://localhost:3000/register', formData);
  
      // Registro exitoso: redirigir al login
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      const mensaje = error.response?.data?.mensaje || 'Error en el registro. Intenta nuevamente.';
      setServerError(mensaje);
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Registro de Usuario</h2>
      {serverError && (
        <p className="text-red-500 text-sm mb-4">{serverError}</p>
      )}
      <form onSubmit={handleSubmit}>
        {/* Campo Nombre */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={
              "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " +
              (errors.name ? "border-red-500" : "")
            }
            placeholder="Tu nombre"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Campo Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={
              "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " +
              (errors.email ? "border-red-500" : "")
            }
            placeholder="Correo electrónico"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Campo Contraseña */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={
              "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " +
              (errors.password ? "border-red-500" : "")
            }
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* Botón de Envío */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
