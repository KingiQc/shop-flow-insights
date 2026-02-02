import { useState } from "react";
import { 
  Area, 
  AreaChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Button } from "@/components/ui/button";

const salesData = [
  { date: "Jan 1", revenue: 4200, orders: 45 },
  { date: "Jan 2", revenue: 3800, orders: 42 },
  { date: "Jan 3", revenue: 5100, orders: 55 },
  { date: "Jan 4", revenue: 4600, orders: 48 },
  { date: "Jan 5", revenue: 5800, orders: 62 },
  { date: "Jan 6", revenue: 6200, orders: 68 },
  { date: "Jan 7", revenue: 5400, orders: 58 },
  { date: "Jan 8", revenue: 4900, orders: 52 },
  { date: "Jan 9", revenue: 6800, orders: 72 },
  { date: "Jan 10", revenue: 7200, orders: 78 },
  { date: "Jan 11", revenue: 6500, orders: 70 },
  { date: "Jan 12", revenue: 7800, orders: 85 },
  { date: "Jan 13", revenue: 8200, orders: 88 },
  { date: "Jan 14", revenue: 7400, orders: 80 },
];

type MetricType = "revenue" | "orders";

export function SalesChart() {
  const [metric, setMetric] = useState<MetricType>("revenue");

  const formatValue = (value: number) => {
    if (metric === "revenue") {
      return `$${value.toLocaleString()}`;
    }
    return value.toString();
  };

  return (
    <div className="card-section">
      <div className="flex items-center justify-between mb-6">
        <h3 className="section-title">Sales Analytics</h3>
        <div className="flex gap-2">
          <Button
            variant={metric === "revenue" ? "default" : "outline"}
            size="sm"
            onClick={() => setMetric("revenue")}
            className={metric === "revenue" 
              ? "bg-foreground text-background hover:bg-foreground/90" 
              : "border-border-light bg-secondary text-foreground hover:bg-accent"
            }
          >
            Revenue
          </Button>
          <Button
            variant={metric === "orders" ? "default" : "outline"}
            size="sm"
            onClick={() => setMetric("orders")}
            className={metric === "orders" 
              ? "bg-foreground text-background hover:bg-foreground/90" 
              : "border-border-light bg-secondary text-foreground hover:bg-accent"
            }
          >
            Orders
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 0%, 11%)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="hsl(0, 0%, 11%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 85%)" vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(0, 0%, 11%)', fontSize: 13 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(0, 0%, 11%)', fontSize: 13 }}
              tickFormatter={(value) => metric === "revenue" ? `$${value / 1000}k` : value}
              dx={-10}
            />
            <Tooltip 
              formatter={(value: number) => [formatValue(value), metric === "revenue" ? "Revenue" : "Orders"]}
              contentStyle={{ 
                backgroundColor: 'hsl(0, 0%, 100%)', 
                border: '1px solid hsl(220, 13%, 85%)',
                borderRadius: '8px',
                color: 'hsl(0, 0%, 11%)'
              }}
            />
            <Area
              type="monotone"
              dataKey={metric}
              stroke="hsl(0, 0%, 11%)"
              strokeWidth={2}
              fill="url(#colorMetric)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
