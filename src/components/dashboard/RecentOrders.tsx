import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const orders = [
  { id: "#ORD-001", customer: "Sarah Johnson", status: "Paid", amount: 245.00, date: "Jan 14, 2024" },
  { id: "#ORD-002", customer: "Mike Chen", status: "Pending", amount: 189.50, date: "Jan 14, 2024" },
  { id: "#ORD-003", customer: "Emma Wilson", status: "Paid", amount: 432.00, date: "Jan 14, 2024" },
  { id: "#ORD-004", customer: "James Brown", status: "Refunded", amount: 156.75, date: "Jan 13, 2024" },
  { id: "#ORD-005", customer: "Lisa Anderson", status: "Paid", amount: 298.25, date: "Jan 13, 2024" },
];

const statusStyles: Record<string, string> = {
  Paid: "status-badge-success",
  Pending: "status-badge-warning",
  Refunded: "status-badge-muted",
  Failed: "status-badge-destructive",
};

export function RecentOrders() {
  return (
    <div className="card-section">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title">Recent Orders</h3>
        <Button 
          variant="outline" 
          size="sm"
          className="border-border-light bg-secondary text-foreground hover:bg-accent"
        >
          View All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="font-medium">{order.id}</td>
                <td>{order.customer}</td>
                <td>
                  <span className={statusStyles[order.status] || "status-badge"}>
                    {order.status}
                  </span>
                </td>
                <td className="font-medium">${order.amount.toFixed(2)}</td>
                <td className="text-muted-foreground">{order.date}</td>
                <td>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
