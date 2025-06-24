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
  console.log("GLTF cargado:", gltf);

  const { personalizacion, colores } = GuardarPersonalizado();

  // Renderiza desde el nodo raíz (scene)
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