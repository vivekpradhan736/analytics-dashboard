import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Gauge,
  Zap,
  Thermometer,
  Fuel,
  Battery,
  Calendar,
  Download
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar
} from 'recharts';

// Mock analytics data
const mockAnalyticsData = {
  overview: {
    totalDrives: 247,
    totalkms: 8543,
    avgFuelEconomy: 28.5,
    co2Emissions: 2.1
  },
  performanceMetrics: [
    { date: '2024-09-01', fuelEconomy: 27.2, avgSpeed: 35, engineLoad: 45, efficiency: 82 },
    { date: '2024-09-08', fuelEconomy: 28.1, avgSpeed: 38, engineLoad: 42, efficiency: 85 },
    { date: '2024-09-15', fuelEconomy: 28.8, avgSpeed: 34, engineLoad: 48, efficiency: 79 },
    { date: '2024-09-22', fuelEconomy: 29.2, avgSpeed: 41, engineLoad: 38, efficiency: 88 }
  ],
  sensorTrends: [
    { time: '00:00', engineTemp: 89, oilTemp: 85, batteryVoltage: 12.6, fuelPressure: 58 },
    { time: '04:00', engineTemp: 91, oilTemp: 88, batteryVoltage: 12.5, fuelPressure: 57 },
    { time: '08:00', engineTemp: 93, oilTemp: 92, batteryVoltage: 12.7, fuelPressure: 59 },
    { time: '12:00', engineTemp: 95, oilTemp: 95, batteryVoltage: 12.8, fuelPressure: 58 },
    { time: '16:00', engineTemp: 92, oilTemp: 89, batteryVoltage: 12.6, fuelPressure: 57 },
    { time: '20:00', engineTemp: 88, oilTemp: 86, batteryVoltage: 12.5, fuelPressure: 58 }
  ],
  drivingPatterns: [
    { type: 'City', kms: 3421, percentage: 40, efficiency: 25.2 },
    { type: 'Highway', kms: 3654, percentage: 43, efficiency: 32.1 },
    { type: 'Mixed', kms: 1468, percentage: 17, efficiency: 28.9 }
  ],
  maintenanceImpact: [
    { month: 'May', beforeService: 82, afterService: 95 },
    { month: 'Jun', beforeService: 78, afterService: 92 },
    { month: 'Jul', beforeService: 75, afterService: 89 },
    { month: 'Aug', beforeService: 73, afterService: 88 },
    { month: 'Sep', beforeService: 71, afterService: 85 }
  ],
  emissionsData: [
    { month: 'May', co2: 2.3, nox: 0.12, hc: 0.08 },
    { month: 'Jun', co2: 2.2, nox: 0.11, hc: 0.07 },
    { month: 'Jul', co2: 2.1, nox: 0.10, hc: 0.06 },
    { month: 'Aug', co2: 2.0, nox: 0.09, hc: 0.05 },
    { month: 'Sep', co2: 1.9, nox: 0.08, hc: 0.04 }
  ]
};

const COLORS = ['hsl(var(--dashboard-blue))', 'hsl(var(--dashboard-green))', 'hsl(var(--dashboard-orange))'];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Advanced Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Deep Insights into your Vehicle's Performance, Efficiency, and Health Trends
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Drives"
            value={mockAnalyticsData.overview.totalDrives}
            change={12}
            changeLabel="this month"
            icon={<Activity className="w-5 h-5" />}
            variant="success"
          />
          <MetricCard
            title="K.M Driven"
            value={`${mockAnalyticsData.overview.totalkms.toLocaleString()}`}
            change={8}
            changeLabel="this month"
            icon={<Gauge className="w-5 h-5" />}
            variant="success"
          />
          <MetricCard
            title="Fuel Economy"
            value={`${mockAnalyticsData.overview.avgFuelEconomy} kmpl`}
            change={5}
            changeLabel="average this month"
            icon={<Fuel className="w-5 h-5" />}
            variant="success"
          />
          <MetricCard
            title="CO2 Emissions"
            value={`${mockAnalyticsData.overview.co2Emissions} tons`}
            change={-15}
            changeLabel="this month"
            icon={<TrendingDown className="w-5 h-5" />}
            variant="success"
          />
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="sensors">Sensor Data</TabsTrigger>
            <TabsTrigger value="driving">Driving Patterns</TabsTrigger>
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
          </TabsList>

          {/* Performance Analytics */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Fuel className="w-5 h-5 text-dashboard-blue" />
                    Fuel Economy Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockAnalyticsData.performanceMetrics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="fuelEconomy" 
                        stroke="hsl(var(--dashboard-blue))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--dashboard-blue))', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-dashboard-green" />
                    Engine Efficiency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={mockAnalyticsData.performanceMetrics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="efficiency" 
                        stroke="hsl(var(--dashboard-green))" 
                        fill="hsl(var(--dashboard-green))"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-dashboard-orange" />
                  Maintenance Impact on Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockAnalyticsData.maintenanceImpact}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="beforeService" fill="hsl(var(--dashboard-red))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="afterService" fill="hsl(var(--dashboard-green))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sensor Data */}
          <TabsContent value="sensors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-dashboard-red" />
                  Real-time Sensor Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={mockAnalyticsData.sensorTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="engineTemp" stroke="hsl(var(--dashboard-red))" strokeWidth={2} />
                    <Line type="monotone" dataKey="oilTemp" stroke="hsl(var(--dashboard-orange))" strokeWidth={2} />
                    <Line type="monotone" dataKey="batteryVoltage" stroke="hsl(var(--dashboard-blue))" strokeWidth={2} />
                    <Line type="monotone" dataKey="fuelPressure" stroke="hsl(var(--dashboard-green))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Driving Patterns */}
          <TabsContent value="driving" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-dashboard-blue" />
                    Driving Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockAnalyticsData.drivingPatterns}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                        label={({ type, percentage }) => `${type}: ${percentage}%`}
                      >
                        {mockAnalyticsData.drivingPatterns.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Fuel className="w-5 h-5 text-dashboard-green" />
                    Efficiency by Driving Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalyticsData.drivingPatterns.map((pattern, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-foreground">{pattern.type}</span>
                          <span className="text-sm text-muted-foreground">{pattern.efficiency} kmpl</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${(pattern.efficiency / 35) * 100}%`,
                              backgroundColor: COLORS[index]
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {pattern.kms.toLocaleString()} kms ({pattern.percentage}%)
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Environmental */}
          <TabsContent value="environmental" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-dashboard-green" />
                  Emissions Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockAnalyticsData.emissionsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="co2" stackId="1" stroke="hsl(var(--dashboard-red))" fill="hsl(var(--dashboard-red))" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="nox" stackId="1" stroke="hsl(var(--dashboard-orange))" fill="hsl(var(--dashboard-orange))" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="hc" stackId="1" stroke="hsl(var(--dashboard-blue))" fill="hsl(var(--dashboard-blue))" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}