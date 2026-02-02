import { useState } from "react";
import { Search, Filter, Eye, MoreHorizontal, UserPlus, Users, UserCheck } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const customersData = [
  { id: 1, name: "Sarah Johnson", email: "sarah@email.com", orders: 12, spent: 1245.00, lastPurchase: "Jan 14, 2024", type: "Returning", orderHistory: ["#ORD-001", "#ORD-012", "#ORD-023"] },
  { id: 2, name: "Mike Chen", email: "mike@email.com", orders: 3, spent: 456.50, lastPurchase: "Jan 14, 2024", type: "New", orderHistory: ["#ORD-002", "#ORD-015"] },
  { id: 3, name: "Emma Wilson", email: "emma@email.com", orders: 8, spent: 892.00, lastPurchase: "Jan 14, 2024", type: "Returning", orderHistory: ["#ORD-003", "#ORD-018", "#ORD-025"] },
  { id: 4, name: "James Brown", email: "james@email.com", orders: 5, spent: 623.75, lastPurchase: "Jan 13, 2024", type: "Returning", orderHistory: ["#ORD-004", "#ORD-019"] },
  { id: 5, name: "Lisa Anderson", email: "lisa@email.com", orders: 15, spent: 2134.25, lastPurchase: "Jan 13, 2024", type: "Returning", orderHistory: ["#ORD-005", "#ORD-020", "#ORD-028"] },
  { id: 6, name: "David Kim", email: "david@email.com", orders: 1, spent: 523.00, lastPurchase: "Jan 13, 2024", type: "New", orderHistory: ["#ORD-006"] },
  { id: 7, name: "Rachel Green", email: "rachel@email.com", orders: 7, spent: 756.50, lastPurchase: "Jan 12, 2024", type: "Returning", orderHistory: ["#ORD-007", "#ORD-021"] },
  { id: 8, name: "Tom Harris", email: "tom@email.com", orders: 2, spent: 812.00, lastPurchase: "Jan 12, 2024", type: "New", orderHistory: ["#ORD-008"] },
];

const typeStyles: Record<string, string> = {
  New: "status-badge-muted",
  Returning: "status-badge-success",
};

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customersData[0] | null>(null);

  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || customer.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalCustomers = customersData.length;
  const newCustomers = customersData.filter(c => c.type === "New").length;
  const returningCustomers = customersData.filter(c => c.type === "Returning").length;

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Customers</h1>
        <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90">
          <UserPlus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="kpi-card flex items-center gap-4">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-foreground" />
          </div>
          <div>
            <span className="text-muted-foreground">Total Customers</span>
            <div className="text-2xl font-semibold text-foreground">{totalCustomers.toLocaleString()}</div>
          </div>
        </div>
        <div className="kpi-card flex items-center gap-4">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-foreground" />
          </div>
          <div>
            <span className="text-muted-foreground">New Customers</span>
            <div className="text-2xl font-semibold text-foreground">{newCustomers}</div>
          </div>
        </div>
        <div className="kpi-card flex items-center gap-4">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
            <UserCheck className="h-6 w-6 text-foreground" />
          </div>
          <div>
            <span className="text-muted-foreground">Returning Customers</span>
            <div className="text-2xl font-semibold text-foreground">{returningCustomers}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card-section mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border-light text-foreground"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-44 bg-secondary border-border-light text-foreground">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Customer Type" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Returning">Returning</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card-section">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Type</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Last Purchase</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-accent text-foreground">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={typeStyles[customer.type] || "status-badge"}>
                      {customer.type}
                    </span>
                  </td>
                  <td className="text-foreground">{customer.orders}</td>
                  <td className="font-medium text-foreground">${customer.spent.toFixed(2)}</td>
                  <td className="text-muted-foreground">{customer.lastPurchase}</td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem onClick={() => setSelectedCustomer(customer)} className="cursor-pointer hover:bg-accent">
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
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

      {/* Customer Detail Modal */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Customer Profile</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-accent text-foreground text-xl">
                    {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-lg text-foreground">{selectedCustomer.name}</div>
                  <div className="text-muted-foreground">{selectedCustomer.email}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <span className="text-muted-foreground text-sm">Total Orders</span>
                  <div className="font-semibold text-foreground">{selectedCustomer.orders}</div>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Total Spent</span>
                  <div className="font-semibold text-foreground">${selectedCustomer.spent.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Customer Type</span>
                  <div className="font-semibold text-foreground">{selectedCustomer.type}</div>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Last Purchase</span>
                  <div className="font-semibold text-foreground">{selectedCustomer.lastPurchase}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <h4 className="font-medium mb-2 text-foreground">Recent Orders</h4>
                <div className="space-y-1">
                  {selectedCustomer.orderHistory.map((order) => (
                    <div key={order} className="text-sm text-muted-foreground">{order}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
