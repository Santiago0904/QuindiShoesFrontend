import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { GuardarPersonalizado } from './GuardarPersonalizado';

function ShoeModel() {
  const { nodes } = useGLTF('/models/zapato.glb');
  const { personalizacion, colores } = GuardarPersonalizado();

  return (
    <group>
      {Object.entries(nodes).map(([name, mesh]) => {
        const zonaId = getZonaIdFromName(name); // función que traduce "zona_suela" a ID
        const colorHex = getColorHexFromStore(zonaId, colores, personalizacion);
        
        return (
          <mesh key={name} geometry={mesh.geometry} position={mesh.position}>
            <meshStandardMaterial color={colorHex || '#cccccc'} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ShoeCustomizerCanvas() {
  return (
    <Canvas>
      <ambientLight />
      <directionalLight position={[10, 10, 5]} />
      <ShoeModel />
      <OrbitControls />
    </Canvas>
  );
}
