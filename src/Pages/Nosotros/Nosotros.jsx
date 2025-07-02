import React from "react";
import { motion } from "framer-motion";
import nuestraHistoria from "../../assets/images/pexels-atahandemir-10323260.jpg"
export const Nosotros = () => {
  return (
    <div className="w-full bg-white text-gray-800 font-sans">
      {/* HERO */}
      <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1549294413-26f195200c16"
          alt="Filosofía QuindiShoes"
          className="absolute w-full h-full object-cover object-center brightness-[0.5]"
        />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Nuestra Filosofía</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Cada paso cuenta. Cada historia importa.
          </p>
        </div>
      </section>

      {/* HISTORIA */}
      <motion.section
        className="max-w-5xl mx-auto px-6 py-20 space-y-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#c72c5e] mb-4">Desde 2023, pisando firme</h2>
          <p className="text-gray-600 text-lg">
  QuindiShoes nació en 2023 con una idea clara: ofrecer una curaduría de calzado que combine estilo, calidad y accesibilidad. Desde entonces, hemos crecido con pasos firmes, convirtiéndonos en una tienda de referencia para quienes valoran cada detalle en su andar diario.
</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src={nuestraHistoria}
            alt="Nuestra historia"
            className="rounded-3xl shadow-xl"
          />
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#b65775]">Una tienda con propósito</h3>
<p className="text-gray-700">
  Elegimos cada par como si fuera para nosotros mismos. Más que vender zapatos, conectamos personas con estilo, seguridad y bienestar a través de una experiencia de compra cercana y moderna.
</p>
<p className="text-gray-700">
  Nos aliamos con marcas comprometidas con el confort, la innovación y la responsabilidad. Porque creemos que cada paso puede ser más consciente.
</p>
          </div>
        </div>
      </motion.section>

      {/* VALORES */}
      <motion.section
        className="bg-[#fef6f9] py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#c72c5e]">Nuestros pilares</h2>
<p className="text-gray-600 mt-4 max-w-2xl mx-auto">
  No somos una marca de zapatos. Somos una tienda que selecciona cuidadosamente lo que usas, porque sabemos que cada paso refleja tu historia.
</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
  {
    titulo: "Selección con criterio",
    texto:
      "Investigamos, probamos y elegimos marcas que cumplen con estándares de comodidad, estilo y durabilidad. Solo ofrecemos lo que realmente usaríamos.",
  },
  {
    titulo: "Belleza con conciencia",
    texto:
      "Priorizamos marcas que trabajan con materiales nobles, procesos responsables y una visión a largo plazo.",
  },
  {
    titulo: "Experiencia que acompaña",
    texto:
      "No se trata solo del producto: se trata de cómo te sientes cuando lo recibes, cuando lo usas, y cuando sabes que elegiste bien.",
  },
].map((val, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-white rounded-3xl shadow-md text-left space-y-3 border border-pink-100"
            >
              <h3 className="text-xl font-semibold text-[#b65775]">{val.titulo}</h3>
              <p className="text-gray-600 text-sm">{val.texto}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FRASE FINAL */}
      <motion.div
        className="py-40 text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#c72c5e] max-w-3xl mx-auto">
  Porque no se trata solo de vender zapatos. Se trata de ayudarte a caminar con confianza.
</h2>
      </motion.div>
    </div>
  );
};