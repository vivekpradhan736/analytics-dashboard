import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  IndianRupee, 
  TrendingUp, 
  TrendingDown, 
  Car,
  BarChart3,
  Calculator,
  MapPin,
  Clock,
  Star,
  AlertTriangle
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock resale value data
const mockResaleData = {
  currentValue: {
    market: 18750,
    tradeIn: 15000,
    privateParty: 21500,
    certified: 19800
  },
  baseValue: 22000,
  depreciation: {
    mileage: 2100,
    condition: 1150,
    total: 3250
  },
  factors: {
    mileage: 45000,
    healthScore: 85,
    marketTrend: 'stable',
    demand: 'high'
  },
  valueHistory: [
    { month: 'Jan', value: 19200 },
    { month: 'Feb', value: 19050 },
    { month: 'Mar', value: 18900 },
    { month: 'Apr', value: 18850 },
    { month: 'May', value: 18750 },
    { month: 'Jun', value: 18700 }
  ],
  marketComparison: [
    { category: 'Excellent', value: 21000, count: 12 },
    { category: 'Good', value: 18750, count: 28 },
    { category: 'Fair', value: 16500, count: 35 },
    { category: 'Poor', value: 13200, count: 15 }
  ],
  improvements: [
    {
      action: "Fix catalytic converter",
      currentCost: 850,
      valueIncrease: 1500,
      roi: 76,
      timeframe: "2-3 weeks",
      impact: "High"
    },
    {
      action: "Address fuel system lean condition",
      currentCost: 400,
      valueIncrease: 800,
      roi: 100,
      timeframe: "1 week",
      impact: "Medium"
    },
    {
      action: "Professional detailing",
      currentCost: 200,
      valueIncrease: 500,
      roi: 150,
      timeframe: "2 days",
      impact: "Medium"
    }
  ]
};

const getImpactColor = (impact: string) => {
  switch (impact.toLowerCase()) {
    case 'high': return 'bg-dashboard-red text-white';
    case 'medium': return 'bg-dashboard-orange text-white';
    case 'low': return 'bg-dashboard-green text-white';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function ResaleValue() {
  const potentialGain = mockResaleData.improvements.reduce((sum, item) => sum + (item.valueIncrease - item.currentCost), 0);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resale Value Analysis</h1>
          <p className="text-muted-foreground mt-2">
            Maximize your vehicle's value with data-driven insights and recommendations
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Current Market Value"
            value={`₹${mockResaleData.currentValue.market.toLocaleString()}`}
            change={-2.1}
            changeLabel="estimated market price"
            icon={<IndianRupee className="w-5 h-5" />}
            variant="warning"
          />
          <MetricCard
            title="Health Score Impact"
            value={`${mockResaleData.factors.healthScore}%`}
            change={8}
            changeLabel="condition-based value retention"
            icon={<Star className="w-5 h-5" />}
            variant="success"
          />
          <MetricCard
            title="Potential Value Gain"
            value={`₹${potentialGain.toLocaleString()}`}
            change={12}
            changeLabel="with recommended improvements"
            icon={<TrendingUp className="w-5 h-5" />}
            variant="success"
          />
          <MetricCard
            title="Market Demand"
            value="High"
            change={15}
            changeLabel="for your vehicle type"
            icon={<BarChart3 className="w-5 h-5" />}
            variant="success"
          />
        </div>

        {/* Value Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-dashboard-blue" />
                Value Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-subtle rounded-lg">
                  <span className="font-medium text-foreground">Base Value (2019 Toyota Camry)</span>
                  <span className="font-bold text-lg">₹{mockResaleData.baseValue.toLocaleString()}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Market Value</span>
                    <span className="font-semibold text-dashboard-green">₹{mockResaleData.currentValue.market.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Trade-in Value</span>
                    <span className="font-semibold">₹{mockResaleData.currentValue.tradeIn.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Private Party</span>
                    <span className="font-semibold text-dashboard-blue">₹{mockResaleData.currentValue.privateParty.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Certified Pre-owned</span>
                    <span className="font-semibold">₹{mockResaleData.currentValue.certified.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold mb-3 text-foreground">Depreciation Factors</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Mileage Impact</span>
                      <span className="text-sm text-dashboard-red">-₹{mockResaleData.depreciation.mileage.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Condition Impact</span>
                      <span className="text-sm text-dashboard-red">-₹{mockResaleData.depreciation.condition.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-dashboard-orange" />
                Value Trend (6 Months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockResaleData.valueHistory}>
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
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--dashboard-blue))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--dashboard-blue))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Market Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-dashboard-blue" />
              Market Comparison by Condition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockResaleData.marketComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--dashboard-blue))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Value Improvement Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-dashboard-green" />
              Value Improvement Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockResaleData.improvements.map((improvement, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="w-10 h-10 bg-gradient-subtle rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-dashboard-green" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{improvement.action}</h4>
                      <Badge className={getImpactColor(improvement.impact)}>
                        {improvement.impact}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Cost: </span>
                        <span className="font-medium text-dashboard-red">₹{improvement.currentCost}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Value Gain: </span>
                        <span className="font-medium text-dashboard-green">+₹{improvement.valueIncrease}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ROI: </span>
                        <span className="font-medium text-dashboard-blue">{improvement.roi}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeline: </span>
                        <span className="font-medium">{improvement.timeframe}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Get Quote
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-subtle rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">Total Potential Gain</h4>
                  <p className="text-sm text-muted-foreground">If all improvements are made</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-dashboard-green">+₹{potentialGain.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Net profit after costs</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}