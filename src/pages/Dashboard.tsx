import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Wrench, 
  TrendingDown, 
  TrendingUp,
  Gauge,
  Battery,
  Thermometer,
  Fuel
} from 'lucide-react';
import { CarHealthAnalyzer, mockOBDData, type OBDData } from "@/lib/carHealthAnalyzer";

interface AnalysisResult {
  damagedParts: any[];
  maintenanceSchedule: any[];
  resaleValue: any;
}

export default function Dashboard() {
  const [obdData] = useState<OBDData>(mockOBDData);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  
  useEffect(() => {
    const damagedParts = CarHealthAnalyzer.analyzeDamagedParts(obdData);
    const maintenanceSchedule = CarHealthAnalyzer.estimateMaintenanceSchedule(obdData);
    const resaleValue = CarHealthAnalyzer.estimateResaleValue(obdData);
    
    setAnalysis({
      damagedParts,
      maintenanceSchedule,
      resaleValue
    });
  }, [obdData]);

  if (!analysis) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading analysis...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const healthScore = Math.max(0, 100 - (analysis.damagedParts.length * 15) - (obdData.dtcCodes.length * 10));
  
  // Chart data
  const sensorData = [
    { name: 'Mon', coolant: 85, oil: 88, battery: 12.6, fuel: 58 },
    { name: 'Tue', coolant: 87, oil: 90, battery: 12.5, fuel: 57 },
    { name: 'Wed', coolant: 89, oil: 85, battery: 12.6, fuel: 58 },
    { name: 'Thu', coolant: 91, oil: 87, battery: 12.4, fuel: 56 },
    { name: 'Fri', coolant: 89, oil: 85, battery: 12.6, fuel: 58 },
    { name: 'Sat', coolant: 88, oil: 86, battery: 12.5, fuel: 57 },
    { name: 'Sun', coolant: 89, oil: 85, battery: 12.6, fuel: 58 }
  ];

  const severityColors = ['hsl(var(--dashboard-red))', 'hsl(var(--dashboard-orange))', 'hsl(var(--dashboard-green))'];
  const severityData = [
    { name: 'Critical', value: analysis.damagedParts.filter(p => p.severity === 'high').length, color: severityColors[0] },
    { name: 'Warning', value: analysis.damagedParts.filter(p => p.severity === 'medium').length, color: severityColors[1] },
    { name: 'Good', value: Math.max(0, 8 - analysis.damagedParts.length), color: severityColors[2] }
  ];

  const chartData = [
  {
    name: 'Page A',
    uv: 40,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 20,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 50,
    pv: 9800,
    amt: 2290,
  },
  // {
  //   name: 'Page D',
  //   uv: 2780,
  //   pv: 3908,
  //   amt: 2000,
  // },
  // {
  //   name: 'Page E',
  //   uv: 1890,
  //   pv: 4800,
  //   amt: 2181,
  // },
  // {
  //   name: 'Page F',
  //   uv: 2390,
  //   pv: 3800,
  //   amt: 2500,
  // },
  // {
  //   name: 'Page G',
  //   uv: 3490,
  //   pv: 4300,
  //   amt: 2100,
  // },
];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Car Health Overview</h1>
          <p className="text-muted-foreground">
            Monitor your vehicle's health, maintenance needs, and performance metrics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Overall Health Score"
            value={`${healthScore}%`}
            change={2.3}
            changeLabel="from last week"
            icon={<Gauge className="w-5 h-5" />}
            variant={healthScore > 80 ? 'success' : healthScore > 60 ? 'warning' : 'danger'}
            chartData={chartData}
          />
          
          <MetricCard
            title="Issues Detected"
            value={analysis.damagedParts.length}
            change={-15.2}
            changeLabel="from last check"
            icon={<AlertTriangle className="w-5 h-5" />}
            variant={analysis.damagedParts.length === 0 ? 'success' : 'warning'}
            chartData={chartData}
          />
          
          <MetricCard
            title="Next Maintenance"
            value="2,500 mi"
            icon={<Wrench className="w-5 h-5" />}
            variant="default"
          />
          
          <MetricCard
            title="Estimated Value"
            value={`$${analysis.resaleValue.marketValue.toLocaleString()}`}
            change={-3.2}
            changeLabel="depreciation"
            icon={<DollarSign className="w-5 h-5" />}
            variant="default"
            chartData={chartData}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sensor Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Sensor Data Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="coolant" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Coolant Temp" />
                  <Line type="monotone" dataKey="oil" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Oil Temp" />
                  <Line type="monotone" dataKey="battery" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Battery V" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Component Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-dashboard-green" />
                Component Health Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Issues & Maintenance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-dashboard-orange" />
                Recent Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.damagedParts.slice(0, 4).map((part, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{part.component}</p>
                      <p className="text-xs text-muted-foreground">{part.issue}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={part.severity === 'high' ? 'destructive' : 'secondary'}>
                        {part.status}
                      </Badge>
                      <span className="text-sm font-medium text-foreground">${part.repairCost}</span>
                    </div>
                  </div>
                ))}
                {analysis.damagedParts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-dashboard-green" />
                    <p>No issues detected</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Maintenance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-dashboard-blue" />
                Upcoming Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.maintenanceSchedule.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{item.component}</p>
                      <p className="text-xs text-muted-foreground">Due in {item.timeToService}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={item.priority === 'High' ? 'destructive' : 'secondary'}>
                        {item.priority}
                      </Badge>
                      <span className="text-sm font-medium text-foreground">${item.estimatedCost}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Sensor Readings */}
        <Card>
          <CardHeader>
            <CardTitle>Current Sensor Readings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Thermometer className="w-8 h-8 mx-auto mb-2 text-dashboard-orange" />
                <p className="text-sm text-muted-foreground">Coolant Temp</p>
                <p className="text-2xl font-bold text-foreground">{obdData.sensors.coolantTemp}°C</p>
                <Progress value={60} className="mt-2" />
              </div>
              
              <div className="text-center">
                <Battery className="w-8 h-8 mx-auto mb-2 text-dashboard-green" />
                <p className="text-sm text-muted-foreground">Battery Voltage</p>
                <p className="text-2xl font-bold text-foreground">{obdData.sensors.batteryVoltage}V</p>
                <Progress value={85} className="mt-2" />
              </div>
              
              <div className="text-center">
                <Fuel className="w-8 h-8 mx-auto mb-2 text-dashboard-blue" />
                <p className="text-sm text-muted-foreground">Fuel Pressure</p>
                <p className="text-2xl font-bold text-foreground">{obdData.sensors.fuelPressure} PSI</p>
                <Progress value={75} className="mt-2" />
              </div>
              
              <div className="text-center">
                <Gauge className="w-8 h-8 mx-auto mb-2 text-dashboard-purple" />
                <p className="text-sm text-muted-foreground">Engine RPM</p>
                <p className="text-2xl font-bold text-foreground">{obdData.sensors.engineRPM}</p>
                <Progress value={25} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}