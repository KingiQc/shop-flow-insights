import { useState } from "react";
import { 
  Area, 
  AreaChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react";

const revenueData = [
  { date: "Jan 1", revenue: 4200, orders: 45, prevRevenue: 3800 },
  { date: "Jan 2", revenue: 3800, orders: 42, prevRevenue: 3500 },
  { date: "Jan 3", revenue: 5100, orders: 55, prevRevenue: 4800 },
  { date: "Jan 4", revenue: 4600, orders: 48, prevRevenue: 4200 },
  { date: "Jan 5", revenue: 5800, orders: 62, prevRevenue: 5200 },
  { date: "Jan 6", revenue: 6200, orders: 68, prevRevenue: 5800 },
  { date: "Jan 7", revenue: 5400, orders: 58, prevRevenue: 5000 },
  { date: "Jan 8", revenue: 4900, orders: 52, prevRevenue: 4600 },
  { date: "Jan 9", revenue: 6800, orders: 72, prevRevenue: 6200 },
  { date: "Jan 10", revenue: 7200, orders: 78, prevRevenue: 6800 },
  { date: "Jan 11", revenue: 6500, orders: 70, prevRevenue: 6000 },
  { date: "Jan 12", revenue: 7800, orders: 85, prevRevenue: 7200 },
  { date: "Jan 13", revenue: 8200, orders: 88, prevRevenue: 7600 },
  { date: "Jan 14", revenue: 7400, orders: 80, prevRevenue: 6900 },
];

const topProductsData = [
  { name: "Wireless Earbuds", revenue: 61700 },
  { name: "Smart Watch", revenue: 89200 },
  { name: "USB-C Hub", revenue: 37800 },
  { name: "Portable Charger", revenue: 25800 },
  { name: "Speaker Mini", revenue: 26700 },
];

const topCustomersData = [
  { name: "Lisa Anderson", spent: 2134 },
  { name: "Sarah Johnson", spent: 1245 },
  { name: "Emma Wilson", spent: 892 },
  { name: "Tom Harris", spent: 812 },
  { name: "Rachel Green", spent: 757 },
];

type MetricType = "revenue" | "orders";

export default function Analytics() {
  const [metric, setMetric] = useState<MetricType>("revenue");

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Analytics</h1>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Total Revenue</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-foreground">$84,900</span>
                <span className="text-sm text-success flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  12.5%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Total Orders</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-foreground">903</span>
                <span className="text-sm text-success flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  8.3%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Customers</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-foreground">1,247</span>
                <span className="text-sm text-success flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  5.2%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Avg Order Value</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-foreground">$94.02</span>
                <span className="text-sm text-destructive flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  2.1%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="card-section mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="section-title">Sales Over Time</h3>
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
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0, 0%, 11%)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="hsl(0, 0%, 11%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0} />
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
                contentStyle={{ 
                  backgroundColor: 'hsl(0, 0%, 100%)', 
                  border: '1px solid hsl(220, 13%, 85%)',
                  borderRadius: '8px',
                  color: 'hsl(0, 0%, 11%)'
                }}
              />
              {metric === "revenue" && (
                <Area
                  type="monotone"
                  dataKey="prevRevenue"
                  stroke="hsl(220, 70%, 50%)"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="url(#colorPrev)"
                  name="Previous Period"
                />
              )}
              <Area
                type="monotone"
                dataKey={metric}
                stroke="hsl(0, 0%, 11%)"
                strokeWidth={2}
                fill="url(#colorCurrent)"
                name={metric === "revenue" ? "Revenue" : "Orders"}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="card-section">
          <h3 className="section-title mb-4">Top Products by Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsData} layout="vertical" margin={{ left: 80 }}>
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(0, 0%, 11%)', fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(0, 0%, 11%)', fontSize: 12 }} width={80} />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(220, 13%, 85%)', borderRadius: '8px' }}
                />
                <Bar dataKey="revenue" fill="hsl(0, 0%, 11%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Customers */}
        <div className="card-section">
          <h3 className="section-title mb-4">Top Customers by Spend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCustomersData} layout="vertical" margin={{ left: 80 }}>
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(0, 0%, 11%)', fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(0, 0%, 11%)', fontSize: 12 }} width={80} />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total Spent']}
                  contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(220, 13%, 85%)', borderRadius: '8px' }}
                />
                <Bar dataKey="spent" fill="hsl(220, 70%, 50%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
