import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
  chartData?: Array<{ name: string; uv: number }>;
}

const variantStyles = {
  default: "border-border",
  success: "border-l-4 border-l-dashboard-green",
  warning: "border-l-4 border-l-dashboard-orange", 
  danger: "border-l-4 border-l-dashboard-red"
};

const iconColors = {
  default: "text-primary",
  success: "text-dashboard-green",
  warning: "text-dashboard-orange",
  danger: "text-dashboard-red"
};

const chartColors = {
  default: { stroke: "#8884d80", fill: "#8884d8" },
  success: { stroke: "#22c55e", fill: "#22c55e" },
  warning: { stroke: "#f59f0b0", fill: "#f59e0b" },
  danger: { stroke: "#ef44440", fill: "#ef4444" }
};

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon, 
  variant = 'default',
  className = "",
  chartData
}: MetricCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className={`${variantStyles[variant]} ${className} relative overflow-hidden`}>
      {chartData && chartData.length > 0 && (
        <div className="absolute inset-0 z-0 top-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <Area 
                type="monotone" 
                dataKey="uv" 
                stroke={chartColors[variant].stroke}
                fill={chartColors[variant].fill}
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className={iconColors[variant]}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold text-foreground mb-1">
          {value}
        </div>
        {change !== undefined && (
          <div className="flex items-center gap-1 mb-4">
            {isPositive && <TrendingUp className="w-4 h-4 text-dashboard-green" />}
            {isNegative && <TrendingDown className="w-4 h-4 text-dashboard-red" />}
            <Badge 
              variant="secondary" 
              className={`text-xs ${
                isPositive ? 'text-dashboard-green' : 
                isNegative ? 'text-dashboard-red' : 
                'text-muted-foreground'
              }`}
            >
              {change > 0 ? '+' : ''}{change}%
            </Badge>
            {changeLabel && (
              <span className="text-xs text-muted-foreground ml-1">
                {changeLabel}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}