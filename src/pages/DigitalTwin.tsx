import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Activity, Battery, Gauge, Zap, AlertTriangle, ThermometerSun,
  Wrench, Timer, MapPin, TrendingUp, Shield, Play
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area,
} from "recharts";
import { useSimulatedData } from "@/components/digital-twin/useSimulatedData";
import { ScooterModelViewer } from "@/components/digital-twin/ScooterModel";
import { ComponentView } from "@/components/digital-twin/ComponentView";

const DigitalTwin = () => {
  const {
    telemetry, alerts, predictive, rideIntel,
    batteryTempHistory, vibrationHistory, energyHistory,
    isFailureMode, triggerFailure,
  } = useSimulatedData();

  const [twinView, setTwinView] = useState<"vehicle" | "components">("vehicle");

  const statusColor = telemetry.machineStatus === "Critical" ? "text-red-500" : telemetry.machineStatus === "Warning" ? "text-yellow-500" : "text-emerald-500";

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Vehicle Intelligence Platform</h2>
            <p className="text-muted-foreground">AI-Powered Vehicle Intelligence & Predictive Decision System</p>
          </div>
          <Button
            variant={isFailureMode ? "destructive" : "outline"}
            size="sm"
            onClick={triggerFailure}
            disabled={isFailureMode}
          >
            <Play className="w-4 h-4 mr-1" />
            {isFailureMode ? "Failure Active..." : "Run Failure Simulation"}
          </Button>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <KpiCard icon={<Activity className="w-4 h-4" />} label="VEHICLE HEALTH" value={telemetry.vehicleHealth.toFixed(1)} unit="/100" isFailure={isFailureMode && telemetry.vehicleHealth < 80} />
          <KpiCard icon={<Battery className="w-4 h-4" />} label="BATTERY SOH" value={telemetry.batterySOH.toFixed(1)} unit="%" isFailure={isFailureMode && telemetry.batterySOH < 85} />
          <KpiCard icon={<Zap className="w-4 h-4" />} label="REMAINING RANGE" value={telemetry.remainingRange.toFixed(1)} unit=" km" />
          <KpiCard icon={<Timer className="w-4 h-4" />} label="SERVICE DUE" value={`${telemetry.serviceDue}`} unit=" days" />
          <KpiCard icon={<AlertTriangle className="w-4 h-4" />} label="ACTIVE ALERTS" value={`${telemetry.activeAlerts}`} unit="" isFailure={telemetry.activeAlerts > 0} />
          <Card className="p-5">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wider uppercase">MACHINE</span>
            </div>
            <div className={`text-lg font-bold ${statusColor}`}>{telemetry.machineStatus.toUpperCase()}</div>
          </Card>
        </div>

        {/* Main 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[210px_1fr_210px] gap-4">
          {/* LEFT - Vehicle Health */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-red-500 rounded" />
              <h3 className="font-bold text-md">VEHICLE HEALTH</h3>
            </div>
            <MiniChart label="BATTERY TEMPERATURE" value={`${telemetry.batteryTemp.toFixed(1)}`} unit="°C" data={batteryTempHistory} color="#ef4444" isWarning={telemetry.batteryTemp > 50} />
            <MiniChart label="MOTOR VIBRATION" value={`${telemetry.motorVibration.toFixed(1)}`} unit="mm/s" data={vibrationHistory} color="#f97316" isWarning={telemetry.motorVibration > 18} />
            <MiniChart label="ENERGY CONSUMPTION" value={`${telemetry.energyConsumption.toFixed(2)}`} unit="kWh/km" data={energyHistory} color="#ef4444" isWarning={telemetry.energyConsumption > 3.5} />
          </div>

          {/* CENTER - 3D Twin */}
          <Card className="relative overflow-hidden min-h-[400px]">
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isFailureMode ? "bg-red-500 animate-pulse" : "bg-emerald-500"}`} />
              <span className="text-sm text-emerald-600 font-semibold">3D DIGITAL TWIN — LIVE</span>
            </div>

            {/* View toggle */}
            <div className="absolute top-3 right-3 z-10 flex gap-1">
              <button
                onClick={() => setTwinView("vehicle")}
                className={`px-2.5 py-1 text-xs rounded border transition-all ${
                  twinView === "vehicle" ? "border-emerald-500 text-emerald-600 bg-emerald-50" : "border-gray-300 text-gray-500 hover:border-emerald-400"
                }`}
              >
                Full Vehicle
              </button>
              <button
                onClick={() => setTwinView("components")}
                className={`px-2.5 py-1 text-xs rounded border transition-all ${
                  twinView === "components" ? "border-emerald-500 text-emerald-600 bg-emerald-50" : "border-gray-300 text-gray-500 hover:border-emerald-400"
                }`}
              >
                Components
              </button>
            </div>

            <CardContent className="p-0 h-full">
              {twinView === "vehicle" ? (
                <ScooterModelViewer className="w-full h-full min-h-[400px]" />
              ) : (
                <ComponentView telemetry={telemetry} isFailureMode={isFailureMode} className="w-full h-full min-h-[400px] relative" />
              )}
            </CardContent>
          </Card>

          {/* RIGHT - Performance */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-red-500 rounded" />
              <h3 className="font-bold text-md">PERFORMANCE</h3>
            </div>
            <PerfCard icon={<Gauge className="w-4 h-4 text-emerald-500" />} label="SPEED" value={telemetry.speed.toFixed(1)} unit="km/h" color="emerald" />
            <PerfCard icon={<Activity className="w-4 h-4 text-cyan-500" />} label="TORQUE" value={telemetry.torque.toFixed(1)} unit="Nm" color="cyan" />
            <PerfCard icon={<TrendingUp className="w-4 h-4 text-blue-500" />} label="EFFICIENCY SCORE" value={telemetry.efficiencyScore.toFixed(1)} unit="%" color="blue" />
            <PerfCard icon={<Zap className="w-4 h-4 text-purple-500" />} label="POWER CONSUMPTION" value={telemetry.powerConsumption.toFixed(2)} unit="kW" color="purple" />
          </div>
        </div>

        {/* Bottom Intelligence Panel */}
        <Tabs defaultValue="condition" className="space-y-3">
          <TabsList>
            <TabsTrigger value="condition" className="text-xs gap-1">
              <AlertTriangle className="w-3 h-3" /> CONDITION MONITORING
            </TabsTrigger>
            <TabsTrigger value="predictive" className="text-xs gap-1">
              <Wrench className="w-3 h-3" /> PREDICTIVE MAINTENANCE
            </TabsTrigger>
            <TabsTrigger value="ride" className="text-xs gap-1">
              <MapPin className="w-3 h-3" /> RIDE INTELLIGENCE
            </TabsTrigger>
          </TabsList>

          <TabsContent value="condition">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm">LIVE TELEMETRY</CardTitle></CardHeader>
                <CardContent>
                  <table className="w-full text-sm">
                    <thead><tr className="text-muted-foreground text-xs"><th className="text-left pb-2">Parameter</th><th className="text-right pb-2">Value</th><th className="text-right pb-2">Status</th></tr></thead>
                    <tbody className="">
                      <TelemetryRow label="Battery Temp" value={`${telemetry.batteryTemp.toFixed(1)}°C`} ok={telemetry.batteryTemp < 50} />
                      <TelemetryRow label="Motor Temp" value={`${telemetry.motorTemp.toFixed(1)}°C`} ok={telemetry.motorTemp < 70} />
                      <TelemetryRow label="Motor RPM" value={`${telemetry.motorRPM}`} ok={telemetry.motorRPM < 5000} />
                      <TelemetryRow label="Battery SOH" value={`${telemetry.batterySOH.toFixed(1)}%`} ok={telemetry.batterySOH > 80} />
                      <TelemetryRow label="Voltage" value={`${telemetry.batteryVoltage.toFixed(1)}V`} ok={telemetry.batteryVoltage > 44} />
                      <TelemetryRow label="Controller Temp" value={`${telemetry.controllerTemp.toFixed(1)}°C`} ok={telemetry.controllerTemp < 55} />
                    </tbody>
                  </table>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm">ALERT LOG</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto">
                    {alerts.map((a) => (
                      <div key={a.id} className={`flex items-start gap-2 p-2 rounded text-xs border ${
                        a.type === "critical" ? "border-red-300 bg-red-50" : a.type === "warning" ? "border-yellow-300 bg-yellow-50" : "border-green-200 bg-green-50"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${a.type === "critical" ? "bg-red-500 animate-pulse" : a.type === "warning" ? "bg-yellow-500" : "bg-emerald-500"}`} />
                        <div className="flex-1">
                          <div className="font-semibold">{a.source}</div>
                          <div className="text-muted-foreground">{a.message}</div>
                        </div>
                        <span className="text-muted-foreground">{a.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictive">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="text-xs text-muted-foreground mb-1">Failure Probability</div>
                <div className={`text-2xl font-bold ${predictive.failureProbability > 50 ? "text-red-500" : "text-emerald-600"}`}>{predictive.failureProbability.toFixed(1)}%</div>
                <Progress value={predictive.failureProbability} className="mt-2 h-1.5" />
              </Card>
              <Card className="p-4">
                <div className="text-xs text-muted-foreground mb-1">Remaining Useful Life</div>
                <div className={`text-2xl font-bold ${predictive.remainingLife < 100 ? "text-red-500" : "text-foreground"}`}>{predictive.remainingLife} days</div>
              </Card>
              <Card className="p-4">
                <div className="text-xs text-muted-foreground mb-1">Recommended Action</div>
                <div className="text-sm font-medium">{predictive.recommendedAction}</div>
              </Card>
              <Card className="p-4">
                <div className="text-xs text-muted-foreground mb-1">Cost Avoided</div>
                <div className="text-2xl font-bold text-emerald-600">₹{predictive.costAvoided.toLocaleString()}</div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ride">
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="text-xs text-muted-foreground mb-1">Riding Style Score</div>
                <div className="text-2xl font-bold">{rideIntel.ridingStyleScore}/100</div>
                <Progress value={rideIntel.ridingStyleScore} className="mt-2 h-1.5" />
              </Card>
              <Card className="p-4">
                <div className="text-xs text-muted-foreground mb-1">Battery Stress Index</div>
                <div className={`text-2xl font-bold ${rideIntel.batteryStressIndex > 50 ? "text-red-500" : "text-foreground"}`}>{rideIntel.batteryStressIndex}%</div>
                <Progress value={rideIntel.batteryStressIndex} className="mt-2 h-1.5" />
              </Card>
              <Card className="p-4">
                <div className="text-xs text-muted-foreground mb-1">Efficiency Loss</div>
                <div className={`text-2xl font-bold ${rideIntel.efficiencyLoss > 15 ? "text-red-500" : "text-foreground"}`}>{rideIntel.efficiencyLoss}%</div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

/* === Sub-components === */

function KpiCard({ icon, label, value, unit, isFailure }: { icon: React.ReactNode; label: string; value: string; unit: string; isFailure?: boolean }) {
  return (
    <Card className={`p-5 transition-all ${isFailure ? "border-red-400 bg-red-50" : ""}`}>
      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
        {icon}
        <span className="text-sm font-medium tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline gap-0.5">
        <span className={`text-xl font-bold ${isFailure ? "text-red-500" : "text-foreground"}`}>{value}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
    </Card>
  );
}

function MiniChart({ label, value, unit, data, color, isWarning }: { label: string; value: string; unit: string; data: { time: string; value: number }[]; color: string; isWarning?: boolean }) {
  return (
    <Card className={`p-3 ${isWarning ? "border-red-300" : ""}`}>
      <div className="flex justify-between items-start mb-1">
        <span className="text-[13px] font-semibold tracking-wider uppercase text-muted-foreground">{label}</span>
        <div className="flex items-baseline gap-0.5">
          <span className={`text-lg font-bold ${isWarning ? "text-red-500" : ""}`}>{value}</span>
          <span className="text-[12px] text-muted-foreground">{unit}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={70}>
        <AreaChart data={data}>
          <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.15} strokeWidth={1.5} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

function PerfCard({ icon, label, value, unit, color }: { icon: React.ReactNode; label: string; value: string; unit: string; color: string }) {
  const colorMap: Record<string, string> = { emerald: "bg-emerald-500", cyan: "bg-cyan-500", blue: "bg-blue-500", purple: "bg-purple-500" };
  return (
    <Card className="p-3">
      <div className="flex items-center gap-1.5 mb-4">
        {icon}
        <span className="text-[13px] font-semibold tracking-wider uppercase text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-baseline gap-0.5 mb-1.5">
        <span className="text-lg font-bold">{value}</span>
        <span className="text-[12px] text-muted-foreground">{unit}</span>
      </div>
      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${colorMap[color] || "bg-emerald-500"} rounded-full`} style={{ width: `${Math.min(parseFloat(value) / 1.2, 100)}%` }} />
      </div>
    </Card>
  );
}

function TelemetryRow({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <tr className="border-b last:border-0">
      <td className="py-1.5">{label}</td>
      <td className={`text-right ${ok ? "text-emerald-600" : "text-red-500"}`}>{value}</td>
      <td className="text-right"><Badge variant={ok ? "secondary" : "destructive"} className="text-[10px]">{ok ? "Normal" : "Alert"}</Badge></td>
    </tr>
  );
}

export default DigitalTwin;
