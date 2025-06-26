import React, { useRef, forwardRef, useImperativeHandle} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { GuardarPersonalizado } from "./GuardarPersonalizado";
import { getZonaIdFromName, getColorHexFromStore } from "../PersonalizadorUtils/utils";


function renderNode(node, colores, personalizacion) {
  if (!node) return null;

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

  return (
    <group
      key={node.uuid}
      position={node.position}
      rotation={node.rotation}
      scale={node.scale}
    >
      {node.children?.map((child) => renderNode(child, colores, personalizacion))}
    </group>
  );
}


// ✅ AQUI: forwardRef para exponer el canvas
const PersonalizadorCanvas = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const {scene} = useGLTF("models/nike_shoes.glb");
  const { personalizacion, colores} = GuardarPersonalizado();

  // ✅ Esto permite que el padre acceda al <canvas>
  useImperativeHandle(ref, () => ({
    getCanvas: () => containerRef.current?.querySelector("canvas"),
    getScene: () => scene
  }));

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen min-h-[300px] bg-white"
    >
      <Canvas
        camera={{ position: [0, 1, 5], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }} // importante para capturar la imagen
        className="w-full h-full bg-white"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        {renderNode(scene, colores, personalizacion)}
        <OrbitControls />
      </Canvas>
    </div>
  );
});

export default PersonalizadorCanvas;
