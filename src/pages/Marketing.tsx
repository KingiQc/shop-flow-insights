import { 
  Globe, 
  Share2, 
  CreditCard, 
  Mail,
  TrendingUp,
  Users,
  ShoppingCart,
  Eye 
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis 
} from "recharts";

const trafficData = [
  { name: "Direct", value: 4521, color: "hsl(0, 0%, 11%)" },
  { name: "Social", value: 2892, color: "hsl(220, 70%, 50%)" },
  { name: "Organic", value: 2245, color: "hsl(142, 76%, 36%)" },
  { name: "Paid", value: 1587, color: "hsl(38, 92%, 50%)" },
  { name: "Email", value: 956, color: "hsl(0, 84%, 60%)" },
];

const channelData = [
  { channel: "Website", visitors: 8500, conversions: 425, rate: "5.0%" },
  { channel: "Instagram", visitors: 3200, conversions: 128, rate: "4.0%" },
  { channel: "Facebook", visitors: 2100, conversions: 63, rate: "3.0%" },
  { channel: "Google Ads", visitors: 1800, conversions: 90, rate: "5.0%" },
  { channel: "Email", visitors: 950, conversions: 76, rate: "8.0%" },
];

const campaignData = [
  { name: "Winter Sale 2024", status: "Active", revenue: 12500, orders: 156 },
  { name: "New Year Promo", status: "Ended", revenue: 8900, orders: 112 },
  { name: "Flash Friday", status: "Active", revenue: 6200, orders: 89 },
  { name: "Email Newsletter", status: "Active", revenue: 4500, orders: 67 },
];

const statusStyles: Record<string, string> = {
  Active: "status-badge-success",
  Ended: "status-badge-muted",
  Scheduled: "status-badge-warning",
};

export default function Marketing() {
  const totalVisitors = trafficData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Marketing</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Eye className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Total Visitors</span>
              <div className="text-xl font-semibold text-foreground">{totalVisitors.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Unique Visitors</span>
              <div className="text-xl font-semibold text-foreground">9,847</div>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Conversion Rate</span>
              <div className="text-xl font-semibold text-foreground">4.8%</div>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Attributed Sales</span>
              <div className="text-xl font-semibold text-foreground">$32,100</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Traffic Sources */}
        <div className="card-section">
          <h3 className="section-title mb-4">Traffic Sources</h3>
          <div className="flex items-center gap-6">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {trafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value.toLocaleString()} visitors`, '']}
                    contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(220, 13%, 85%)', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {trafficData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-foreground">{item.value.toLocaleString()}</span>
                    <span className="text-muted-foreground text-sm ml-2">
                      ({((item.value / totalVisitors) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales by Channel */}
        <div className="card-section">
          <h3 className="section-title mb-4">Sales by Channel</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} layout="vertical" margin={{ left: 70 }}>
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(0, 0%, 11%)', fontSize: 12 }} />
                <YAxis type="category" dataKey="channel" axisLine={false} tickLine={false} tick={{ fill: 'hsl(0, 0%, 11%)', fontSize: 12 }} width={70} />
                <Tooltip 
                  formatter={(value: number) => [value.toLocaleString(), 'Visitors']}
                  contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(220, 13%, 85%)', borderRadius: '8px' }}
                />
                <Bar dataKey="visitors" fill="hsl(0, 0%, 11%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="card-section">
        <h3 className="section-title mb-4">Campaigns</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Status</th>
                <th>Revenue</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((campaign) => (
                <tr key={campaign.name}>
                  <td className="font-medium text-foreground">{campaign.name}</td>
                  <td>
                    <span className={statusStyles[campaign.status] || "status-badge"}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="font-medium text-foreground">${campaign.revenue.toLocaleString()}</td>
                  <td className="text-foreground">{campaign.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
