import { useState } from "react";
import { Search, Filter, Eye, MoreHorizontal, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ordersData = [
  { id: "#ORD-001", customer: "Sarah Johnson", email: "sarah@email.com", status: "Paid", payment: "Credit Card", amount: 245.00, date: "Jan 14, 2024", items: [{ name: "Wireless Earbuds", qty: 2, price: 99.00 }, { name: "Phone Case", qty: 1, price: 47.00 }] },
  { id: "#ORD-002", customer: "Mike Chen", email: "mike@email.com", status: "Pending", payment: "PayPal", amount: 189.50, date: "Jan 14, 2024", items: [{ name: "USB-C Hub", qty: 1, price: 89.50 }, { name: "Cable Pack", qty: 2, price: 50.00 }] },
  { id: "#ORD-003", customer: "Emma Wilson", email: "emma@email.com", status: "Paid", payment: "Credit Card", amount: 432.00, date: "Jan 14, 2024", items: [{ name: "Smart Watch", qty: 1, price: 299.00 }, { name: "Watch Band", qty: 3, price: 44.33 }] },
  { id: "#ORD-004", customer: "James Brown", email: "james@email.com", status: "Refunded", payment: "Credit Card", amount: 156.75, date: "Jan 13, 2024", items: [{ name: "Bluetooth Speaker", qty: 1, price: 156.75 }] },
  { id: "#ORD-005", customer: "Lisa Anderson", email: "lisa@email.com", status: "Paid", payment: "Apple Pay", amount: 298.25, date: "Jan 13, 2024", items: [{ name: "Portable Charger", qty: 2, price: 79.00 }, { name: "Wireless Mouse", qty: 1, price: 140.25 }] },
  { id: "#ORD-006", customer: "David Kim", email: "david@email.com", status: "Failed", payment: "Credit Card", amount: 523.00, date: "Jan 13, 2024", items: [{ name: "Laptop Stand", qty: 1, price: 189.00 }, { name: "Keyboard", qty: 1, price: 334.00 }] },
  { id: "#ORD-007", customer: "Rachel Green", email: "rachel@email.com", status: "Paid", payment: "PayPal", amount: 87.50, date: "Jan 12, 2024", items: [{ name: "Screen Protector", qty: 3, price: 29.17 }] },
  { id: "#ORD-008", customer: "Tom Harris", email: "tom@email.com", status: "Pending", payment: "Credit Card", amount: 612.00, date: "Jan 12, 2024", items: [{ name: "Tablet", qty: 1, price: 499.00 }, { name: "Stylus", qty: 1, price: 113.00 }] },
];

const statusStyles: Record<string, string> = {
  Paid: "status-badge-success",
  Pending: "status-badge-warning",
  Refunded: "status-badge-muted",
  Failed: "status-badge-destructive",
};

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof ordersData[0] | null>(null);

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Orders</h1>
        <Button className="gap-2 border-border-light bg-secondary text-foreground hover:bg-accent" variant="outline">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <div className="card-section mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border-light text-foreground"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-secondary border-border-light text-foreground">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Refunded">Refunded</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card-section">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Amount</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-medium">{order.id}</td>
                  <td>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </td>
                  <td>
                    <span className={statusStyles[order.status] || "status-badge"}>
                      {order.status}
                    </span>
                  </td>
                  <td className="text-muted-foreground">{order.payment}</td>
                  <td className="font-medium">${order.amount.toFixed(2)}</td>
                  <td className="text-muted-foreground">{order.date}</td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem onClick={() => setSelectedOrder(order)} className="cursor-pointer hover:bg-accent">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Order {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer</span>
                <span className="font-medium text-foreground">{selectedOrder.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className={statusStyles[selectedOrder.status]}>{selectedOrder.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground">{selectedOrder.date}</span>
              </div>
              <div className="border-t border-border pt-4">
                <h4 className="font-medium mb-3 text-foreground">Items</h4>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{item.name} x{item.qty}</span>
                    <span className="text-foreground">${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-medium pt-2 border-t border-border mt-2">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">${selectedOrder.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
