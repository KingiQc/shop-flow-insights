import { Users, UserPlus, UserCheck, MapPin } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const customerData = [
  { name: "New Customers", value: 342, color: "hsl(220, 70%, 50%)" },
  { name: "Returning", value: 658, color: "hsl(0, 0%, 11%)" },
];

const locations = [
  { country: "United States", customers: 4521, percentage: 45 },
  { country: "United Kingdom", customers: 1892, percentage: 19 },
  { country: "Germany", customers: 1245, percentage: 12 },
  { country: "Canada", customers: 987, percentage: 10 },
  { country: "Australia", customers: 756, percentage: 8 },
];

export function CustomerInsights() {
  return (
    <div className="card-section">
      <h3 className="section-title mb-4">Customer Insights</h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-accent rounded-lg">
          <Users className="h-5 w-5 mx-auto mb-2 text-foreground" />
          <div className="text-xl font-semibold text-foreground">10,234</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
        <div className="text-center p-3 bg-accent rounded-lg">
          <UserPlus className="h-5 w-5 mx-auto mb-2 text-foreground" />
          <div className="text-xl font-semibold text-foreground">342</div>
          <div className="text-sm text-muted-foreground">New</div>
        </div>
        <div className="text-center p-3 bg-accent rounded-lg">
          <UserCheck className="h-5 w-5 mx-auto mb-2 text-foreground" />
          <div className="text-xl font-semibold text-foreground">658</div>
          <div className="text-sm text-muted-foreground">Returning</div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={customerData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
              >
                {customerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} customers`, '']}
                contentStyle={{ 
                  backgroundColor: 'hsl(0, 0%, 100%)', 
                  border: '1px solid hsl(220, 13%, 85%)',
                  borderRadius: '8px',
                  color: 'hsl(0, 0%, 11%)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {customerData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-muted-foreground">{item.name}</span>
              <span className="text-sm font-medium text-foreground ml-auto">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Top Locations</span>
        </div>
        <div className="space-y-2">
          {locations.slice(0, 4).map((loc) => (
            <div key={loc.country} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{loc.country}</span>
              <span className="font-medium text-foreground">{loc.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
