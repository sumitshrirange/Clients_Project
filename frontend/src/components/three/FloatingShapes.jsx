import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei";

// A single slowly-rotating, slightly-distorted shape. `Float` (from Drei)
// gives it gentle non-user-triggered bobbing — the one deliberate ambient
// motion in the hero, kept subtle rather than scattered across everything.
const Shape = ({ position, color, geometry, scale = 1, speed = 1 }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15 * speed;
  });

  return (
    <Float speed={1.4 * speed} rotationIntensity={0.4} floatIntensity={1.1}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry}
        <MeshDistortMaterial color={color} roughness={0.25} metalness={0.1} distort={0.25} speed={1.5} />
      </mesh>
    </Float>
  );
};

const Scene = () => (
  <>
    <ambientLight intensity={0.8} />
    <directionalLight position={[3, 4, 2]} intensity={1.2} />
    <Shape position={[-0.6, 0.6, 0]} color="#6C4CF1" geometry={<icosahedronGeometry args={[1, 0]} />} scale={1.05} />
    <Shape position={[1.1, -0.5, -0.6]} color="#3E63F5" geometry={<torusGeometry args={[0.55, 0.2, 16, 64]} />} scale={0.9} speed={0.8} />
    <Shape position={[0.3, -1.1, 0.4]} color="#9FF0C9" geometry={<octahedronGeometry args={[0.6, 0]} />} scale={0.8} speed={1.2} />
    <Environment preset="city" />
  </>
);

// Exported wrapped in its own Canvas + Suspense so the parent can simply
// lazy-load this whole file and drop in a static fallback while it loads,
// or skip it entirely on low-power/mobile contexts.
const FloatingShapes = () => (
  <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} gl={{ antialias: true, alpha: true }}>
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  </Canvas>
);

export default FloatingShapes;
