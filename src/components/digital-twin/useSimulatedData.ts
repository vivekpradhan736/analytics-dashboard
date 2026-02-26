import { useState, useEffect, useCallback } from "react";

export interface TelemetryData {
  vehicleHealth: number;
  batterySOH: number;
  remainingRange: number;
  serviceDue: number;
  activeAlerts: number;
  machineStatus: "Normal" | "Warning" | "Critical";
  batteryTemp: number;
  motorTemp: number;
  motorRPM: number;
  motorVibration: number;
  energyConsumption: number;
  speed: number;
  torque: number;
  efficiencyScore: number;
  powerConsumption: number;
  batteryVoltage: number;
  controllerTemp: number;
}

export interface AlertLog {
  id: string;
  source: string;
  message: string;
  time: string;
  type: "info" | "warning" | "critical";
}

export interface PredictiveData {
  failureProbability: number;
  remainingLife: number;
  recommendedAction: string;
  costAvoided: number;
}

export interface RideIntelligence {
  ridingStyleScore: number;
  batteryStressIndex: number;
  efficiencyLoss: number;
}

const randomInRange = (min: number, max: number, decimals = 1) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

const jitter = (base: number, range: number, decimals = 1) =>
  parseFloat((base + (Math.random() - 0.5) * 2 * range).toFixed(decimals));

export function useSimulatedData() {
  const [isFailureMode, setIsFailureMode] = useState(false);
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    vehicleHealth: 95.8,
    batterySOH: 91.2,
    remainingRange: 79.2,
    serviceDue: 187,
    activeAlerts: 0,
    machineStatus: "Normal",
    batteryTemp: 37.6,
    motorTemp: 50.6,
    motorRPM: 3124,
    motorVibration: 10.9,
    energyConsumption: 2.45,
    speed: 43.3,
    torque: 27.3,
    efficiencyScore: 88.0,
    powerConsumption: 1.87,
    batteryVoltage: 48.2,
    controllerTemp: 42.1,
  });

  const [alerts, setAlerts] = useState<AlertLog[]>([
    { id: "1", source: "System", message: "Predictive model updated", time: "16:21:40", type: "info" },
    { id: "2", source: "Controller", message: "Thermal management activated", time: "16:21:32", type: "info" },
  ]);

  const [predictive, setPredictive] = useState<PredictiveData>({
    failureProbability: 3.2,
    remainingLife: 847,
    recommendedAction: "No immediate action required",
    costAvoided: 12500,
  });

  const [rideIntel, setRideIntel] = useState<RideIntelligence>({
    ridingStyleScore: 82,
    batteryStressIndex: 18,
    efficiencyLoss: 6.3,
  });

  const [batteryTempHistory, setBatteryTempHistory] = useState<{ time: string; value: number }[]>(
    Array.from({ length: 20 }, (_, i) => ({ time: `${i}`, value: 35 + Math.random() * 5 }))
  );
  const [vibrationHistory, setVibrationHistory] = useState<{ time: string; value: number }[]>(
    Array.from({ length: 20 }, (_, i) => ({ time: `${i}`, value: 8 + Math.random() * 6 }))
  );
  const [energyHistory, setEnergyHistory] = useState<{ time: string; value: number }[]>(
    Array.from({ length: 20 }, (_, i) => ({ time: `${i}`, value: 2 + Math.random() * 1 }))
  );

  const triggerFailure = useCallback(() => {
    setIsFailureMode(true);
    setTimeout(() => setIsFailureMode(false), 30000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        if (isFailureMode) {
          return {
            ...prev,
            vehicleHealth: jitter(72, 3),
            batterySOH: jitter(78, 2),
            batteryTemp: jitter(58, 3),
            remainingRange: jitter(42, 5),
            activeAlerts: 3,
            machineStatus: "Critical",
            motorTemp: jitter(82, 4),
            motorVibration: jitter(22, 3),
            speed: jitter(25, 5),
            torque: jitter(18, 3),
            efficiencyScore: jitter(62, 4),
            powerConsumption: jitter(3.2, 0.4),
            energyConsumption: jitter(4.1, 0.3),
            controllerTemp: jitter(65, 3),
          };
        }
        return {
          vehicleHealth: jitter(prev.vehicleHealth, 0.3),
          batterySOH: jitter(prev.batterySOH, 0.2),
          remainingRange: jitter(prev.remainingRange, 1),
          serviceDue: prev.serviceDue,
          activeAlerts: Math.random() > 0.95 ? 1 : 0,
          machineStatus: jitter(prev.batteryTemp, 0.5) > 50 ? "Critical" : "Normal",
          batteryTemp: jitter(prev.batteryTemp, 0.5),
          motorTemp: jitter(prev.motorTemp, 0.8),
          motorRPM: Math.round(jitter(prev.motorRPM, 50, 0)),
          motorVibration: jitter(prev.motorVibration, 0.4),
          energyConsumption: jitter(prev.energyConsumption, 0.08),
          speed: jitter(prev.speed, 1.5),
          torque: jitter(prev.torque, 0.8),
          efficiencyScore: jitter(prev.efficiencyScore, 0.5),
          powerConsumption: jitter(prev.powerConsumption, 0.05),
          batteryVoltage: jitter(prev.batteryVoltage, 0.3),
          controllerTemp: jitter(prev.controllerTemp, 0.5),
        };
      });

      setBatteryTempHistory((prev) => {
        const next = [...prev.slice(1), { time: `${Date.now()}`, value: isFailureMode ? randomInRange(52, 62) : randomInRange(35, 42) }];
        return next;
      });
      setVibrationHistory((prev) => {
        const next = [...prev.slice(1), { time: `${Date.now()}`, value: isFailureMode ? randomInRange(18, 26) : randomInRange(8, 14) }];
        return next;
      });
      setEnergyHistory((prev) => {
        const next = [...prev.slice(1), { time: `${Date.now()}`, value: isFailureMode ? randomInRange(3.5, 4.8) : randomInRange(2, 3) }];
        return next;
      });

      if (isFailureMode) {
        setPredictive({
          failureProbability: randomInRange(65, 85),
          remainingLife: Math.round(randomInRange(12, 45, 0)),
          recommendedAction: "Immediate battery inspection required – thermal anomaly detected",
          costAvoided: Math.round(randomInRange(35000, 55000, 0)),
        });
        setRideIntel({
          ridingStyleScore: Math.round(randomInRange(45, 60, 0)),
          batteryStressIndex: Math.round(randomInRange(65, 82, 0)),
          efficiencyLoss: randomInRange(18, 28),
        });
      } else {
        setPredictive((prev) => ({
          ...prev,
          failureProbability: jitter(prev.failureProbability, 0.3),
          costAvoided: Math.round(jitter(prev.costAvoided, 200, 0)),
        }));
        setRideIntel((prev) => ({
          ...prev,
          ridingStyleScore: Math.round(jitter(prev.ridingStyleScore, 1, 0)),
          batteryStressIndex: Math.round(jitter(prev.batteryStressIndex, 0.5, 0)),
          efficiencyLoss: jitter(prev.efficiencyLoss, 0.2),
        }));
      }

      // Random alert
      if (Math.random() > 0.85 || isFailureMode) {
        const sources = ["Battery", "Motor", "Controller", "System"];
        const messages = isFailureMode
          ? ["Thermal threshold exceeded", "Voltage anomaly detected", "Emergency cooling activated", "Degradation rate elevated"]
          : ["Predictive model updated", "Thermal management activated", "Routine check passed", "Telemetry synced"];
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
        setAlerts((prev) => [
          {
            id: `${Date.now()}`,
            source: sources[Math.floor(Math.random() * sources.length)],
            message: messages[Math.floor(Math.random() * messages.length)],
            time: timeStr,
            type: isFailureMode ? (Math.random() > 0.5 ? "critical" : "warning") : "info",
          },
          ...prev.slice(0, 9),
        ]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isFailureMode]);

  return {
    telemetry,
    alerts,
    predictive,
    rideIntel,
    batteryTempHistory,
    vibrationHistory,
    energyHistory,
    isFailureMode,
    triggerFailure,
  };
}
