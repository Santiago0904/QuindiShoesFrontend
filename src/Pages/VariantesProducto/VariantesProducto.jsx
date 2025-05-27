import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../api/axion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export const VariantesProducto = () => {
  const { id } = useParams();
  const [variantes, setVariantes] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [colores, setColores] = useState([]);

  useEffect(() => {
    cargarVariantes();
    cargarTallas();
    cargarColores();
    // eslint-disable-next-line
  }, [id]);

  const cargarVariantes = () => {
    axiosClient
      .get(`/variantes/${id}`)
      .then((res) => setVariantes(res.data))
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error al cargar variantes",
          text: err.message,
          confirmButtonColor: "#2563eb"
        });
      });
  };

  const cargarTallas = () => {
    axiosClient
      .get("/producto/tallas")
      .then((res) => {
        const tallasData = Array.isArray(res.data[0]) ? res.data[0] : res.data;
        setTallas(tallasData);
      })
      .catch(() => setTallas([]));
  };

  const cargarColores = () => {
    axiosClient
      .get("/producto/colores")
      .then((res) => {
        const coloresData = Array.isArray(res.data[0]) ? res.data[0] : res.data;
        setColores(coloresData);
      })
      .catch(() => setColores([]));
  };

  // Utilidad para generar selects HTML como string
  const getSelectHTML = (id, options, selectedValue, placeholder, isColor = false) => {
    return `
      <select id="${id}" class="swal2-input" style="width:95%;margin-bottom:10px;">
        <option value="">${placeholder}</option>
        ${options
          .map(
            (opt) =>
              `<option value="${opt.id_talla || opt.id_color}" ${
                (opt.id_talla === selectedValue || opt.id_color === selectedValue) ? "selected" : ""
              }>${isColor ? `${opt.color} (${opt.codigo_hex})` : opt.talla}</option>`
          )
          .join("")}
      </select>
    `;
  };

  const handleDelete = (idVariante) => {
    Swal.fire({
    title: "¿Estás seguro?",
      text: "Esta variante se eliminará permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" }
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí iría la petición de borrado
        setVariantes(variantes.filter(v => v.id_variantes !== idVariante));
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "La variante ha sido eliminada.",
          timer: 1200,
          showConfirmButton: false
        });
        const token = localStorage.getItem("token");
        axiosClient
          .delete(`/variantes/${idVariante}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(() => {
            setVariantes(variantes.filter(v => v.id_variantes !== idVariante));
            Swal.fire({
              icon: "success",
              title: "Eliminado",
              text: "La variante ha sido eliminada.",
              timer: 1200,
              showConfirmButton: false,
              showClass: { popup: "animate__animated animate__fadeInDown" },
              hideClass: { popup: "animate__animated animate__fadeOutUp" }
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo eliminar la variante.",
              confirmButtonColor: "#2563eb",
              showClass: { popup: "animate__animated animate__shakeX" }
            });
          });
      }
    });
  };

  const handleUpdate = (variante) => {
    Swal.fire({
      title: "Editar Variante",
      html: `
        ${getSelectHTML(
          "id_talla",
          tallas,
          variante.id_talla,
          "Selecciona una talla"
        )}
        ${getSelectHTML(
          "id_color",
          colores,
          variante.id_color,
          "Selecciona un color",
          true
        )}
        <input id="stock" type="number" min="1" class="swal2-input" placeholder="Stock" value="${variante.stock}">
      `,
      focusConfirm: false,
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#64748b",
      customClass: {
        popup: "rounded-2xl animate__animated animate__fadeInDown",
        confirmButton: "bg-blue-600 text-white px-6 py-2 rounded-md font-semibold",
        cancelButton: "bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-semibold"
      },
      preConfirm: () => {
        const id_talla = document.getElementById('id_talla').value.trim();
        const id_color = document.getElementById('id_color').value.trim();
        const stock = document.getElementById('stock').value.trim();
        if (!id_talla || !id_color || !stock || isNaN(stock) || Number(stock) < 1) {
          Swal.showValidationMessage("Todos los campos son obligatorios y el stock debe ser mayor a 0.");
          return false;
        }
        return { id_talla, id_color, stock };
      },
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const token = localStorage.getItem("token");
        axiosClient
          .put(`/variantes/${variante.id_variantes}`, {
            id_talla: result.value.id_talla,
            id_color: result.value.id_color,
            stock: result.value.stock
          }, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Actualizado",
              text: "Variante actualizada correctamente",
              timer: 1200,
              showConfirmButton: false,
              showClass: { popup: "animate__animated animate__fadeInDown" },
              hideClass: { popup: "animate__animated animate__fadeOutUp" }
            });
            cargarVariantes();
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo actualizar la variante",
              confirmButtonColor: "#2563eb",
              showClass: { popup: "animate__animated animate__shakeX" }
            });
          });
      }
    });
  };

  const handleAdd = () => {
    Swal.fire({
      title: "Agregar Variante",
      html: `
        ${getSelectHTML(
          "id_talla",
          tallas,
          "",
          "Selecciona una talla"
        )}
        ${getSelectHTML(
          "id_color",
          colores,
          "",
          "Selecciona un color",
          true
        )}
        <input id="stock" type="number" min="1" class="swal2-input" placeholder="Stock">
      `,
      focusConfirm: false,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#64748b",
      customClass: {
        popup: "rounded-2xl animate__animated animate__fadeInDown",
        confirmButton: "bg-green-600 text-white px-6 py-2 rounded-md font-semibold",
        cancelButton: "bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-semibold"
      },
      preConfirm: () => {
        const id_talla = document.getElementById('id_talla').value.trim();
        const id_color = document.getElementById('id_color').value.trim();
        const stock = document.getElementById('stock').value.trim();
        if (!id_talla || !id_color || !stock || isNaN(stock) || Number(stock) < 1) {
          Swal.showValidationMessage("Todos los campos son obligatorios y el stock debe ser mayor a 0.");
          return false;
        }
        return { id_talla, id_color, stock };
      },
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const token = localStorage.getItem("token");
        axiosClient
          .post(`/variantes`, {
            id_producto: id,
            id_talla: result.value.id_talla,
            id_color: result.value.id_color,
            stock: result.value.stock
          }, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Agregado",
              text: "Variante agregada correctamente",
              timer: 1200,
              showConfirmButton: false,
              showClass: { popup: "animate__animated animate__fadeInDown" },
              hideClass: { popup: "animate__animated animate__fadeOutUp" }
            });
            cargarVariantes();
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo agregar la variante",
              confirmButtonColor: "#2563eb",
              showClass: { popup: "animate__animated animate__shakeX" }
            });
          });
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-3xl shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 animate-fade-in-down tracking-tight">
        Variaciones del Producto
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-3 px-4 rounded-l-xl text-blue-700 font-semibold text-center align-middle">Talla</th>
              <th className="py-3 px-4 text-blue-700 font-semibold text-center align-middle">Color</th>
              <th className="py-3 px-4 text-blue-700 font-semibold text-center align-middle">Código Hex</th>
              <th className="py-3 px-4 text-blue-700 font-semibold text-center align-middle">Stock</th>
              <th className="py-3 px-4 rounded-r-xl text-blue-700 font-semibold text-center align-middle">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {variantes.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400 animate-pulse">
                  No hay variantes registradas.
                </td>
              </tr>
            ) : (
              variantes.map((v) => (
                <tr
                  key={v.id_variantes}
                  className="bg-white shadow-md rounded-xl transition-transform duration-200 hover:scale-[1.01] hover:bg-blue-50"
                >
                  <td className="py-3 px-4 font-medium text-gray-700 text-center align-middle">{v.talla}</td>
                  <td className="py-3 px-4 font-medium text-gray-700 text-center align-middle">{v.color}</td>
                  <td className="py-3 px-4 text-center align-middle">
                    <span
                      className="inline-block px-3 py-1 rounded-full font-mono text-xs shadow"
                      style={{
                        background: v.codigo_hex,
                        color: "#fff",
                        border: "1px solid #e5e7eb",
                        minWidth: 70,
                        textShadow: "0 1px 2px #0006"
                      }}
                    >
                      {v.codigo_hex}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-blue-600 text-center align-middle">{v.stock}</td>
                  <td className="py-3 px-4 flex gap-2 justify-center align-middle">
                    <button
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 transition"
                      title="Editar"
                      onClick={() => handleUpdate(v)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
                      title="Eliminar"
                      onClick={() => handleDelete(v.id_variantes)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-8">
        <button
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all animate-fade-in-up"
          onClick={handleAdd}
        >
          <FaPlus /> Agregar Variante
        </button>
      </div>
    </div>
  );
};