import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ParticlesBackground } from "../Particulas/ParticlesBackground";

const MySwal = withReactContent(Swal);

export const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    correo: "",
    contraseña: "",
    recaptchaToken: "",
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.recaptchaToken) {
      MySwal.fire({
        icon: "warning",
        title: "¡reCAPTCHA requerido!",
        text: "Por favor, completa el reCAPTCHA.",
        confirmButtonColor: "#f472b6", // rosa pastel
      });
      return;
    }

    axios
      .post("http://localhost:3000/auth", loginData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("rol", response.data.rol);

        MySwal.fire({
          icon: "success",
          title: "¡Bienvenido/a!",
          text: "Inicio de sesión exitoso.",
          confirmButtonColor: "#a7f3d0", // verde pastel
          background: "#fff0f5",
        });

        if (
          response.data.rol === "Empleado" ||
          response.data.rol === "domiciliario" ||
          response.data.rol === "vendedor"
        ) {
          navigate("/PanelControl");
        } else if (response.data.rol === "cliente") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        MySwal.fire({
          icon: "error",
          title: "Error de autenticación",
          text: "Correo o contraseña incorrectos.",
          confirmButtonColor: "#fda4af", // rojo pastel
          background: "#fff1f2",
        });
      });
  };

  return (
    <>
      <ParticlesBackground />
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border border-green-100 mt-[-50px]">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Iniciar Sesión
          </h2>
          <form className="space-y-5">
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={loginData.correo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
            <input
              type="password"
              name="contraseña"
              placeholder="Contraseña"
              value={loginData.contraseña}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
            <ReCAPTCHA
              sitekey="6LfVFi4rAAAAAB6uL2mfebBzOhH5ua9lburpWMBn"
              onChange={handleRecaptchaChange}
            />
            <div className=" flex justify-between ">

                <NavLink
                className="text-sm text-green-600 hover:underline"
                to="/Register"
              >
                Registrarse
              </NavLink>

              <NavLink
                className="text-sm text-green-600 hover:underline"
                to="/recuperarContrasena"
              >
                Recuperar contraseña
              </NavLink>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors font-semibold"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
