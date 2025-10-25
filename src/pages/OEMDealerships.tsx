import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Car, Bell, MapPin, TrendingUp, Wrench, Package, AlertTriangle, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const OEMDealerships = () => {
  const [selectedRecall, setSelectedRecall] = useState<any>(null);
  
  const customerVehicles = [
    {
      vin: "1HGBH41JXMN109186",
      owner: "Rajesh Kumar",
      model: "2020 Mahindra Thar",
      mileage: 52000,
      lastService: "2024-08-15",
      nextService: "2024-11-15",
      dtcs: ["P0420"],
      healthScore: 78,
      serviceAlerts: 2,
      location: "New York, NY"
    },
    {
      vin: "2T1BURHE1JC123456", 
      owner: "Priya Sharma",
      model: "2019 Tata Nexon",
      mileage: 48000,
      lastService: "2024-09-01",
      nextService: "2024-12-01",
      dtcs: [],
      healthScore: 92,
      serviceAlerts: 0,
      location: "Los Angeles, CA"
    },
    {
      vin: "3FA6P0H75JR654321",
      owner: "Amit Singh", 
      model: "2021 Tata Safari",
      mileage: 65000,
      lastService: "2024-07-20",
      nextService: "2024-10-20",
      dtcs: ["P0300", "P0100"],
      healthScore: 65,
      serviceAlerts: 3,
      location: "Chicago, IL"
    }
  ];

  const partsLifecycle = [
    { part: "Brake Pads", averageLife: 45000, currentMileage: 42000, replacement: "Soon" },
    { part: "Air Filter", averageLife: 15000, currentMileage: 12000, replacement: "Normal" },
    { part: "Catalytic Converter", averageLife: 120000, currentMileage: 85000, replacement: "Good" },
    { part: "Spark Plugs", averageLife: 60000, currentMileage: 58000, replacement: "Soon" },
    { part: "Battery", averageLife: 60, currentMileage: 48, replacement: "Normal" }
  ];

  const recallData = [
    {
      id: "RC2024-001",
      component: "Airbag Control Module",
      affectedVehicles: 1250,
      severity: "Critical",
      dtcCodes: ["B0013", "B0020"],
      completionRate: 68,
      estimatedCost: 8750000
    },
    {
      id: "RC2024-002", 
      component: "Engine Control Unit",
      affectedVehicles: 890,
      severity: "High",
      dtcCodes: ["P0601", "P0602"],
      completionRate: 45,
      estimatedCost: 12000000
    },
    {
      id: "RC2024-003",
      component: "Transmission Valve Body",
      affectedVehicles: 2100,
      severity: "Medium",
      dtcCodes: ["P0700", "P0715"],
      completionRate: 82,
      estimatedCost: 6500000
    }
  ];

  const serviceRevenue = [
    { month: "Jan", revenue: 1450000, appointments: 1250, parts: 890000 },
    { month: "Feb", revenue: 1520000, appointments: 1180, parts: 950000 },
    { month: "Mar", revenue: 1680000, appointments: 1420, parts: 1020000 },
    { month: "Apr", revenue: 1590000, appointments: 1350, parts: 980000 },
    { month: "May", revenue: 1750000, appointments: 1480, parts: 1080000 },
    { month: "Jun", revenue: 1820000, appointments: 1520, parts: 1150000 }
  ];

  const partsDemandForecast = [
    { part: "Brake Components", current: 450, forecast: 520, trend: "+15%" },
    { part: "Engine Parts", current: 280, forecast: 310, trend: "+11%" },
    { part: "Transmission", current: 120, forecast: 95, trend: "-21%" },
    { part: "Electrical", current: 340, forecast: 385, trend: "+13%" }
  ];

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "Critical": return "destructive";
      case "High": return "default";
      case "Medium": return "secondary";
      default: return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">OEM & Dealership Management</h2>
            <p className="text-muted-foreground">
              Proactive customer engagement and inventory optimization
            </p>
          </div>
          <div className="flex sm:flex-row flex-col gap-2">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Send Alerts
            </Button>
            <Button size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,847</div>
              <p className="text-xs text-muted-foreground">+5.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Service Revenue</CardTitle>
              <Wrench className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">₹9.8Cr</div>
              <p className="text-xs text-muted-foreground">6-month service income</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Recalls</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">3</div>
              <p className="text-xs text-muted-foreground">4,240 vehicles affected</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Parts Inventory</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,240</div>
              <p className="text-xs text-muted-foreground">Parts in stock</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="customer-engagement" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="customer-engagement" className="line-clamp-1">Customer Engagement</TabsTrigger>
            <TabsTrigger value="parts-lifecycle" className="line-clamp-1">Parts Lifecycle</TabsTrigger>
            <TabsTrigger value="recall-management" className="line-clamp-1">Recall Management</TabsTrigger>
            <TabsTrigger value="inventory-analytics" className="line-clamp-1">Inventory Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="customer-engagement" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Proactive Service Alerts
                  </CardTitle>
                  <CardDescription>OBD-triggered maintenance reminders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {customerVehicles.map((vehicle) => (
                      <div key={vehicle.vin} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{vehicle.owner}</div>
                          <div className="text-sm text-muted-foreground">
                            {vehicle.model} • {vehicle.mileage.toLocaleString()} km
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Next Service: {vehicle.nextService}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`px-2 py-1 rounded text-sm ${getHealthColor(vehicle.healthScore)}`}>
                            {vehicle.healthScore}%
                          </div>
                          {vehicle.serviceAlerts > 0 && (
                            <Badge variant="destructive">{vehicle.serviceAlerts} alerts</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Revenue Trends</CardTitle>
                  <CardDescription>Monthly service department performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={serviceRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => 
                        name === 'revenue' ? [`₹${value}`, 'Revenue'] :
                        name === 'parts' ? [`₹${value}`, 'Parts Sales'] :
                        [value, 'Appointments']
                      } />
                      <Line type="monotone" dataKey="revenue" stroke="#2563eb" name="revenue" />
                      <Line type="monotone" dataKey="parts" stroke="#10b981" name="parts" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Alert>
              <Bell className="h-4 w-4" />
              <AlertDescription>
                15 customers are due for service alerts based on OBD data analysis. 
                Automated reminders scheduled for next business day.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="parts-lifecycle" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Parts Lifecycle Tracking</CardTitle>
                  <CardDescription>Component wear analysis and replacement forecasting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {partsLifecycle.map((part, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{part.part}</span>
                          <Badge variant={part.replacement === "Soon" ? "destructive" : 
                                        part.replacement === "Normal" ? "secondary" : "outline"}>
                            {part.replacement}
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              part.replacement === "Soon" ? "bg-red-500" :
                              part.replacement === "Normal" ? "bg-yellow-500" : "bg-green-500"
                            }`}
                            style={{
                              width: `${Math.min((part.currentMileage / part.averageLife) * 100, 100)}%`
                            }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {part.currentMileage.toLocaleString()} / {part.averageLife.toLocaleString()} kms
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Parts Demand Forecast</CardTitle>
                  <CardDescription>Predictive inventory requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {partsDemandForecast.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{item.part}</div>
                          <div className="text-sm text-muted-foreground">
                            Current: {item.current} units
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">Forecast: {item.forecast}</div>
                          <div className={`text-sm ${item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {item.trend}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recall-management" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Active Recalls
                </CardTitle>
                <CardDescription>OBD-detected quality issues and recall campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recallData.map((recall) => (
                    <div key={recall.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium">{recall.id} - {recall.component}</div>
                          <div className="text-sm text-muted-foreground">
                            {recall.affectedVehicles} vehicles affected • DTC: {recall.dtcCodes.join(", ")}
                          </div>
                        </div>
                        <Badge variant={getSeverityColor(recall.severity)}>
                          {recall.severity}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completion Rate</span>
                          <span>{recall.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${recall.completionRate}%`}}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Estimated Cost: ₹{recall.estimatedCost.toLocaleString()}</span>
                          <span>{Math.round((100 - recall.completionRate) * recall.affectedVehicles / 100)} pending</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory-analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Optimization</CardTitle>
                  <CardDescription>Smart parts stocking based on OBD trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={partsDemandForecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="part" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="current" fill="#94a3b8" name="Current Stock" />
                      <Bar dataKey="forecast" fill="#2563eb" name="Forecasted Need" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Opportunity</CardTitle>
                  <CardDescription>Proactive service revenue potential</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex justify-between">
                      <span>Maintenance Reminders</span>
                      <span className="font-medium">₹45,000/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parts Upselling</span>
                      <span className="font-medium">₹28,500/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Extended Warranties</span>
                      <span className="font-medium">₹15,200/month</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="font-medium">Total Opportunity</span>
                      <span className="font-bold text-green-600">₹88,700/month</span>
                    </div>
                  </div>
                  <Button className="w-full">Activate Campaigns</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default OEMDealerships;