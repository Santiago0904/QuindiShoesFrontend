import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axion";

export const NewProductForm = () => {
    const [producto, setProducto] = useState({
        tipoProducto: "",
        nombreProducto: "",
        generoProducto: "",
        stockProducto: 0,
        tallaProducto: "",
        precioProducto: 0,
        colorProducto: "",
        imagenProducto: "",
    });

    const [tallas, setTallas] = useState([]);
    const [colores, setColores] = useState([]);

    // Estado para nuevo color
    const [nuevoColor, setNuevoColor] = useState("");
    const [nuevoHex, setNuevoHex] = useState("#000000");
    const [mostrarNuevoColor, setMostrarNuevoColor] = useState(false);

    useEffect(() => {
        axiosClient.get("/producto/tallas")
            .then(response => {
                const tallasData = Array.isArray(response.data[0]) ? response.data[0] : response.data;
                setTallas(tallasData);
            })
            .catch(error => {
                console.error("Error al cargar las tallas:", error);
            });

        cargarColores();
    }, []);

    const cargarColores = () => {
        axiosClient.get("/producto/colores")
            .then(response => {
                const coloresData = Array.isArray(response.data[0]) ? response.data[0] : response.data;
                setColores(coloresData);
            })
            .catch(error => {
                console.error("Error al cargar los colores:", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: name === "stockProducto" || name === "precioProducto" ? Number(value) : value,
        });
    };

    // Función para registrar un nuevo color
    const handleAgregarColor = async () => {
        if (!nuevoColor || !nuevoHex) {
            alert("Debes ingresar el nombre y el código hexadecimal del color.");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            await axiosClient.post(
                "/producto/colores",
                { color: nuevoColor, codigo_hex: nuevoHex },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            cargarColores();
            setNuevoColor("");
            setNuevoHex("#000000");
            alert("Color registrado correctamente");
        } catch (error) {
            alert("Error al registrar el color");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const response = await axiosClient.post("/producto", producto, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Producto registrado:", response.data);
            alert("¡Producto registrado con éxito!");

            const nuevoToken = response.headers["x-renewed-token"];
            if (nuevoToken) {
                localStorage.setItem("token", nuevoToken);
            }
        } catch (error) {
            console.error("Error al registrar producto:", error);
            alert("Hubo un error al registrar el producto.");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Registrar Producto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="tipoProducto"
                    placeholder="Tipo de producto"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
                <input
                    name="nombreProducto"
                    placeholder="Nombre del producto"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
                <input
                    name="generoProducto"
                    placeholder="Género del producto"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
                <input
                    name="stockProducto"
                    type="number"
                    placeholder="Stock"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
                {/* Dropdown para Tallas */}
                <select
                    name="tallaProducto"
                    onChange={handleChange}
                    value={producto.tallaProducto}
                    required
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Seleccione una talla</option>
                    {tallas.map((talla) => (
                        <option key={talla.id_talla} value={talla.id_talla}>
                            {talla.talla}
                        </option>
                    ))}
                </select>

                <input
                    name="precioProducto"
                    type="number"
                    placeholder="Precio"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />

                {/* Dropdown para Colores */}
                <div className="flex gap-2">
                    <select
                        name="colorProducto"
                        onChange={handleChange}
                        value={producto.colorProducto}
                        required
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Seleccione un color</option>
                        {colores.map((color) => (
                            <option key={color.id_color} value={color.id_color}>
                                {color.color} ({color.codigo_hex})
                            </option>
                        ))}
                    </select>
                    {/* Botón para mostrar el modal o inputs para agregar nuevo color */}
                    <button
                        type="button"
                        onClick={() => setMostrarNuevoColor(true)}
                        className="bg-green-500 text-white px-3 rounded-md hover:bg-green-600"
                        title="Agregar nuevo color"
                    >
                        +
                    </button>
                </div>

                {/* Inputs para agregar un nuevo color (nombre y hex juntos) */}
                {mostrarNuevoColor && (
                    <div className="flex flex-col gap-2 mt-2 bg-gray-50 p-3 rounded-md border">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Nombre del color"
                                value={nuevoColor}
                                onChange={e => setNuevoColor(e.target.value)}
                                className="flex-1 p-2 border rounded-md"
                            />
                            <input
                                type="color"
                                value={nuevoHex}
                                onChange={e => setNuevoHex(e.target.value)}
                                className="w-12 h-12 p-1 border rounded-md"
                                title="Selecciona el color"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleAgregarColor}
                                className="bg-blue-600 text-white px-3 rounded-md hover:bg-blue-700"
                            >
                                Guardar color
                            </button>
                            <button
                                type="button"
                                onClick={() => setMostrarNuevoColor(false)}
                                className="bg-gray-300 text-gray-700 px-3 rounded-md hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}

                <input
                    name="imagenProducto"
                    placeholder="URL de imagen"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Registrar Producto
                </button>
            </form>
        </div>
    );
};