import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Battery, Zap, MapPin, TrendingUp, Thermometer, Clock, Leaf, BarChart3, Activity, AlertTriangle, Award, BookOpen, Calendar, CheckCircle, Download, MessageSquare, PlayCircle, Sparkles, Target, Users, Gauge, Route, Wrench } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, RadialBarChart, RadialBar, BarChart, Bar, Legend } from "recharts";

const EVFleets = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("all");
  const [chargeTime, setChargeTime] = useState({ battery: 60, chargerLevel: "level2" });
  const [costInputs, setCostInputs] = useState({ evRate: 8, iceRate: 105 });
  const [bmsModalOpen, setBmsModalOpen] = useState(false);
  const [selectedBmsVehicle, setSelectedBmsVehicle] = useState<any>(null);
  
  const evFleetVehicles = [
    {
      id: "EV001",
      make: "Mahindra",
      model: "XUV400 EV",
      year: 2022,
      batteryHealth: 92,
      currentSoC: 78,
      range: 285,
      chargeCycles: 245,
      location: "Mumbai, India",
      temperature: 68,
      efficiency: 4.1,
      lastCharged: "2024-09-26 08:30",
      voltage: 385.2,
      batteryCapacity: 59,
      cellVoltageMin: 3.62,
      cellVoltageMax: 3.68,
      chargingStatus: "Not Charging",
      estimatedTimeToFull: null,
      lastMaintenanceDate: "2024-08-15",
      nextMaintenanceDate: "2024-12-15",
      totalEnergyConsumed: 14580,
      regenerativeBrakingEfficiency: 18.5
    },
    {
      id: "EV002", 
      make: "Tata",
      model: "Nexon EV",
      year: 2021,
      batteryHealth: 85,
      currentSoC: 45,
      range: 180,
      chargeCycles: 428,
      location: "New Delhi, India",
      temperature: 84,
      efficiency: 3.8,
      lastCharged: "2024-09-25 19:45",
      voltage: 312.8,
      batteryCapacity: 30.2,
      cellVoltageMin: 3.45,
      cellVoltageMax: 3.52,
      chargingStatus: "Charging",
      estimatedTimeToFull: "2h 15m",
      lastMaintenanceDate: "2024-07-10",
      nextMaintenanceDate: "2024-11-10",
      totalEnergyConsumed: 12940,
      regenerativeBrakingEfficiency: 15.2
    },
    {
      id: "EV003",
      make: "Hyundai",
      model: "Kona Electric",
      year: 2023,
      batteryHealth: 96,
      currentSoC: 89,
      range: 312,
      chargeCycles: 156,
      location: "Kolkata, India",
      temperature: 95,
      efficiency: 3.9,
      lastCharged: "2024-09-26 14:15",
      voltage: 697.5,
      batteryCapacity: 72.6,
      cellVoltageMin: 3.71,
      cellVoltageMax: 3.75,
      chargingStatus: "Not Charging",
      estimatedTimeToFull: null,
      lastMaintenanceDate: "2024-09-01",
      nextMaintenanceDate: "2025-01-01",
      totalEnergyConsumed: 11340,
      regenerativeBrakingEfficiency: 21.3
    }
  ];

  const handleVehicleClick = (vehicle: any) => {
    setSelectedBmsVehicle(vehicle);
    setBmsModalOpen(true);
  };

  const getBmsChargingHistory = (vehicleId: string) => {
    const baseData = [
      { time: "00:00", soc: 45, voltage: 350, current: 0 },
      { time: "02:00", soc: 48, voltage: 355, current: 15 },
      { time: "04:00", soc: 55, voltage: 365, current: 28 },
      { time: "06:00", soc: 68, voltage: 378, current: 35 },
      { time: "08:00", soc: 78, voltage: 385, current: 22 },
      { time: "10:00", soc: 82, voltage: 388, current: 12 },
      { time: "12:00", soc: 85, voltage: 390, current: 8 },
      { time: "14:00", soc: 85, voltage: 390, current: 0 }
    ];
    return baseData;
  };

  const getBmsTempHistory = (vehicleId: string) => {
    return [
      { time: "00:00", batteryTemp: 65, ambientTemp: 58 },
      { time: "04:00", batteryTemp: 68, ambientTemp: 55 },
      { time: "08:00", batteryTemp: 72, ambientTemp: 62 },
      { time: "12:00", batteryTemp: 78, ambientTemp: 72 },
      { time: "16:00", batteryTemp: 82, ambientTemp: 75 },
      { time: "20:00", batteryTemp: 70, ambientTemp: 68 }
    ];
  };

  const getBmsDiagnostics = (vehicleId: string) => {
    return [
      { code: "BMS_001", status: "Normal", description: "Battery voltage within range", severity: "info" },
      { code: "BMS_002", status: "Warning", description: "Cell voltage imbalance detected", severity: "warning" },
      { code: "BMS_003", status: "Normal", description: "Temperature regulation optimal", severity: "info" },
      { code: "BMS_004", status: "Normal", description: "Charge/discharge cycles nominal", severity: "info" }
    ];
  };

  const batteryHealthTrends = [
    { month: "Jan", mahindra: 94, tata: 88, hyundai: 97, avgTemp: 45 },
    { month: "Feb", mahindra: 93, tata: 87, hyundai: 97, avgTemp: 52 },
    { month: "Mar", mahindra: 93, tata: 86, hyundai: 96, avgTemp: 58 },
    { month: "Apr", mahindra: 92, tata: 86, hyundai: 96, avgTemp: 65 },
    { month: "May", mahindra: 92, tata: 85, hyundai: 96, avgTemp: 72 },
    { month: "Jun", mahindra: 92, tata: 85, hyundai: 96, avgTemp: 78 }
  ];

  const chargingPatterns = [
    { hour: "00:00", power: 2.1, cost: 5.8 },
    { hour: "02:00", power: 8.4, cost: 6.2 },
    { hour: "04:00", power: 12.2, cost: 6.5 },
    { hour: "06:00", power: 15.8, cost: 7.2 },
    { hour: "08:00", power: 18.5, cost: 8.5 },
    { hour: "10:00", power: 22.1, cost: 9.8 },
    { hour: "12:00", power: 25.6, cost: 11.2 },
    { hour: "14:00", power: 28.9, cost: 12.5 },
    { hour: "16:00", power: 32.4, cost: 13.8 },
    { hour: "18:00", power: 28.1, cost: 12.5 },
    { hour: "20:00", power: 18.7, cost: 9.8 },
    { hour: "22:00", power: 8.3, cost: 7.2 }
  ];

  const geographicPerformance = [
    { city: "New Delhi", vehicles: 12, avgHealth: 91, avgRange: 278, climate: "Moderate" },
    { city: "Mumbai", vehicles: 18, avgHealth: 86, avgRange: 265, climate: "Warm" },
    { city: "Jamshedpur", vehicles: 8, avgHealth: 88, avgRange: 251, climate: "Hot" },
    { city: "Kolkata", vehicles: 15, avgHealth: 93, avgRange: 295, climate: "Cool" },
    { city: "Chennai", vehicles: 10, avgHealth: 89, avgRange: 275, climate: "Variable" }
  ];

  const energyEfficiency = [
    { metric: "Fleet Average", value: 3.9, unit: "km/kWh", target: 4.2, status: "Below" },
    { metric: "Best Performer", value: 4.8, unit: "km/kWh", target: 4.2, status: "Above" },
    { metric: "Charging Efficiency", value: 91, unit: "%", target: 90, status: "Above" },
    { metric: "Regenerative Braking", value: 22, unit: "%", target: 25, status: "Below" }
  ];

  const fleetStatusData = [
    { status: "Active", count: 48, color: "#10b981" },
    { status: "Charging", count: 12, color: "#f59e0b" },
    { status: "Maintenance", count: 3, color: "#ef4444" }
  ];

  const dailyUsageComparison = [
    { day: "Mon", mileage: 245, energy: 82, efficiency: 3.8 },
    { day: "Tue", mileage: 289, energy: 95, efficiency: 3.9 },
    { day: "Wed", mileage: 312, energy: 102, efficiency: 4.0 },
    { day: "Thu", mileage: 278, energy: 89, efficiency: 3.9 },
    { day: "Fri", mileage: 301, energy: 98, efficiency: 3.8 },
    { day: "Sat", mileage: 198, energy: 65, efficiency: 4.1 },
    { day: "Sun", mileage: 156, energy: 52, efficiency: 4.2 }
  ];

  const degradationForecast = [
    { month: "Current", soh: 91 },
    { month: "1 Month", soh: 90.5 },
    { month: "3 Months", soh: 89.5 },
    { month: "6 Months", soh: 87.8 },
    { month: "12 Months", soh: 85.2 }
  ];

  const chargingPatternAnalysis = [
    { hour: "00-04", sessions: 45, avgDuration: 6.5, peakDemand: false },
    { hour: "04-08", sessions: 28, avgDuration: 5.2, peakDemand: false },
    { hour: "08-12", sessions: 12, avgDuration: 3.8, peakDemand: true },
    { hour: "12-16", sessions: 8, avgDuration: 2.5, peakDemand: true },
    { hour: "16-20", sessions: 15, avgDuration: 4.2, peakDemand: true },
    { hour: "20-24", sessions: 35, avgDuration: 5.8, peakDemand: false }
  ];

  const sustainabilityMetrics = [
    { metric: "CO₂ Saved", value: "98.4T", change: "+12%", icon: Leaf },
    { metric: "Renewable %", value: "78%", change: "+8%", icon: Zap },
    { metric: "Grid Impact", value: "Low", change: "Stable", icon: Activity },
    { metric: "Carbon Credits", value: "₹4.5L", change: "+15%", icon: Award }
  ];

  const recommendations = [
    { id: 1, priority: "high", title: "Optimize Night Charging", description: "Shift 15 vehicles to off-peak hours (10 PM - 6 AM)", savings: "₹8,500/month", confidence: 92 },
    { id: 2, priority: "medium", title: "Battery Pre-conditioning", description: "Enable thermal management in cold weather", impact: "+10% efficiency", confidence: 85 },
    { id: 3, priority: "high", title: "Reduce Fast Charging", description: "Limit DC fast charging to emergency only", benefit: "+20% battery life", confidence: 88 },
    { id: 4, priority: "low", title: "Route Optimization", description: "Use highway routes for better efficiency", savings: "+15 km range", confidence: 78 }
  ];

  const maintenanceTasks = [
    { id: 1, task: "Battery Coolant Check", dueDate: "2025-10-10", vehicle: "All Fleet", priority: "medium" },
    { id: 2, task: "Firmware Update v2.1", dueDate: "2025-10-15", vehicle: "EV001, EV003", priority: "high" },
    { id: 3, task: "Terminal Cleaning", dueDate: "2025-10-20", vehicle: "All Fleet", priority: "low" },
    { id: 4, task: "SOH Assessment", dueDate: "2025-10-25", vehicle: "EV002", priority: "high" }
  ];

  const educationalResources = [
    { title: "Maximizing Battery Range in Winter", type: "video", duration: "8 min", views: 1240 },
    { title: "Understanding SOH vs SOC", type: "article", duration: "5 min read", views: 892 },
    { title: "Safe Fast Charging Practices", type: "guide", duration: "12 min read", views: 1567 },
    { title: "Thermal Management Best Practices", type: "video", duration: "15 min", views: 2103 }
  ];

  const calculateChargingDuration = (batterySize: number, level: string) => {
    const rates = { level1: 2, level2: 11, dcfast: 50 };
    const power = rates[level as keyof typeof rates];
    return (batterySize / power).toFixed(1);
  };

  const calculateCostComparison = (distance: number) => {
    const evCost = (distance / 5) * costInputs.evRate;
    const iceCost = (distance / 15) * costInputs.iceRate;
    return { ev: evCost.toFixed(0), ice: iceCost.toFixed(0), savings: (iceCost - evCost).toFixed(0) };
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-600 bg-green-50";
    if (health >= 80) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getSoCColor = (soc: number) => {
    if (soc >= 70) return "bg-green-500";
    if (soc >= 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  const calculateLifecyclePrediction = (health: number, cycles: number) => {
    const degradationRate = (100 - health) / cycles;
    const remainingCycles = (health - 80) / degradationRate;
    const yearsRemaining = remainingCycles / 365;
    return Math.max(0, yearsRemaining);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">EV Fleet Management</h2>
            <p className="text-muted-foreground">
              Battery optimization and sustainable fleet operations
            </p>
          </div>
          <div className="flex sm:flex-row flex-col gap-2">
            <Button variant="outline" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              Fleet Map
            </Button>
            <Button size="sm">
              <Leaf className="w-4 h-4 mr-2" />
              Sustainability Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fleet Size</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">63</div>
              <p className="text-xs text-muted-foreground">Electric vehicles active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Battery Health</CardTitle>
              <Battery className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">91%</div>
              <p className="text-xs text-muted-foreground">Fleet average SOH</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Energy Savings</CardTitle>
              <Leaf className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">₹24.5K</div>
              <p className="text-xs text-muted-foreground">Monthly fuel cost savings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Reduction</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.2T</div>
              <p className="text-xs text-muted-foreground">Monthly emissions saved</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="overflow-x-auto pb-2 hide-scrollbar">
            <TabsList className="inline-flex w-auto min-w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="battery-health">Battery Health</TabsTrigger>
              <TabsTrigger value="analytics">Analytics & Insights</TabsTrigger>
              <TabsTrigger value="tools">Actionable Tools</TabsTrigger>
              <TabsTrigger value="resources">Resources & Guides</TabsTrigger>
              <TabsTrigger value="charging-optimization">Charging Optimization</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            </TabsList>
          </div>

          {/* OVERVIEW TAB - Core Panels */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Fleet Status Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Fleet Status
                  </CardTitle>
                  <CardDescription>Real-time operational snapshot</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={fleetStatusData} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={70} label>
                          {fleetStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2">
                      {fleetStatusData.map((item) => (
                        <div key={item.status} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}} />
                            <span className="text-sm">{item.status}</span>
                          </div>
                          <span className="font-semibold">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Battery Health Aggregate */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Battery className="w-5 h-5" />
                    Battery Health Aggregate
                  </CardTitle>
                  <CardDescription>Fleet-wide SOH & SOC metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600">91%</div>
                      <div className="text-sm text-muted-foreground">Average SOH</div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Average SOC</span>
                          <span>71%</span>
                        </div>
                        <Progress value={71} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Avg Temperature</span>
                          <span>82°F</span>
                        </div>
                        <Progress value={65} />
                      </div>
                    </div>
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        2 vehicles show SOH drop &gt;5% - Review recommended
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Usage Snapshot */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Daily Usage Snapshot
                  </CardTitle>
                  <CardDescription>Today's performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">1,779</div>
                        <div className="text-xs text-muted-foreground">km Driven</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">583</div>
                        <div className="text-xs text-muted-foreground">kWh Used</div>
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="flex items-center justify-center gap-2">
                        <Award className="w-5 h-5 text-green-600" />
                        <span className="text-lg font-semibold text-green-600">3.9 km/kWh</span>
                      </div>
                      <div className="text-xs text-green-700 dark:text-green-400">Efficiency Score</div>
                    </div>
                    <div className="text-xs text-center text-muted-foreground">
                      +5% better than yesterday
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Usage Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Usage Trends</CardTitle>
                <CardDescription>7-day performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyUsageComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="mileage" fill="#3b82f6" name="Mileage (km)" />
                    <Bar yAxisId="left" dataKey="energy" fill="#10b981" name="Energy (kWh)" />
                    <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#ef4444" name="Efficiency" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ANALYTICS & INSIGHTS TAB */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Battery Optimization Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Battery Degradation Forecast
                  </CardTitle>
                  <CardDescription>Predictive SOH modeling (6-12 months)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={degradationForecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 95]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="soh" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Optimization Tip</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Optimal charge window: 10 PM - 6 AM to minimize thermal stress and extend battery life by 15%
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Charging Pattern Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Charging Pattern Analysis
                  </CardTitle>
                  <CardDescription>Usage by time of day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chargingPatternAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sessions" fill="#3b82f6" name="Sessions" />
                      <Bar dataKey="avgDuration" fill="#10b981" name="Avg Duration (hrs)" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="p-2 border rounded text-center">
                      <div className="text-lg font-semibold">143</div>
                      <div className="text-xs text-muted-foreground">Total Sessions/Week</div>
                    </div>
                    <div className="p-2 border rounded text-center">
                      <div className="text-lg font-semibold">5.2 hrs</div>
                      <div className="text-xs text-muted-foreground">Avg Duration</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Usage & Efficiency Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Usage & Efficiency Reports
                </CardTitle>
                <CardDescription>Identify inefficiencies and optimization opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Idle Time</span>
                        <Badge variant="destructive">High</Badge>
                      </div>
                      <div className="text-2xl font-bold">12.5%</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Reduce by routing optimization
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Peak Hour Usage</span>
                        <Badge>Medium</Badge>
                      </div>
                      <div className="text-2xl font-bold">35%</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Shift to off-peak for savings
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Highway Efficiency</span>
                        <Badge variant="default">Good</Badge>
                      </div>
                      <div className="text-2xl font-bold">+10%</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Above city driving baseline
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Detailed Report (PDF)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sustainability Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  Sustainability Tracker
                </CardTitle>
                <CardDescription>Environmental impact & ESG metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {sustainabilityMetrics.map((item) => (
                    <div key={item.metric} className="p-4 border rounded-lg text-center">
                      <item.icon className="w-6 h-6 mx-auto mb-2 text-green-600" />
                      <div className="text-2xl font-bold">{item.value}</div>
                      <div className="text-xs text-muted-foreground">{item.metric}</div>
                      <div className="text-xs text-green-600 mt-1">{item.change}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="text-sm font-medium text-green-800 dark:text-green-200">ESG Goal Progress</div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                    On track to achieve 85% renewable energy by Q4 2025
                  </div>
                  <Progress value={78} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ACTIONABLE TOOLS TAB */}
          <TabsContent value="tools" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Recommendations Engine */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    AI-Powered Recommendations
                  </CardTitle>
                  <CardDescription>Personalized optimization suggestions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant={rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "default" : "secondary"}>
                              {rec.priority}
                            </Badge>
                            <span className="text-sm font-medium">{rec.title}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{rec.confidence}% confidence</div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-green-600">
                            {rec.savings || rec.impact || rec.benefit}
                          </span>
                          <Button size="sm" variant="outline">Apply</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Maintenance Planner */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Maintenance Planner
                  </CardTitle>
                  <CardDescription>Upcoming routine checks & tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {maintenanceTasks.map((task) => (
                      <div key={task.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="text-sm font-medium">{task.task}</div>
                            <div className="text-xs text-muted-foreground">{task.vehicle}</div>
                          </div>
                          <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}>
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {task.dueDate}
                          </div>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Mark Done
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Full Calendar
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Charging Scheduler */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Smart Charging Scheduler
                </CardTitle>
                <CardDescription>Optimize charging times for cost & grid efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Recommended Window</div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">10:00 PM - 6:00 AM</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">Off-peak rates • Low grid demand</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Estimated Savings</span>
                        <span className="font-semibold text-green-600">₹1,25,000/month</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Carbon Reduction</span>
                        <span className="font-semibold">-18%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Grid Stress</span>
                        <Badge variant="default">Low</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Select Vehicle Group</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Fleet (63 vehicles)</SelectItem>
                          <SelectItem value="high-priority">High Priority (12)</SelectItem>
                          <SelectItem value="maintenance">Due Maintenance (8)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Preferred Time Range</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Input type="time" defaultValue="22:00" />
                        <Input type="time" defaultValue="06:00" />
                      </div>
                    </div>
                    <Button className="w-full">Apply Schedule</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* RESOURCES & GUIDES TAB */}
          <TabsContent value="resources" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Educational Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Education Hub
                  </CardTitle>
                  <CardDescription>Learn best practices & optimize operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {educationalResources.map((resource, idx) => (
                      <div key={idx} className="p-3 border rounded-lg hover:bg-muted cursor-pointer transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            {resource.type === "video" ? <PlayCircle className="w-5 h-5 text-blue-600" /> : <BookOpen className="w-5 h-5 text-green-600" />}
                            <div>
                              <div className="text-sm font-medium">{resource.title}</div>
                              <div className="text-xs text-muted-foreground">{resource.duration}</div>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">{resource.views} views</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline">View All Resources</Button>
                </CardContent>
              </Card>

              {/* Community Forum */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Community & Feedback
                  </CardTitle>
                  <CardDescription>Share tips & learn from peers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium">Top Discussion</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Best practices for fleet scaling in Tier-2 cities
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">42 replies</span>
                        <Button size="sm" variant="outline">Join</Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm font-medium mb-2">Recent Tips</div>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• Pre-condition batteries 30 min before departure</li>
                        <li>• Avoid 100% charges for daily operations</li>
                        <li>• Use regenerative braking in urban routes</li>
                      </ul>
                    </div>
                  </div>
                  <Textarea placeholder="Share your experience or ask a question..." className="mt-4" />
                  <Button className="w-full mt-2">Post to Community</Button>
                </CardContent>
              </Card>
            </div>

            {/* Battery Maintenance Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Battery className="w-5 h-5" />
                  Battery Maintenance Guide
                </CardTitle>
                <CardDescription>Comprehensive tips for 8-10 years battery life</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Daily Best Practices</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Park in shade to reduce thermal stress</li>
                        <li>• Maintain SOC between 20-80% for optimal health</li>
                        <li>• Avoid leaving vehicle at 100% charge overnight</li>
                        <li>• Use economy mode for city driving</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Weekly Maintenance</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Clean battery terminals for better conductivity</li>
                        <li>• Check coolant levels if applicable</li>
                        <li>• Review charge cycle patterns for anomalies</li>
                        <li>• Inspect charging cables for wear</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Climate-Specific Tips</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong>Hot Climate:</strong> Enable thermal management, avoid DC fast charging in peak heat</li>
                        <li>• <strong>Cold Climate:</strong> Pre-condition cabin while plugged in, park in garage when possible</li>
                        <li>• <strong>Humid Areas:</strong> Check for corrosion monthly, ensure proper ventilation</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Software & Updates</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Keep firmware updated for optimal BMS performance</li>
                        <li>• Enable smart charging features if available</li>
                        <li>• Review manufacturer recalls quarterly</li>
                        <li>• Calibrate SOC meter every 3-6 months</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Charging Best Practices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Charging Best Practices
                </CardTitle>
                <CardDescription>Safe & efficient charging guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">Recommended</span>
                      </div>
                      <ul className="space-y-1 text-xs text-green-700 dark:text-green-400">
                        <li>• Use Level 2 (AC) for daily charging</li>
                        <li>• Charge during off-peak hours</li>
                        <li>• Keep charge level between 20-80%</li>
                        <li>• Pre-warm battery in cold weather</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800 dark:text-red-200">Avoid</span>
                      </div>
                      <ul className="space-y-1 text-xs text-red-700 dark:text-red-400">
                        <li>• Frequent DC fast charging (use only when urgent)</li>
                        <li>• Charging in extreme temperatures</li>
                        <li>• Leaving at 100% SOC for extended periods</li>
                        <li>• Using damaged or uncertified cables</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charging Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Charging Duration Calculator
                </CardTitle>
                <CardDescription>Estimate charge times & voltage requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label>Battery Capacity (kWh)</Label>
                      <Input 
                        type="number" 
                        value={chargeTime.battery} 
                        onChange={(e) => setChargeTime({...chargeTime, battery: Number(e.target.value)})}
                        placeholder="60"
                      />
                    </div>
                    <div>
                      <Label>Charger Level</Label>
                      <Select value={chargeTime.chargerLevel} onValueChange={(val) => setChargeTime({...chargeTime, chargerLevel: val})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="level1">Level 1 (2 kW)</SelectItem>
                          <SelectItem value="level2">Level 2 (11 kW)</SelectItem>
                          <SelectItem value="dcfast">DC Fast (50 kW)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-center p-6 bg-muted rounded-lg w-full">
                      <div className="text-sm text-muted-foreground mb-2">Estimated Duration</div>
                      <div className="text-4xl font-bold">{calculateChargingDuration(chargeTime.battery, chargeTime.chargerLevel)}</div>
                      <div className="text-sm text-muted-foreground mt-1">hours</div>
                      <div className="mt-4 text-xs text-muted-foreground">
                        Voltage: {chargeTime.chargerLevel === 'level1' ? '120V' : chargeTime.chargerLevel === 'level2' ? '220-240V' : '400-800V DC'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Comparison Tool */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  EV vs ICE Cost Comparison
                </CardTitle>
                <CardDescription>Calculate your savings with electric fleet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label>EV Electricity Rate (₹/kWh)</Label>
                      <Input 
                        type="number" 
                        value={costInputs.evRate} 
                        onChange={(e) => setCostInputs({...costInputs, evRate: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label>ICE Fuel Rate (₹/liter)</Label>
                      <Input 
                        type="number" 
                        value={costInputs.iceRate} 
                        onChange={(e) => setCostInputs({...costInputs, iceRate: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[500, 1000, 5000].map((distance) => {
                      const costs = calculateCostComparison(distance);
                      return (
                        <div key={distance} className="p-3 border rounded-lg">
                          <div className="text-sm font-medium mb-2">{distance} km journey</div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <div className="text-muted-foreground">EV Cost</div>
                              <div className="font-semibold">₹{costs.ev}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">ICE Cost</div>
                              <div className="font-semibold">₹{costs.ice}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Savings</div>
                              <div className="font-semibold text-green-600">₹{costs.savings}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resource Downloads */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Downloadable Resources
                </CardTitle>
                <CardDescription>Templates & checklists for your fleet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  <Button variant="outline" className="justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Daily Inspection Checklist (PDF)
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Battery Log Template (Excel)
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Sustainability Report Template
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Charging Station Locator App
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="battery-health" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Battery className="w-5 h-5" />
                    Fleet Battery Overview
                  </CardTitle>
                  <CardDescription>Real-time battery health and SoC monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {evFleetVehicles.map((vehicle) => (
                      <div 
                        key={vehicle.id} 
                        className="p-3 border rounded-lg cursor-pointer hover:border-primary transition-colors"
                        onClick={() => handleVehicleClick(vehicle)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-medium">{vehicle.id} - {vehicle.make} {vehicle.model}</div>
                            <div className="text-sm text-muted-foreground">
                              {vehicle.range} km range • {vehicle.chargeCycles} cycles
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`px-2 py-1 rounded text-sm ${getHealthColor(vehicle.batteryHealth)}`}>
                              {vehicle.batteryHealth}% SOH
                            </div>
                            <Button size="sm" variant="outline" onClick={(e) => {
                              e.stopPropagation();
                              handleVehicleClick(vehicle);
                            }}>
                              View BMS
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>State of Charge</span>
                            <span>{vehicle.currentSoC}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getSoCColor(vehicle.currentSoC)}`}
                              style={{width: `${vehicle.currentSoC}%`}}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Last charged: {vehicle.lastCharged}</span>
                            <span>Predicted life: {calculateLifecyclePrediction(vehicle.batteryHealth, vehicle.chargeCycles).toFixed(1)} years</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Battery Health Trends</CardTitle>
                  <CardDescription>Monthly degradation analysis by manufacturer</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={batteryHealthTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="mahindra" stroke="#ef4444" name="Mahindra" />
                      <Line type="monotone" dataKey="tata" stroke="#3b82f6" name="Tata" />
                      <Line type="monotone" dataKey="hyundai" stroke="#10b981" name="Hyundai" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Alert>
              <Battery className="h-4 w-4" />
              <AlertDescription>
                Vehicle EV002 (Tata Nexon EV) showing accelerated battery degradation. 
                Current SOH: 85%. Recommend thermal management optimization.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="charging-optimization" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Charging Patterns & Costs</CardTitle>
                  <CardDescription>Hourly charging analysis and cost optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chargingPatterns}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => 
                        name === 'power' ? [`${value} kW`, 'Power Draw'] :
                        [`₹${value}/kWh`, 'Energy Cost']
                      } />
                      <Area type="monotone" dataKey="power" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} name="power" />
                      <Line type="monotone" dataKey="cost" stroke="#ef4444" name="cost" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Charging Behavior Optimization</CardTitle>
                  <CardDescription>Smart charging recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="font-medium text-blue-800">Optimal Charging Window</div>
                      <div className="text-sm text-blue-600">2:00 AM - 6:00 AM</div>
                      <div className="text-xs text-blue-500">Potential savings: ₹8,500/month</div>
                    </div>
                    
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="font-medium text-green-800">Peak Avoidance</div>
                      <div className="text-sm text-green-600">Avoid 2:00 PM - 8:00 PM</div>
                      <div className="text-xs text-green-500">Cost reduction: 35%</div>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="font-medium text-yellow-800">Load Balancing</div>
                      <div className="text-sm text-yellow-600">Stagger charging by 30min</div>
                      <div className="text-xs text-yellow-500">Grid stability improvement</div>
                    </div>
                  </div>
                  
                  <Button className="w-full">Apply Optimization</Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Energy Efficiency Metrics</CardTitle>
                <CardDescription>Fleet performance benchmarking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {energyEfficiency.map((metric, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{metric.metric}</span>
                        <Badge variant={metric.status === "Above" ? "default" : "secondary"}>
                          {metric.status} Target
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold">{metric.value} {metric.unit}</div>
                      <div className="text-sm text-muted-foreground">Target: {metric.target} {metric.unit}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geographic-analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Geographic Performance Analysis
                </CardTitle>
                <CardDescription>Battery performance by climate and location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geographicPerformance.map((location, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium">{location.city}</div>
                          <div className="text-sm text-muted-foreground">
                            {location.vehicles} vehicles • {location.climate} climate
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded text-sm ${getHealthColor(location.avgHealth)}`}>
                          {location.avgHealth}% avg health
                        </div>
                      </div>
                      
                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="text-center">
                          <div className="text-lg font-semibold">{location.avgHealth}%</div>
                          <div className="text-xs text-muted-foreground">Avg Battery Health</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold">{location.avgRange}</div>
                          <div className="text-xs text-muted-foreground">Avg Range (km)</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold">{location.climate}</div>
                          <div className="text-xs text-muted-foreground">Climate Impact</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sustainability" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    Environmental Impact
                  </CardTitle>
                  <CardDescription>CO₂ reduction and sustainability metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">98.4 T</div>
                      <div className="text-sm text-green-700">CO₂ Emissions Prevented (YTD)</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Fuel Cost Savings</span>
                        <span className="font-medium">₹29,40,000 YTD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maintenance Reduction</span>
                        <span className="font-medium">-65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Energy Consumed</span>
                        <span className="font-medium">125,680 kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Renewable Energy %</span>
                        <span className="font-medium">78%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fleet Lifecycle Assessment</CardTitle>
                  <CardDescription>Battery replacement planning and recycling</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium mb-2">Battery Replacement Schedule</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>2025 Q1</span>
                          <span>3 vehicles</span>
                        </div>
                        <div className="flex justify-between">
                          <span>2025 Q2</span>
                          <span>1 vehicle</span>
                        </div>
                        <div className="flex justify-between">
                          <span>2025 Q3</span>
                          <span>5 vehicles</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="font-medium text-blue-800">Recycling Program</div>
                      <div className="text-sm text-blue-600 mt-1">
                        92% material recovery rate<br/>
                        16 batteries recycled this year
                      </div>
                    </div>
                    
                    <Button className="w-full">Schedule Battery Assessment</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* BMS Information Modal */}
      <Dialog open={bmsModalOpen} onOpenChange={setBmsModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Battery className="w-5 h-5" />
              Battery Management System - {selectedBmsVehicle?.id} ({selectedBmsVehicle?.make} {selectedBmsVehicle?.model})
            </DialogTitle>
            <DialogDescription>
              Real-time BMS monitoring and diagnostics for {selectedBmsVehicle?.year} model
            </DialogDescription>
          </DialogHeader>

          {selectedBmsVehicle && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Battery className="w-4 h-4" />
                        State of Charge
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{selectedBmsVehicle.currentSoC}%</div>
                      <Progress value={selectedBmsVehicle.currentSoC} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        Estimated Range: {selectedBmsVehicle.range} km
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        State of Health
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-3xl font-bold ${selectedBmsVehicle.batteryHealth >= 90 ? 'text-green-600' : selectedBmsVehicle.batteryHealth >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {selectedBmsVehicle.batteryHealth}%
                      </div>
                      <Progress value={selectedBmsVehicle.batteryHealth} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        {selectedBmsVehicle.chargeCycles} charge cycles
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Thermometer className="w-4 h-4" />
                        Battery Temperature
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{selectedBmsVehicle.temperature}°F</div>
                      <Badge variant={selectedBmsVehicle.temperature > 90 ? "destructive" : "default"} className="mt-2">
                        {selectedBmsVehicle.temperature > 90 ? "High" : "Normal"}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-2">
                        Optimal: 68-86°F
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Battery Voltage
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{selectedBmsVehicle.voltage}V</div>
                      <div className="text-xs text-muted-foreground mt-2 space-y-1">
                        <div>Min Cell: {selectedBmsVehicle.cellVoltageMin}V</div>
                        <div>Max Cell: {selectedBmsVehicle.cellVoltageMax}V</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Charging Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Status:</span>
                          <Badge variant={selectedBmsVehicle.chargingStatus === "Charging" ? "default" : "secondary"}>
                            {selectedBmsVehicle.chargingStatus}
                          </Badge>
                        </div>
                        {selectedBmsVehicle.estimatedTimeToFull && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Time to Full:</span>
                            <span className="text-sm">{selectedBmsVehicle.estimatedTimeToFull}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Last Charged:</span>
                          <span className="text-sm">{selectedBmsVehicle.lastCharged}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Battery Capacity:</span>
                          <span className="text-sm">{selectedBmsVehicle.batteryCapacity} kWh</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Energy Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Efficiency:</span>
                          <span className="text-sm font-bold text-green-600">{selectedBmsVehicle.efficiency} km/kWh</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Total Energy Used:</span>
                          <span className="text-sm">{selectedBmsVehicle.totalEnergyConsumed} kWh</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Regenerative Braking:</span>
                          <span className="text-sm">{selectedBmsVehicle.regenerativeBrakingEfficiency}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Estimated Range:</span>
                          <span className="text-sm font-bold">{selectedBmsVehicle.range} km</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Charging & Discharging History</CardTitle>
                    <CardDescription>24-hour SOC, voltage, and current trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={getBmsChargingHistory(selectedBmsVehicle.id)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="soc" stroke="#10b981" name="SOC %" strokeWidth={2} />
                        <Line yAxisId="right" type="monotone" dataKey="voltage" stroke="#3b82f6" name="Voltage (V)" strokeWidth={2} />
                        <Line yAxisId="right" type="monotone" dataKey="current" stroke="#ef4444" name="Current (A)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Temperature Monitoring</CardTitle>
                    <CardDescription>Battery and ambient temperature trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={getBmsTempHistory(selectedBmsVehicle.id)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="batteryTemp" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Battery Temp (°F)" />
                        <Area type="monotone" dataKey="ambientTemp" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Ambient Temp (°F)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Range Prediction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">{selectedBmsVehicle.range} km</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Based on current SOC and driving patterns
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Lifecycle Prediction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">
                        {calculateLifecyclePrediction(selectedBmsVehicle.batteryHealth, selectedBmsVehicle.chargeCycles).toFixed(1)} years
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Estimated remaining battery life
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Optimal Charging</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">10 PM - 6 AM</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended time window for best efficiency
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Location Tab */}
              <TabsContent value="location" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Vehicle Location & Route Planning
                    </CardTitle>
                    <CardDescription>GPS tracking and charging station finder</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Alert>
                        <MapPin className="h-4 w-4" />
                        <AlertDescription>
                          <div className="font-medium">Current Location</div>
                          <div className="text-sm mt-1">{selectedBmsVehicle.location}</div>
                        </AlertDescription>
                      </Alert>

                      <div className="p-4 border rounded-lg bg-muted">
                        <div className="flex items-center justify-center h-48 text-muted-foreground">
                          <div className="text-center">
                            <MapPin className="w-12 h-12 mx-auto mb-2" />
                            <p className="text-sm">Map visualization would appear here</p>
                            <p className="text-xs mt-1">Showing vehicle location and nearby charging stations</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Route className="w-4 h-4" />
                            Route Planning
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between p-2 border rounded">
                              <span>Current Range:</span>
                              <span className="font-medium">{selectedBmsVehicle.range} km</span>
                            </div>
                            <div className="flex justify-between p-2 border rounded">
                              <span>Nearest Station:</span>
                              <span className="font-medium">2.3 km</span>
                            </div>
                            <div className="flex justify-between p-2 border rounded">
                              <span>Station Type:</span>
                              <span className="font-medium">DC Fast Charge</span>
                            </div>
                          </div>
                          <Button className="w-full mt-3" size="sm">
                            <Route className="w-4 h-4 mr-2" />
                            Plan Route to Station
                          </Button>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Nearby Charging Stations</h4>
                          <div className="space-y-2">
                            {[
                              { name: "QuickCharge Hub", distance: "2.3 km", type: "DC Fast", available: 3 },
                              { name: "City Center Station", distance: "4.7 km", type: "Level 2", available: 8 },
                              { name: "Highway Stop", distance: "8.1 km", type: "DC Fast", available: 2 }
                            ].map((station, idx) => (
                              <div key={idx} className="p-2 border rounded-lg text-xs">
                                <div className="flex justify-between items-start mb-1">
                                  <div className="font-medium">{station.name}</div>
                                  <Badge variant="secondary">{station.distance}</Badge>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                  <span>{station.type}</span>
                                  <span>{station.available} ports available</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Maintenance Tab */}
              <TabsContent value="maintenance" className="space-y-4 mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Maintenance Schedule
                      </CardTitle>
                      <CardDescription>Predictive maintenance and service alerts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-medium text-sm">Last Service</div>
                              <div className="text-xs text-muted-foreground">{selectedBmsVehicle.lastMaintenanceDate}</div>
                            </div>
                            <Badge variant="secondary">Completed</Badge>
                          </div>
                        </div>

                        <div className="p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-950 border-yellow-200">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-medium text-sm">Next Service Due</div>
                              <div className="text-xs text-muted-foreground">{selectedBmsVehicle.nextMaintenanceDate}</div>
                            </div>
                            <Badge variant="default">Upcoming</Badge>
                          </div>
                          <div className="text-xs mt-2">
                            <div className="font-medium mb-1">Recommended Tasks:</div>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              <li>Battery thermal management check</li>
                              <li>Cell voltage balancing</li>
                              <li>Firmware update</li>
                              <li>Coolant level inspection</li>
                            </ul>
                          </div>
                        </div>

                        <Alert>
                          <Wrench className="h-4 w-4" />
                          <AlertDescription className="text-xs">
                            Based on usage patterns, next service recommended in 45 days
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Maintenance Alerts
                      </CardTitle>
                      <CardDescription>Active warnings and recommendations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedBmsVehicle.temperature > 90 && (
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-xs">
                              <div className="font-medium">High Battery Temperature</div>
                              <div className="mt-1">Current: {selectedBmsVehicle.temperature}°F - Consider cooling system check</div>
                            </AlertDescription>
                          </Alert>
                        )}

                        {selectedBmsVehicle.batteryHealth < 90 && (
                          <Alert>
                            <Activity className="h-4 w-4" />
                            <AlertDescription className="text-xs">
                              <div className="font-medium">Battery Health Monitoring</div>
                              <div className="mt-1">SOH at {selectedBmsVehicle.batteryHealth}% - Continue monitoring degradation rate</div>
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="p-3 border rounded-lg">
                          <div className="text-sm font-medium mb-2">Optimization Opportunities</div>
                          <ul className="text-xs space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 mt-0.5 text-green-600" />
                              <span>Charge during off-peak hours (10 PM - 6 AM) for 15% cost savings</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 mt-0.5 text-green-600" />
                              <span>Maintain SOC between 20-80% for optimal battery longevity</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 mt-0.5 text-green-600" />
                              <span>Pre-condition battery in extreme temperatures</span>
                            </li>
                          </ul>
                        </div>

                        <Button className="w-full" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Maintenance
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Diagnostics Tab */}
              <TabsContent value="diagnostics" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gauge className="w-5 h-5" />
                      System Diagnostics
                    </CardTitle>
                    <CardDescription>Real-time BMS status and fault detection</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getBmsDiagnostics(selectedBmsVehicle.id).map((diagnostic, idx) => (
                        <div 
                          key={idx} 
                          className={`p-3 border rounded-lg ${
                            diagnostic.severity === 'warning' ? 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200' : 
                            diagnostic.severity === 'error' ? 'bg-red-50 dark:bg-red-950 border-red-200' : 
                            'bg-green-50 dark:bg-green-950 border-green-200'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono">{diagnostic.code}</span>
                              <Badge 
                                variant={
                                  diagnostic.severity === 'warning' ? 'default' : 
                                  diagnostic.severity === 'error' ? 'destructive' : 
                                  'secondary'
                                }
                              >
                                {diagnostic.status}
                              </Badge>
                            </div>
                            {diagnostic.severity === 'info' && <CheckCircle className="w-4 h-4 text-green-600" />}
                            {diagnostic.severity === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                          </div>
                          <p className="text-sm">{diagnostic.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                      <div className="p-3 border rounded-lg text-center">
                        <div className="text-xs text-muted-foreground mb-1">System Status</div>
                        <div className="text-lg font-bold text-green-600">Operational</div>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <div className="text-xs text-muted-foreground mb-1">Active Faults</div>
                        <div className="text-lg font-bold">
                          {getBmsDiagnostics(selectedBmsVehicle.id).filter(d => d.severity === 'warning' || d.severity === 'error').length}
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <div className="text-xs text-muted-foreground mb-1">Last Diagnostic</div>
                        <div className="text-lg font-bold">2 hrs ago</div>
                      </div>
                    </div>

                    <Button className="w-full mt-4" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Full Diagnostic Report
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default EVFleets;