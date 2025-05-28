import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";


export const BotonReseñas = ({ onClick }: { onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-14 left-6 bg-pink-200 rounded-full shadow-xl transition-all overflow-hidden"
      style={{
        width: hovered ? "160px" : "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: hovered ? "space-around" : "center",
        padding: "0 10px",
      }}
    >
      {/* Estrella SIEMPRE visible */}
      <div>
        <FaStar size={26} color="#16a34a" />
      </div>

      {/* Estrellas que aparecen al hacer hover */}
      {hovered &&
        [...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { delay: (i + 1) * 0.1 },
            }}
          >
            <FaStar size={26} color="#16a34a" />
          </motion.div>
        ))}
    </motion.button>
  );
};
