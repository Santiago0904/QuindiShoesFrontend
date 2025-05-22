    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import axios from 'axios';

    export function RegisterForm() {
    const navigate = useNavigate();

    const [formulario, setFormulario] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        telefono: '',
        direccion: '',
        contrasena: '',
        rol: 'cliente'
    });

    const [errores, setErrores] = useState({});
    const [errorServidor, setErrorServidor] = useState('');

    const manejarCambio = (e) => {
        setFormulario(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        const nuevosErrores = {};

        if (!formulario.nombres) nuevosErrores.nombres = 'El nombre es obligatorio.';
        if (!formulario.apellidos) nuevosErrores.apellidos = 'El apellido es obligatorio.';
        if (!formulario.correo) nuevosErrores.correo = 'El correo es obligatorio.';
        if (!formulario.telefono) nuevosErrores.telefono = 'El teléfono es obligatorio.';
        if (!formulario.direccion) nuevosErrores.direccion = 'La dirección es obligatoria.';
        if (!formulario.contrasena) nuevosErrores.contrasena = 'La contraseña es obligatoria.';

        if (Object.keys(nuevosErrores).length > 0) {
        setErrores(nuevosErrores);
        return;
        }

        try {
            console.log('Formulario a enviar:', formulario);
        await axios.post('http://localhost:3000/register', formulario);
        navigate('/esperando-confirmacion'); // Redirige a componente de confirmación
        } catch (error) {
        console.error('Error al registrar:', error);
        const mensaje = error.response?.data?.mensaje || 'Error en el registro. Intenta nuevamente.';
        setErrorServidor(mensaje);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Registro de Usuario</h2>
        {errorServidor && (
            <p className="text-red-500 text-sm mb-4">{errorServidor}</p>
        )}
        <form onSubmit={manejarEnvio}>
            {[
            { id: 'nombres', label: 'Nombres', tipo: 'text' },
            { id: 'apellidos', label: 'Apellidos', tipo: 'text' },
            { id: 'correo', label: 'Correo electrónico', tipo: 'email' },
            { id: 'telefono', label: 'Teléfono', tipo: 'text' },
            { id: 'direccion', label: 'Dirección', tipo: 'text' },
            { id: 'contrasena', label: 'Contraseña', tipo: 'password' }
            ].map(campo => (
            <div className="mb-4" key={campo.id}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={campo.id}>
                {campo.label}
                </label>
                <input
                id={campo.id}
                name={campo.id}
                type={campo.tipo}
                value={formulario[campo.id]}
                onChange={manejarCambio}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errores[campo.id] ? 'border-red-500' : ''}`}
                placeholder={campo.label}
                />
                {errores[campo.id] && (
                <p className="text-red-500 text-xs italic mt-1">{errores[campo.id]}</p>
                )}
            </div>
            ))}

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
