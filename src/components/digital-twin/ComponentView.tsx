import { useState, Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { TelemetryData } from "./useSimulatedData";

interface ComponentViewProps {
  telemetry: TelemetryData;
  isFailureMode: boolean;
  className?: string;
}

type ComponentName = "battery" | "motor" | "controller";

function GLBComponent({ url, position, scale, rotation, selected, onClick, label, isFailure }: {
  url: string;
  position: [number, number, number];
  scale: number;
  rotation?: [number, number, number];
  selected: boolean;
  onClick: () => void;
  label: string;
  isFailure: boolean;
}) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);
  const clonedScene = scene.clone(true);

  // Apply highlight color overlay when selected or failure
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (selected) {
          mat.emissive = new THREE.Color(isFailure ? "#ff2222" : "#22c55e");
          mat.emissiveIntensity = 0.4;
        } else if (isFailure) {
          mat.emissive = new THREE.Color("#eab308");
          mat.emissiveIntensity = 0.2;
        } else {
          mat.emissive = new THREE.Color("#000000");
          mat.emissiveIntensity = 0;
        }
      }
    });
  }, [selected, isFailure, clonedScene]);

  // Gentle float animation when selected
  useFrame((_, delta) => {
    if (ref.current && selected) {
      ref.current.position.y = position[1] + Math.sin(Date.now() * 0.003) * 0.05;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale} rotation={rotation || [0, 0, 0]} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      <primitive object={clonedScene} />
      <Html position={[0, 0.6, 0]} center>
        <span className="text-xs text-emerald-400 bg-black/70 px-2 py-0.5 rounded whitespace-nowrap">{label}</span>
      </Html>
    </group>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-emerald-500 font-mono">Loading Models...</span>
      </div>
    </Html>
  );
}

// Wire connections between components
function Wires() {
  return (
    <>
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[2.5, 0.02, 0.02]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[-0.8, -0.6, 0]} rotation={[0, 0, Math.PI / 5]}>
        <boxGeometry args={[1, 0.02, 0.02]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[0.8, -0.6, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <boxGeometry args={[1, 0.02, 0.02]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </>
  );
}

export function ComponentView({ telemetry, isFailureMode, className }: ComponentViewProps) {
  const [selectedComponent, setSelectedComponent] = useState<ComponentName | null>(null);

  const componentInfo: Record<ComponentName, { rpm?: number; temp: number; torque?: number; health: number }> = {
    battery: { temp: telemetry.batteryTemp, health: telemetry.batterySOH },
    motor: { rpm: telemetry.motorRPM, temp: telemetry.motorTemp, torque: telemetry.torque, health: isFailureMode ? 72 : 94 },
    controller: { temp: telemetry.controllerTemp, health: isFailureMode ? 78 : 96 },
  };

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 1, 8], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, 2, -3]} intensity={0.4} />
        
        <Suspense fallback={<LoadingFallback />}>
          <GLBComponent
            url="/models/battery.glb"
            position={[-2, 0, 0]}
            scale={0.8}
            selected={selectedComponent === "battery"}
            onClick={() => setSelectedComponent("battery")}
            label="BATTERY PACK"
            isFailure={isFailureMode}
          />
          <GLBComponent
            url="/models/mono_motor.glb"
            position={[2, 0, 0]}
            scale={0.8}
            selected={selectedComponent === "motor"}
            onClick={() => setSelectedComponent("motor")}
            label="HUB MOTOR"
            isFailure={isFailureMode}
          />
          <GLBComponent
            url="/models/controller.glb"
            position={[0, -1.2, 0]}
            scale={0.8}
            selected={selectedComponent === "controller"}
            onClick={() => setSelectedComponent("controller")}
            label="CONTROLLER"
            isFailure={isFailureMode}
          />
        </Suspense>
        <Wires />
        
        <OrbitControls enablePan={false} enableZoom={true} minDistance={3} maxDistance={12} />
      </Canvas>

      {/* Component selector tabs */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {(["battery", "motor", "controller"] as ComponentName[]).map((c) => (
          <button
            key={c}
            onClick={() => setSelectedComponent(c)}
            className={`px-3 py-1 text-xs uppercase rounded border transition-all ${
              selectedComponent === c
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                : "border-gray-600 text-gray-400 hover:border-emerald-500/50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Floating info card */}
      {selectedComponent && (
        <div className="absolute top-12 right-4 bg-black/80 border border-emerald-500/30 rounded-lg p-3 min-w-[160px]">
          <h4 className="text-emerald-400 text-xs uppercase mb-2">{selectedComponent}</h4>
          <div className="space-y-1 text-xs">
            {componentInfo[selectedComponent].rpm !== undefined && (
              <div className="flex justify-between"><span className="text-gray-400">RPM</span><span className="text-white">{componentInfo[selectedComponent].rpm}</span></div>
            )}
            <div className="flex justify-between"><span className="text-gray-400">Temp</span><span className={componentInfo[selectedComponent].temp > 55 ? "text-red-400" : "text-white"}>{componentInfo[selectedComponent].temp}°C</span></div>
            {componentInfo[selectedComponent].torque !== undefined && (
              <div className="flex justify-between"><span className="text-gray-400">Torque</span><span className="text-white">{componentInfo[selectedComponent].torque} Nm</span></div>
            )}
            <div className="flex justify-between"><span className="text-gray-400">Health</span><span className={componentInfo[selectedComponent].health < 80 ? "text-red-400" : "text-emerald-400"}>{componentInfo[selectedComponent].health}%</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

// Preload models
useGLTF.preload("/models/battery.glb");
useGLTF.preload("/models/mono_motor.glb");
useGLTF.preload("/models/controller.glb");
