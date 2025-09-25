import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Wrench, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  DollarSign,
  Car,
  Zap,
  Droplets,
  Gauge
} from "lucide-react";
import { CarHealthAnalyzer } from "@/lib/carHealthAnalyzer";

// Mock data for demonstration
const mockMaintenanceData = {
  upcomingServices: [
    {
      service: "Oil Change",
      dueIn: "850 miles",
      timeEstimate: "2 weeks",
      priority: "High",
      cost: 75,
      description: "Regular engine oil and filter replacement",
      icon: Droplets
    },
    {
      service: "Brake Inspection",
      dueIn: "2,300 miles",
      timeEstimate: "6 weeks",
      priority: "Medium",
      cost: 120,
      description: "Complete brake system inspection and fluid check",
      icon: Car
    },
    {
      service: "Air Filter",
      dueIn: "4,200 miles",
      timeEstimate: "3 months",
      priority: "Low",
      cost: 35,
      description: "Engine air filter replacement",
      icon: Gauge
    },
    {
      service: "Battery Test",
      dueIn: "6 months",
      timeEstimate: "6 months",
      priority: "Medium",
      cost: 50,
      description: "Battery performance and charging system test",
      icon: Zap
    }
  ],
  recentServices: [
    {
      service: "Tire Rotation",
      completedDate: "2024-08-15",
      cost: 65,
      mileage: 44850,
      nextDue: "50,850 miles"
    },
    {
      service: "Coolant Flush",
      completedDate: "2024-07-22",
      cost: 150,
      mileage: 44200,
      nextDue: "74,200 miles"
    },
    {
      service: "Spark Plugs",
      completedDate: "2024-06-10",
      cost: 280,
      mileage: 43800,
      nextDue: "73,800 miles"
    }
  ],
  maintenanceScore: 85,
  totalSavings: 1250,
  scheduledServices: 4,
  overdueServices: 0
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high': return 'bg-dashboard-red text-white';
    case 'medium': return 'bg-dashboard-orange text-white';
    case 'low': return 'bg-dashboard-green text-white';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high': return AlertTriangle;
    case 'medium': return Clock;
    case 'low': return CheckCircle;
    default: return Clock;
  }
};

export default function Maintenance() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Maintenance Center</h1>
          <p className="text-muted-foreground mt-2">
            Stay ahead of your vehicle's maintenance needs with predictive scheduling
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Maintenance Score"
            value={`${mockMaintenanceData.maintenanceScore}%`}
            change={5}
            changeLabel="overall maintenance health"
            icon={<Wrench className="w-5 h-5" />}
            variant="success"
          />
          <MetricCard
            title="Scheduled Services"
            value={mockMaintenanceData.scheduledServices}
            changeLabel="upcoming maintenance items"
            icon={<Calendar className="w-5 h-5" />}
            variant="default"
          />
          <MetricCard
            title="Total Savings"
            value={`$${mockMaintenanceData.totalSavings.toLocaleString()}`}
            change={12}
            changeLabel="preventive maintenance savings"
            icon={<DollarSign className="w-5 h-5" />}
            variant="success"
          />
          <MetricCard
            title="Overdue Items"
            value={mockMaintenanceData.overdueServices}
            changeLabel="items requiring immediate attention"
            icon={<AlertTriangle className="w-5 h-5" />}
            variant="default"
          />
        </div>

        {/* Maintenance Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-dashboard-blue" />
              Maintenance Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Service Progress</span>
                <span className="font-medium">850 / 5000 miles to oil change</span>
              </div>
              <Progress value={83} className="h-2" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-dashboard-green">4</div>
                  <div className="text-sm text-muted-foreground">Services On Time</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-dashboard-orange">1</div>
                  <div className="text-sm text-muted-foreground">Due Soon</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-dashboard-red">0</div>
                  <div className="text-sm text-muted-foreground">Overdue</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-dashboard-blue" />
                Upcoming Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMaintenanceData.upcomingServices.map((service, index) => {
                  const IconComponent = service.icon;
                  const PriorityIcon = getPriorityIcon(service.priority);
                  
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="w-10 h-10 bg-gradient-subtle rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-dashboard-blue" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{service.service}</h4>
                          <Badge className={getPriorityColor(service.priority)}>
                            <PriorityIcon className="w-3 h-3 mr-1" />
                            {service.priority}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>{service.description}</p>
                          <div className="flex items-center gap-4">
                            <span>Due in: {service.dueIn}</span>
                            <span>Est. Cost: ${service.cost}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Schedule
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Service History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-dashboard-green" />
                Recent Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMaintenanceData.recentServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-foreground">{service.service}</h4>
                      <div className="text-sm text-muted-foreground">
                        <p>Completed: {new Date(service.completedDate).toLocaleDateString()}</p>
                        <p>At: {service.mileage.toLocaleString()} miles</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">${service.cost}</div>
                      <div className="text-sm text-muted-foreground">
                        Next: {service.nextDue}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}