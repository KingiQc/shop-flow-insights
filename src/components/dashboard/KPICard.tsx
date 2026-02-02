import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  sparklineData?: number[];
  prefix?: string;
  suffix?: string;
}

export function KPICard({ title, value, change, sparklineData, prefix = "", suffix = "" }: KPICardProps) {
  const isPositive = change >= 0;
  const chartData = sparklineData?.map((val, idx) => ({ value: val, index: idx })) || [];

  return (
    <div className="kpi-card">
      <div className="flex items-start justify-between mb-3">
        <span className="text-muted-foreground font-medium">{title}</span>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span className="font-medium">{isPositive ? '+' : ''}{change}%</span>
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-2xl font-semibold text-foreground">
          {prefix}{value}{suffix}
        </span>
        
        {chartData.length > 0 && (
          <div className="w-20 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isPositive ? "hsl(142, 76%, 36%)" : "hsl(0, 84%, 60%)"} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={isPositive ? "hsl(142, 76%, 36%)" : "hsl(0, 84%, 60%)"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? "hsl(142, 76%, 36%)" : "hsl(0, 84%, 60%)"}
                  strokeWidth={1.5}
                  fill={`url(#gradient-${title})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
