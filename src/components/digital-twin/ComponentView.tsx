import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import type { TelemetryData } from "./useSimulatedData";

interface ComponentViewProps {
  telemetry: TelemetryData;
  isFailureMode: boolean;
  className?: string;
}

type ComponentName = "battery" | "motor" | "controller";

function BatteryPack({ selected, onClick, isFailure }: { selected: boolean; onClick: () => void; isFailure: boolean }) {
  const color = isFailure ? "#ef4444" : selected ? "#22c55e" : "#16a34a";
  return (
    <group position={[-1.2, 0, 0]} onClick={onClick}>
      <mesh>
        <boxGeometry args={[1.8, 0.8, 1]} />
        <meshStandardMaterial color={color} transparent opacity={selected ? 1 : 0.85} />
      </mesh>
      {/* Battery cells */}
      {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.51]}>
          <boxGeometry args={[0.3, 0.6, 0.02]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
      ))}
      <Html position={[0, 0.8, 0]} center>
        <span className="text-xs font-mono text-emerald-400 bg-black/70 px-2 py-0.5 rounded whitespace-nowrap">BATTERY PACK</span>
      </Html>
    </group>
  );
}

function HubMotor({ selected, onClick, isFailure }: { selected: boolean; onClick: () => void; isFailure: boolean }) {
  const color = isFailure ? "#eab308" : selected ? "#22c55e" : "#16a34a";
  return (
    <group position={[1.5, 0, 0]} onClick={onClick}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
        <meshStandardMaterial color={color} transparent opacity={selected ? 1 : 0.85} />
      </mesh>
      <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <Html position={[0, 0.9, 0]} center>
        <span className="text-xs font-mono text-emerald-400 bg-black/70 px-2 py-0.5 rounded whitespace-nowrap">HUB MOTOR</span>
      </Html>
    </group>
  );
}

function Controller({ selected, onClick, isFailure }: { selected: boolean; onClick: () => void; isFailure: boolean }) {
  const color = isFailure ? "#eab308" : selected ? "#22c55e" : "#16a34a";
  return (
    <group position={[0.2, -1, 0]} onClick={onClick}>
      <mesh>
        <boxGeometry args={[0.8, 0.5, 0.6]} />
        <meshStandardMaterial color={color} transparent opacity={selected ? 1 : 0.85} />
      </mesh>
      <Html position={[0, 0.6, 0]} center>
        <span className="text-xs font-mono text-emerald-400 bg-black/70 px-2 py-0.5 rounded whitespace-nowrap">CONTROLLER</span>
      </Html>
    </group>
  );
}

// Wire connections
function Wires() {
  return (
    <>
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[1.5, 0.03, 0.03]} />
        <meshStandardMaterial color="#666" />
      </mesh>
      <mesh position={[-0.5, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.8, 0.03, 0.03]} />
        <meshStandardMaterial color="#666" />
      </mesh>
      <mesh position={[0.85, -0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.8, 0.03, 0.03]} />
        <meshStandardMaterial color="#666" />
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
      <Canvas camera={{ position: [0, 1, 6], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 2, -3]} intensity={0.3} />
        
        <BatteryPack selected={selectedComponent === "battery"} onClick={() => setSelectedComponent("battery")} isFailure={isFailureMode} />
        <HubMotor selected={selectedComponent === "motor"} onClick={() => setSelectedComponent("motor")} isFailure={isFailureMode} />
        <Controller selected={selectedComponent === "controller"} onClick={() => setSelectedComponent("controller")} isFailure={isFailureMode} />
        <Wires />
        
        <OrbitControls enablePan={false} enableZoom={true} minDistance={3} maxDistance={12} />
      </Canvas>

      {/* Component selector tabs */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {(["battery", "motor", "controller"] as ComponentName[]).map((c) => (
          <button
            key={c}
            onClick={() => setSelectedComponent(c)}
            className={`px-3 py-1 text-xs font-mono uppercase rounded border transition-all ${
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
        <div className="absolute top-4 right-4 bg-black/80 border border-emerald-500/30 rounded-lg p-3 min-w-[160px]">
          <h4 className="text-emerald-400 font-mono text-xs uppercase mb-2">{selectedComponent}</h4>
          <div className="space-y-1 text-xs font-mono">
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
