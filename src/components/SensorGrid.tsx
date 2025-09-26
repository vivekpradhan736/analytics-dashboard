import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Thermometer, 
  Battery, 
  Fuel, 
  Gauge, 
  Zap, 
  Wind, 
  BarChart3,
  Droplets,
  Activity,
  AlertTriangle
} from 'lucide-react';
import type { OBDData } from "@/lib/carHealthAnalyzer";

interface SensorGridProps {
  obdData: OBDData;
}

export function SensorGrid({ obdData }: SensorGridProps) {
  const { sensors } = obdData;

  const getSensorStatus = (value: number, thresholds: { normal: number[], warning: number[], critical: number }) => {
    if (value > thresholds.critical) return 'critical';
    if (value > thresholds.warning[1] || value < thresholds.warning[0]) return 'warning';
    return 'normal';
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const sensorData = [
    {
      name: 'Engine Temperature',
      value: sensors.engineTemp,
      unit: '°C',
      icon: <Thermometer className="w-5 h-5" />,
      progress: (sensors.engineTemp / 120) * 100,
      status: getSensorStatus(sensors.engineTemp, { normal: [80, 105], warning: [105, 115], critical: 115 })
    },
    {
      name: 'Battery Voltage',
      value: sensors.batteryVoltage,
      unit: 'V',
      icon: <Battery className="w-5 h-5" />,
      progress: (sensors.batteryVoltage / 14.4) * 100,
      status: getSensorStatus(sensors.batteryVoltage, { normal: [12.4, 14.4], warning: [11.8, 12.4], critical: 11.8 })
    },
    {
      name: 'Coolant Level',
      value: sensors.coolantLevel,
      unit: '%',
      icon: <Droplets className="w-5 h-5" />,
      progress: sensors.coolantLevel,
      status: getSensorStatus(sensors.coolantLevel, { normal: [70, 100], warning: [50, 70], critical: 50 })
    },
    {
      name: 'Engine RPM',
      value: Math.round(sensors.rpm),
      unit: 'RPM',
      icon: <Gauge className="w-5 h-5" />,
      progress: (sensors.rpm / 6000) * 100,
      status: 'normal'
    },
    {
      name: 'Intake Temperature',
      value: sensors.intakeTemp,
      unit: '°C',
      icon: <Wind className="w-5 h-5" />,
      progress: (sensors.intakeTemp / 60) * 100,
      status: getSensorStatus(sensors.intakeTemp, { normal: [10, 40], warning: [40, 60], critical: 60 })
    },
    {
      name: 'Engine Load',
      value: Math.round(sensors.absoluteLoad),
      unit: '%',
      icon: <BarChart3 className="w-5 h-5" />,
      progress: sensors.absoluteLoad,
      status: getSensorStatus(sensors.absoluteLoad, { normal: [0, 80], warning: [80, 95], critical: 95 })
    },
    {
      name: 'Throttle Position',
      value: Math.round(sensors.throttleActuator),
      unit: '%',
      icon: <Activity className="w-5 h-5" />,
      progress: sensors.throttleActuator,
      status: 'normal'
    },
    {
      name: 'Barometric Pressure',
      value: sensors.barometricPressure,
      unit: 'kPa',
      icon: <Zap className="w-5 h-5" />,
      progress: (sensors.barometricPressure / 103) * 100,
      status: 'normal'
    }
  ];

  // Add optional sensors
  if (sensors.transmissionTemp) {
    sensorData.push({
      name: 'Transmission Temp',
      value: sensors.transmissionTemp,
      unit: '°C',
      icon: <Thermometer className="w-5 h-5" />,
      progress: (sensors.transmissionTemp / 120) * 100,
      status: getSensorStatus(sensors.transmissionTemp, { normal: [70, 95], warning: [95, 110], critical: 110 })
    });
  }

  if (sensors.fuelLevel) {
    sensorData.push({
      name: 'Fuel Level',
      value: sensors.fuelLevel,
      unit: '%',
      icon: <Fuel className="w-5 h-5" />,
      progress: sensors.fuelLevel,
      status: getSensorStatus(sensors.fuelLevel, { normal: [25, 100], warning: [10, 25], critical: 10 })
    });
  }

  if (sensors.brakePressure) {
    sensorData.push({
      name: 'Brake Pressure',
      value: sensors.brakePressure,
      unit: '%',
      icon: <AlertTriangle className="w-5 h-5" />,
      progress: sensors.brakePressure,
      status: getSensorStatus(sensors.brakePressure, { normal: [80, 100], warning: [60, 80], critical: 60 })
    });
  }

  if (sensors.tireTread) {
    sensorData.push({
      name: 'Tire Tread Depth',
      value: sensors.tireTread,
      unit: 'mm',
      icon: <AlertTriangle className="w-5 h-5" />,
      progress: (sensors.tireTread / 8) * 100,
      status: getSensorStatus(sensors.tireTread, { normal: [4, 8], warning: [2, 4], critical: 2 })
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Sensor Readings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sensorData.map((sensor, index) => (
            <div key={index} className="text-center p-4 rounded-lg bg-muted/30">
              <div className="flex items-center justify-center mb-2">
                <div className={`p-2 rounded-full ${
                  sensor.status === 'critical' ? 'bg-red-100 text-red-600' :
                  sensor.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {sensor.icon}
                </div>
                {sensor.status !== 'normal' && (
                  <Badge 
                    variant={sensor.status === 'critical' ? 'destructive' : 'secondary'}
                    className="ml-2 text-xs"
                  >
                    {sensor.status}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-1">{sensor.name}</p>
              <p className="text-lg font-bold text-foreground">
                {typeof sensor.value === 'number' ? sensor.value.toFixed(1) : sensor.value}
                <span className="text-sm text-muted-foreground ml-1">{sensor.unit}</span>
              </p>
              <Progress 
                value={Math.min(100, Math.max(0, sensor.progress))} 
                className="mt-2 h-2"
              />
            </div>
          ))}
        </div>
        
        {/* Additional Sensor Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Fuel System</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Short Fuel Trim: {sensors.shortFuelTrim1}%</p>
              <p>Commanded Equiv Ratio: {sensors.commandedEquivRatio.toFixed(3)}</p>
              <p>O2 Sensor Current: {sensors.o2S1WrCurrent.toFixed(4)} mA</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Engine Performance</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Timing Advance: {sensors.timingAdvance}°</p>
              <p>Relative Throttle: {sensors.relativeThrottlePos}%</p>
              <p>Control Module Voltage: {sensors.controlModuleVoltage}V</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}