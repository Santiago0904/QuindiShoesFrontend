import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { GuardarPersonalizado } from "./GuardarPersonalizado";
import { getZonaIdFromName, getColorHexFromStore } from "../PersonalizadorUtils/utils";

// Renderizado recursivo respetando jerarquía
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
useGLTF.preload("https://res.cloudinary.com/dwdjlk9lv/image/upload/v1751481715/nike_shoes_hupdgv.glb");

function ShoeModel() {
  const { scene } = useGLTF("https://res.cloudinary.com/dwdjlk9lv/image/upload/v1751481715/nike_shoes_hupdgv.glb");
  const { personalizacion, colores } = GuardarPersonalizado();

  return renderNode(scene, colores, personalizacion);
}


export default function PersonalizadorCanvas() {
  return (
    <Canvas>
      <ambientLight />
      <directionalLight position={[10, 10, 5]} />
      <ShoeModel />
      <OrbitControls />
    </Canvas>
  );
}