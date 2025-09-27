import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Truck, AlertTriangle, TrendingUp, MapPin, Clock, Fuel, Wrench } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const FleetLogistics = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("all");
  const [costSavings, setCostSavings] = useState(0);

  // Mock fleet data with OBD integration
  const fleetVehicles = [
    {
      id: "FL001", 
      make: "Toyota", 
      model: "Camry", 
      year: 2020,
      riskScore: 85,
      mileage: 52000,
      nextService: "2024-10-15",
      location: "Route A-12",
      dtcs: ["P0300", "P0420"],
      batteryVoltage: 12.3,
      engineTemp: 102,
      downtime: "High"
    },
    {
      id: "FL002",
      make: "Honda", 
      model: "Accord", 
      year: 2019,
      riskScore: 45,
      mileage: 48000,
      nextService: "2024-11-20",
      location: "Route B-7",
      dtcs: [],
      batteryVoltage: 12.6,
      engineTemp: 88,
      downtime: "Low"
    },
    {
      id: "FL003",
      make: "Ford",
      model: "Transit",
      year: 2021,
      riskScore: 72,
      mileage: 65000,
      nextService: "2024-10-30",
      location: "Route C-3",
      dtcs: ["P0100"],
      batteryVoltage: 12.1,
      engineTemp: 95,
      downtime: "Medium"
    }
  ];

  const downtimeRiskData = [
    { route: "Route A", risk: 85, vehicles: 12, potential_loss: 15000 },
    { route: "Route B", risk: 45, vehicles: 8, potential_loss: 8000 },
    { route: "Route C", risk: 72, vehicles: 15, potential_loss: 12000 },
    { route: "Route D", risk: 30, vehicles: 10, potential_loss: 4000 }
  ];

  const maintenanceSchedule = [
    { date: "2024-10-15", vehicle: "FL001", type: "Engine Check", urgency: "Critical" },
    { date: "2024-10-18", vehicle: "FL003", type: "Battery Replacement", urgency: "High" },
    { date: "2024-10-25", vehicle: "FL002", type: "Oil Change", urgency: "Medium" },
    { date: "2024-11-01", vehicle: "FL001", type: "Tire Rotation", urgency: "Low" }
  ];

  const fuelEfficiencyData = [
    { month: "Jan", efficiency: 25.2, cost: 3200 },
    { month: "Feb", efficiency: 24.8, cost: 3350 },
    { month: "Mar", efficiency: 26.1, cost: 3100 },
    { month: "Apr", efficiency: 25.7, cost: 3180 },
    { month: "May", efficiency: 27.3, cost: 2950 },
    { month: "Jun", efficiency: 26.8, cost: 3020 }
  ];

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return "bg-red-500";
    if (risk >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const calculatePotentialSavings = () => {
    const baseCost = 45000; // Annual fleet maintenance cost
    const efficiencyImprovement = 0.15; // 15% improvement
    return Math.round(baseCost * efficiencyImprovement);
  };

  useEffect(() => {
    setCostSavings(calculatePotentialSavings());
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Fleet & Logistics Management</h2>
            <p className="text-muted-foreground">
              Predictive analytics and maintenance scheduling for optimal fleet operations
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              Live Tracking
            </Button>
            <Button size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Fleet Size</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Vehicles</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">7</div>
              <p className="text-xs text-muted-foreground">Require immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Potential Annual Savings</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">${costSavings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Through predictive maintenance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Fuel Efficiency</CardTitle>
              <Fuel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25.8 MPG</div>
              <p className="text-xs text-muted-foreground">+2.3% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="risk-dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="risk-dashboard">Risk Dashboard</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance Scheduling</TabsTrigger>
            <TabsTrigger value="analytics">Fleet Analytics</TabsTrigger>
            <TabsTrigger value="cost-savings">Cost Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="risk-dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Downtime Risk Assessment
                  </CardTitle>
                  <CardDescription>Risk analysis by route and vehicle</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={downtimeRiskData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="route" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="risk" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fleet Vehicle Status</CardTitle>
                  <CardDescription>Real-time health monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fleetVehicles.map((vehicle) => (
                      <div key={vehicle.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{vehicle.id} - {vehicle.make} {vehicle.model}</div>
                          <div className="text-sm text-muted-foreground">
                            {vehicle.mileage.toLocaleString()} miles • {vehicle.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={vehicle.downtime === "High" ? "destructive" : 
                                        vehicle.downtime === "Medium" ? "default" : "secondary"}>
                            {vehicle.downtime} Risk
                          </Badge>
                          <div className={`w-3 h-3 rounded-full ${getRiskColor(vehicle.riskScore)}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Vehicle FL001 shows critical DTCs (P0300, P0420) with high engine temperature (102°F). 
                Schedule immediate maintenance to prevent breakdown on Route A-12.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Predictive Maintenance Schedule
                </CardTitle>
                <CardDescription>AI-powered maintenance recommendations based on OBD data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {maintenanceSchedule.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.vehicle} - {item.type}</div>
                        <div className="text-sm text-muted-foreground">Scheduled: {item.date}</div>
                      </div>
                      <Badge variant={item.urgency === "Critical" ? "destructive" : 
                                    item.urgency === "High" ? "default" : 
                                    item.urgency === "Medium" ? "secondary" : "outline"}>
                        {item.urgency}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Efficiency Trends</CardTitle>
                <CardDescription>Monthly fuel consumption and efficiency analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={fuelEfficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="efficiency" stroke="#2563eb" name="MPG" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cost-savings" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Savings Calculator</CardTitle>
                  <CardDescription>Estimate annual savings through predictive maintenance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Current Annual Maintenance Cost</label>
                    <Input type="number" defaultValue="45000" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Expected Efficiency Improvement</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input type="number" defaultValue="15" className="w-20" />
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                  <Button className="w-full">Calculate Savings</Button>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm font-medium text-green-800">Estimated Annual Savings</div>
                    <div className="text-2xl font-bold text-green-600">${costSavings.toLocaleString()}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ROI Breakdown</CardTitle>
                  <CardDescription>Return on investment analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Reduced Downtime</span>
                      <span className="font-medium">$3,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fuel Efficiency</span>
                      <span className="font-medium">$2,800</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Extended Vehicle Life</span>
                      <span className="font-medium">$1,750</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Total Monthly Savings</span>
                      <span className="font-bold text-green-600">$7,750</span>
                    </div>
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

export default FleetLogistics;