import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import { GuardarPersonalizado } from './GuardarPersonalizado';
import { getZonaIdFromName, getColorHexFromStore } from '../PersonalizadorUtils/utils';

// Componente hijo para cada parte del zapato
function ShoeMesh({ mesh, name, colorHex, textureUrl }) {
  // Solo llama useTexture si hay una URL válida
  const texture = textureUrl ? useTexture(textureUrl) : null;

  return (
    <mesh
      geometry={mesh.geometry}
      position={mesh.position}
      rotation={mesh.rotation}
      scale={mesh.scale}
      material={undefined}
    >
      <meshStandardMaterial
        color={colorHex || '#cccccc'}
        map={texture}
        emissive={colorHex || '#000000'}
        emissiveIntensity={1}
      />
    </mesh>
  );
}

function ShoeModel() {
  const { nodes } = useGLTF('/models/nike_shoes.glb');
  const { personalizacion, colores, materiales } = GuardarPersonalizado();

  return (
    <group>
      {Object.entries(nodes).map(([name, mesh]) => {
        const zonaId = getZonaIdFromName(name);
        const colorHex = getColorHexFromStore(zonaId, colores, personalizacion);
        const materialId = personalizacion[zonaId]?.materialId;
        const textureUrl = materialId
          ? `http://localhost:3000/material/imagen/${materialId}`
          : null;

        return (
          <ShoeMesh
            key={name}
            mesh={mesh}
            name={name}
            colorHex={colorHex}
            textureUrl={textureUrl}
          />
        );
      })}
    </group>
  );
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