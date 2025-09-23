import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
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

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon, 
  variant = 'default',
  className = ""
}: MetricCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className={`${variantStyles[variant]} ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className={iconColors[variant]}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">
          {value}
        </div>
        {change !== undefined && (
          <div className="flex items-center gap-1">
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