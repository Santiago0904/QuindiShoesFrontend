import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { GuardarPersonalizado } from "./GuardarPersonalizado";
import { getZonaIdFromName, getColorHexFromStore } from "../PersonalizadorUtils/utils";


function renderNode(node, colores, personalizacion) {
  if (!node) return null;

  // Si el nodo tiene geometría, renderiza el mesh
  if (node.isMesh && node.geometry) {
    const zonaId = getZonaIdFromName(node.name);
    const colorHex = getColorHexFromStore(zonaId, colores, personalizacion);

    return (
      <mesh
        key={node.uuid}
        geometry={node.geometry}
        position={node.position}
        rotation={node.rotation}
        scale={node.scale}
      >
        <meshStandardMaterial color={colorHex || "#cccccc"} />
      </mesh>
    );
  }

  // Si el nodo es un grupo, renderiza sus hijos reales
  return (
    <group
      key={node.uuid}
      position={node.position}
      rotation={node.rotation}
      scale={node.scale}
    >
      {node.children &&
        node.children.map((child) =>
          renderNode(child, colores, personalizacion)
        )}
    </group>
  );
}

function ShoeModel() {
  const { scene } = useGLTF("/models/nike_shoes.glb");

  const { personalizacion, colores } = GuardarPersonalizado();

  // Renderiza desde el nodo raíz (scene)
  return renderNode(scene, colores, personalizacion);
}

export default function PersonalizadorCanvas() {
  const containerRef = useRef(null);

  const handleDownload = () => {
    // Busca el canvas real dentro del contenedor
    const realCanvas = containerRef.current?.querySelector("canvas");
    if (realCanvas) {
      const image = realCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "zapato_personalizado.png";
      link.click();
    }
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <Canvas>
        <ambientLight />
        <directionalLight position={[10, 10, 5]} />
        <ShoeModel />
        <OrbitControls />
      </Canvas>
      <button
        onClick={handleDownload}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 10,
          padding: "8px 16px",
          background: "#6366f1",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Descargar imagen
      </button>
    </div>
  );
}
