import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Car,
  IndianRupee,
  BarChart3,
  Filter
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

// Mock data for service bookings
const mockBookingData = {
  totalBookings: 1247,
  monthlyBookings: 156,
  pendingBookings: 23,
  completedBookings: 1180,
  revenue: 2850000,
  averageServiceTime: 2.5
};

const monthlyData = [
  { month: 'Jan', bookings: 120, revenue: 240000 },
  { month: 'Feb', bookings: 135, revenue: 270000 },
  { month: 'Mar', bookings: 148, revenue: 296000 },
  { month: 'Apr', bookings: 162, revenue: 324000 },
  { month: 'May', bookings: 156, revenue: 312000 },
  { month: 'Jun', bookings: 170, revenue: 340000 }
];

const cityData = [
  { name: 'Mumbai', bookings: 234, color: '#d36262' },
  { name: 'Delhi', bookings: 198, color: '#e89c5a' },
  { name: 'Bangalore', bookings: 165, color: '#6ba3d6' },
  { name: 'Chennai', bookings: 142, color: '#7fb069' },
  { name: 'Pune', bookings: 118, color: '#9b59b6' }
];

const serviceTypeData = [
  { service: 'Oil Change', bookings: 324, improvement: 12 },
  { service: 'Brake Service', bookings: 298, improvement: 8 },
  { service: 'Battery Replacement', bookings: 245, improvement: -3 },
  { service: 'Tire Service', bookings: 198, improvement: 15 },
  { service: 'Engine Diagnostic', bookings: 182, improvement: 22 }
];

const pendingBookings = [
  {
    id: 'SB001',
    customerName: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    service: 'Oil Change',
    vehicle: '2020 Mahindra Thar',
    city: 'Mumbai',
    scheduledDate: '2024-09-28',
    status: 'confirmed'
  },
  {
    id: 'SB002',
    customerName: 'Priya Sharma',
    phone: '+91 87654 32109',
    service: 'Brake Inspection',
    vehicle: '2019 Tata Nexon',
    city: 'Delhi',
    scheduledDate: '2024-09-29',
    status: 'pending'
  },
  {
    id: 'SB003',
    customerName: 'Amit Singh',
    phone: '+91 76543 21098',
    service: 'Battery Test',
    vehicle: '2021 Mahindra BE 6',
    city: 'Bangalore',
    scheduledDate: '2024-09-30',
    status: 'confirmed'
  }
];

const recentCustomers = [
  {
    name: 'Ravi Patel',
    email: 'ravi.patel@email.com',
    phone: '+91 99887 65432',
    totalBookings: 12,
    lastService: '2024-09-20',
    vehicle: '2018 Mahindra Thar',
    city: 'Ahmedabad'
  },
  {
    name: 'Sneha Reddy',
    email: 'sneha.reddy@email.com', 
    phone: '+91 88776 54321',
    totalBookings: 8,
    lastService: '2024-09-18',
    vehicle: '2020 Tata Nexon',
    city: 'Hyderabad'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return 'bg-dashboard-green text-white';
    case 'pending': return 'bg-dashboard-orange text-white';
    case 'completed': return 'bg-dashboard-blue text-white';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function ServiceBookings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Service Booking Management</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive analytics and management for all service bookings
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <MetricCard
            title="Total Bookings"
            value={mockBookingData.totalBookings.toLocaleString()}
            change={8}
            changeLabel="vs last month"
            icon={<Calendar className="w-5 h-5" />}
            variant="success"
          />
          <MetricCard
            title="Monthly Bookings"
            value={mockBookingData.monthlyBookings}
            change={12}
            changeLabel="this month"
            icon={<TrendingUp className="w-5 h-5" />}
            variant="success"
          />
          <MetricCard
            title="Pending Bookings"
            value={mockBookingData.pendingBookings}
            changeLabel="require attention"
            icon={<AlertCircle className="w-5 h-5" />}
            variant="warning"
          />
          <MetricCard
            title="Completed"
            value={mockBookingData.completedBookings.toLocaleString()}
            change={95}
            changeLabel="completion rate"
            icon={<CheckCircle className="w-5 h-5" />}
            variant="success"
          />
          <MetricCard
            title="Revenue"
            value={`₹${(mockBookingData.revenue / 100000).toFixed(1)}L`}
            change={18}
            changeLabel="this month"
            icon={<IndianRupee className="w-5 h-5" />}
            variant="success"
          />
          <MetricCard
            title="Avg Service Time"
            value={`${mockBookingData.averageServiceTime}h`}
            change={-15}
            changeLabel="efficiency improved"
            icon={<Clock className="w-5 h-5" />}
            variant="success"
          />
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="bookings">Pending Bookings</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="improvements">Improvements</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-dashboard-blue" />
                    Monthly Booking Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }}
                      />
                      <Line type="monotone" dataKey="bookings" stroke="hsl(var(--primary))" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* City-wise Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-dashboard-green" />
                    City-wise Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={cityData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="bookings"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {cityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-dashboard-orange" />
                  Revenue Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                      formatter={(value) => [`₹${(Number(value) / 1000).toFixed(0)}K`, 'Revenue']}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-dashboard-orange" />
                    Pending Service Bookings
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.customerName}</div>
                            <div className="text-sm text-muted-foreground">{booking.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.vehicle}</TableCell>
                        <TableCell>{booking.city}</TableCell>
                        <TableCell>{new Date(booking.scheduledDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-dashboard-blue" />
                  Customer Details & Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentCustomers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{customer.name}</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p className="flex items-center gap-2">
                              <Mail className="w-3 h-3" />
                              {customer.email}
                            </p>
                            <p className="flex items-center gap-2">
                              <Phone className="w-3 h-3" />
                              {customer.phone}
                            </p>
                            <p className="flex items-center gap-2">
                              <Car className="w-3 h-3" />
                              {customer.vehicle}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">{customer.totalBookings}</div>
                        <div className="text-sm text-muted-foreground">Total Bookings</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Last Service: {new Date(customer.lastService).toLocaleDateString()}
                        </div>
                        <Badge variant="outline" className="mt-2">
                          <MapPin className="w-3 h-3 mr-1" />
                          {customer.city}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Improvements Tab */}
          <TabsContent value="improvements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-dashboard-green" />
                  Service Area Improvement Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceTypeData.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-semibold text-foreground">{service.service}</h4>
                        <div className="text-sm text-muted-foreground">
                          {service.bookings} bookings this month
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge 
                          className={service.improvement >= 0 
                            ? 'bg-dashboard-green text-white' 
                            : 'bg-dashboard-red text-white'
                          }
                        >
                          {service.improvement >= 0 ? '+' : ''}{service.improvement}%
                        </Badge>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            {service.improvement >= 0 ? 'Improved' : 'Needs Attention'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Improvement Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-accent/20 border border-accent rounded-lg">
                    <h5 className="font-semibold text-accent-foreground">Battery Replacement Service</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consider adding more certified technicians and improving diagnostic tools. 
                      Service time can be reduced by 20% with better equipment.
                    </p>
                  </div>
                  <div className="p-4 bg-dashboard-green/10 border border-dashboard-green rounded-lg">
                    <h5 className="font-semibold text-dashboard-green">Tire Service Expansion</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      High demand growth of 15%. Consider expanding tire service capacity 
                      in Mumbai and Delhi locations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}