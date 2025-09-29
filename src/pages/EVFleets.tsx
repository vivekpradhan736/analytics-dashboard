import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Battery, Zap, MapPin, TrendingUp, Thermometer, Clock, Leaf, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, RadialBarChart, RadialBar } from "recharts";

const EVFleets = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("all");
  
  // Mock EV fleet data with OBD integration
  const evFleetVehicles = [
    {
      id: "EV001",
      make: "Mahindra",
      model: "BE 6",
      year: 2022,
      batteryHealth: 92,
      currentSoC: 78,
      range: 285,
      chargeCycles: 245,
      location: "Mumbai, India",
      temperature: 68,
      efficiency: 4.1,
      lastCharged: "2024-09-26 08:30"
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
      lastCharged: "2024-09-25 19:45"
    },
    {
      id: "EV003",
      make: "Hyundai",
      model: "Ioniq 5",
      year: 2023,
      batteryHealth: 96,
      currentSoC: 89,
      range: 312,
      chargeCycles: 156,
      location: "Kolkata, India",
      temperature: 95,
      efficiency: 3.9,
      lastCharged: "2024-09-26 14:15"
    }
  ];

  const batteryHealthTrends = [
    { month: "Jan", mahindra: 94, tata: 88, hyundai: 97, avgTemp: 45 },
    { month: "Feb", mahindra: 93, tata: 87, hyundai: 97, avgTemp: 52 },
    { month: "Mar", mahindra: 93, tata: 86, hyundai: 96, avgTemp: 58 },
    { month: "Apr", mahindra: 92, tata: 86, hyundai: 96, avgTemp: 65 },
    { month: "May", mahindra: 92, tata: 85, hyundai: 96, avgTemp: 72 },
    { month: "Jun", mahindra: 92, tata: 85, hyundai: 96, avgTemp: 78 }
  ];

  const chargingPatterns = [
    { hour: "00:00", power: 2.1, cost: 0.08 },
    { hour: "02:00", power: 8.4, cost: 0.08 },
    { hour: "04:00", power: 12.2, cost: 0.08 },
    { hour: "06:00", power: 15.8, cost: 0.12 },
    { hour: "08:00", power: 18.5, cost: 0.15 },
    { hour: "10:00", power: 22.1, cost: 0.18 },
    { hour: "12:00", power: 25.6, cost: 0.22 },
    { hour: "14:00", power: 28.9, cost: 0.25 },
    { hour: "16:00", power: 32.4, cost: 0.28 },
    { hour: "18:00", power: 28.1, cost: 0.25 },
    { hour: "20:00", power: 18.7, cost: 0.18 },
    { hour: "22:00", power: 8.3, cost: 0.12 }
  ];

  const geographicPerformance = [
    { city: "New Delhi", vehicles: 12, avgHealth: 91, avgRange: 278, climate: "Moderate" },
    { city: "Mumbai", vehicles: 18, avgHealth: 86, avgRange: 265, climate: "Warm" },
    { city: "Jamshedpur", vehicles: 8, avgHealth: 88, avgRange: 251, climate: "Hot" },
    { city: "Kolkata", vehicles: 15, avgHealth: 93, avgRange: 295, climate: "Cool" },
    { city: "Chennai", vehicles: 10, avgHealth: 89, avgRange: 275, climate: "Variable" }
  ];

  const energyEfficiency = [
    { metric: "Fleet Average", value: 3.9, unit: "mi/kWh", target: 4.2, status: "Below" },
    { metric: "Best Performer", value: 4.8, unit: "mi/kWh", target: 4.2, status: "Above" },
    { metric: "Charging Efficiency", value: 91, unit: "%", target: 90, status: "Above" },
    { metric: "Regenerative Braking", value: 22, unit: "%", target: 25, status: "Below" }
  ];

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
          <div className="flex gap-2">
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

        <Tabs defaultValue="battery-health" className="space-y-4">
          <TabsList>
            <TabsTrigger value="battery-health">Battery Health</TabsTrigger>
            <TabsTrigger value="charging-optimization">Charging Optimization</TabsTrigger>
            <TabsTrigger value="geographic-analysis">Geographic Analysis</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability Metrics</TabsTrigger>
          </TabsList>

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
                      <div key={vehicle.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-medium">{vehicle.id} - {vehicle.make} {vehicle.model}</div>
                            <div className="text-sm text-muted-foreground">
                              {vehicle.range} mi range • {vehicle.chargeCycles} cycles
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded text-sm ${getHealthColor(vehicle.batteryHealth)}`}>
                            {vehicle.batteryHealth}% SOH
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
                      <div className="text-xs text-blue-500">Potential savings: ₹850/month</div>
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
                          <div className="text-xs text-muted-foreground">Avg Range (mi)</div>
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
                        <span className="font-medium">₹294,000 YTD</span>
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
                        15 batteries recycled this year
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
    </DashboardLayout>
  );
};

export default EVFleets;