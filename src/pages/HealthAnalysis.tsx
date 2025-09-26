import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Activity, Thermometer, Battery, Gauge, Fuel, Wrench } from 'lucide-react';
import { CarHealthAnalyzer, mockOBDData } from '@/lib/carHealthAnalyzer';
import { DashboardLayout } from '@/components/DashboardLayout';

const HealthAnalysis = () => {
  const obdData = mockOBDData;
  const damagedParts = CarHealthAnalyzer.analyzeDamagedParts(obdData);
  const healthScore = Math.max(0, 100 - (damagedParts.length * 15) - (obdData.dtcs.length * 10));

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-dashboard-green';
    if (score >= 60) return 'text-dashboard-orange';
    return 'text-dashboard-red';
  };

  const getHealthScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-dashboard-green/10';
    if (score >= 60) return 'bg-dashboard-orange/10';
    return 'bg-dashboard-red/10';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-dashboard-red';
      case 'medium': return 'text-dashboard-orange';
      case 'low': return 'text-dashboard-green';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const systemHealth = [
    {
      system: 'Engine',
      score: obdData.sensors.engineTemp <= 95 ? 95 : 65,
      icon: Thermometer,
      status: obdData.sensors.engineTemp <= 95 ? 'Optimal' : 'Warning'
    },
    {
      system: 'Battery',
      score: obdData.sensors.batteryVoltage >= 12.4 ? 90 : 45,
      icon: Battery,
      status: obdData.sensors.batteryVoltage >= 12.4 ? 'Good' : 'Low'
    },
    {
      system: 'Fuel System',
      score: obdData.sensors.fuelLevel ? (obdData.sensors.fuelLevel >= 25 ? 88 : 60) : 80,
      icon: Fuel,
      status: obdData.sensors.fuelLevel ? (obdData.sensors.fuelLevel >= 25 ? 'Normal' : 'Low') : 'Unknown'
    },
    {
      system: 'Transmission',
      score: obdData.sensors.transmissionTemp ? (obdData.sensors.transmissionTemp <= 95 ? 92 : 55) : 85,
      icon: Gauge,
      status: obdData.sensors.transmissionTemp ? (obdData.sensors.transmissionTemp <= 95 ? 'Normal' : 'High Temp') : 'Normal'
    }
  ];

  return (
    <DashboardLayout>
    <div className="space-y-6">
      {/* Overall Health Score */}
      <Card className={`${getHealthScoreBackground(healthScore)} border-2`}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Overall Vehicle Health</CardTitle>
          <div className={`text-6xl font-bold ${getHealthScoreColor(healthScore)} mt-4`}>
            {healthScore}%
          </div>
          <p className="text-muted-foreground mt-2">
            {healthScore >= 80 ? 'Excellent Condition' : 
             healthScore >= 60 ? 'Good Condition' : 'Needs Attention'}
          </p>
        </CardHeader>
        <CardContent>
          <Progress value={healthScore} className="h-3" />
        </CardContent>
      </Card>

      {/* System Health Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemHealth.map((system, index) => {
          const IconComponent = system.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <IconComponent className="h-6 w-6 text-primary" />
                  <Badge variant={system.score >= 80 ? 'default' : 'secondary'}>
                    {system.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{system.system}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Health Score</span>
                  <span className={`font-semibold ${getHealthScoreColor(system.score)}`}>
                    {system.score}%
                  </span>
                </div>
                <Progress value={system.score} className="h-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detected Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-dashboard-orange" />
            Detected Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          {damagedParts.length === 0 ? (
            <div className="flex items-center gap-2 text-dashboard-green">
              <CheckCircle className="h-5 w-5" />
              <span>No critical issues detected</span>
            </div>
          ) : (
            <div className="space-y-4">
              {damagedParts.map((part, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                  <div className={`p-2 rounded-full ${part.severity === 'high' ? 'bg-dashboard-red/10' : 'bg-dashboard-orange/10'}`}>
                    <Wrench className={`h-4 w-4 ${getSeverityColor(part.severity)}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{part.component}</h4>
                      <Badge variant={getSeverityBadge(part.severity)}>
                        {part.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{part.issue}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span>Estimated Cost: <span className="font-semibold">₹{part.repairCost}</span></span>
                      <span className={`font-semibold ${getSeverityColor(part.severity)}`}>
                        {part.urgency}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* DTC Codes */}
      {obdData.dtcs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Diagnostic Trouble Codes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {obdData.dtcs.map((code, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <span className="font-mono font-semibold">{code}</span>
                    <p className="text-sm text-muted-foreground">DTC Code</p>
                  </div>
                  <Badge variant="secondary">
                    ACTIVE
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
    </DashboardLayout>
  );
};

export default HealthAnalysis;