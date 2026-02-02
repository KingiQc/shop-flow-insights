import { KPICard } from "@/components/dashboard/KPICard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { CustomerInsights } from "@/components/dashboard/CustomerInsights";

const kpiData = [
  { 
    title: "Total Revenue", 
    value: "84,254", 
    change: 12.5, 
    prefix: "$",
    sparklineData: [30, 45, 35, 50, 49, 60, 70, 65, 80, 75, 90, 85]
  },
  { 
    title: "Total Orders", 
    value: "1,429", 
    change: 8.2,
    sparklineData: [20, 35, 30, 40, 38, 50, 55, 48, 60, 58, 65, 70]
  },
  { 
    title: "Average Order Value", 
    value: "58.99", 
    change: 3.8, 
    prefix: "$",
    sparklineData: [45, 48, 50, 52, 51, 55, 54, 58, 57, 60, 59, 62]
  },
  { 
    title: "Conversion Rate", 
    value: "3.24", 
    change: -1.2, 
    suffix: "%",
    sparklineData: [4.2, 4.0, 3.8, 3.9, 3.5, 3.4, 3.6, 3.3, 3.2, 3.4, 3.1, 3.24]
  },
  { 
    title: "Returning Customers", 
    value: "64.2", 
    change: 5.4, 
    suffix: "%",
    sparklineData: [55, 58, 57, 60, 59, 62, 61, 63, 62, 64, 63, 64.2]
  },
];

const Index = () => {
  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-2">
        <h1 className="page-title">Dashboard</h1>
        <span className="text-sm text-muted-foreground">Last updated: Just now</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <CustomerInsights />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
};

export default Index;
