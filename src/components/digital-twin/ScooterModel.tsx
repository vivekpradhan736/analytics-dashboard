import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

function VehicleModel() {
  const { scene } = useGLTF("/models/ola_electric_scooter.glb");
  const ref = useRef<THREE.Group>(null);

  // useFrame((_, delta) => {
  //   if (ref.current) {
  //     ref.current.rotation.y += delta * 0.15;
  //   }
  // });

  return (
    <group ref={ref} scale={2.4} position={[0, -1, 0]} rotation={[0, Math.PI / 1.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-emerald-500 font-mono">Loading 3D Model...</span>
      </div>
    </Html>
  );
}

interface ScooterModelProps {
  className?: string;
}

export function ScooterModelViewer({ className }: ScooterModelProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [3, 2, 5], fov: 45 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, 3, -3]} intensity={0.4} />
        <Suspense fallback={<LoadingFallback />}>
          <VehicleModel />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={true} minDistance={3} maxDistance={10} />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/models/ola_electric_scooter.glb");
