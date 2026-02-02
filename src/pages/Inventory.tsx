import { useState } from "react";
import { Search, Filter, Package, AlertTriangle, CheckCircle, XCircle, Edit2 } from "lucide-react";
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
  DialogFooter,
} from "@/components/ui/dialog";

const inventoryData = [
  { id: 1, name: "Wireless Earbuds Pro", sku: "WEP-001", stock: 156, reorderPoint: 50, status: "In Stock" },
  { id: 2, name: "Smart Watch Series X", sku: "SWX-001", stock: 89, reorderPoint: 30, status: "In Stock" },
  { id: 3, name: "USB-C Hub 7-in-1", sku: "UCH-001", stock: 234, reorderPoint: 100, status: "In Stock" },
  { id: 4, name: "Portable Charger 20K", sku: "PC2-001", stock: 312, reorderPoint: 150, status: "In Stock" },
  { id: 5, name: "Bluetooth Speaker Mini", sku: "BSM-001", stock: 12, reorderPoint: 50, status: "Low Stock" },
  { id: 6, name: "Wireless Mouse Pro", sku: "WMP-001", stock: 0, reorderPoint: 40, status: "Out of Stock" },
  { id: 7, name: "Mechanical Keyboard", sku: "MKB-001", stock: 67, reorderPoint: 30, status: "In Stock" },
  { id: 8, name: "Laptop Stand Adjustable", sku: "LSA-001", stock: 145, reorderPoint: 60, status: "In Stock" },
  { id: 9, name: "Screen Protector Pack", sku: "SPP-001", stock: 23, reorderPoint: 100, status: "Low Stock" },
  { id: 10, name: "Phone Case Premium", sku: "PCP-001", stock: 0, reorderPoint: 80, status: "Out of Stock" },
];

const statusStyles: Record<string, string> = {
  "In Stock": "status-badge-success",
  "Low Stock": "status-badge-warning",
  "Out of Stock": "status-badge-destructive",
};

const statusIcons: Record<string, React.ReactNode> = {
  "In Stock": <CheckCircle className="h-4 w-4" />,
  "Low Stock": <AlertTriangle className="h-4 w-4" />,
  "Out of Stock": <XCircle className="h-4 w-4" />,
};

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingItem, setEditingItem] = useState<typeof inventoryData[0] | null>(null);
  const [newStock, setNewStock] = useState("");

  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const inStockCount = inventoryData.filter(i => i.status === "In Stock").length;
  const lowStockCount = inventoryData.filter(i => i.status === "Low Stock").length;
  const outOfStockCount = inventoryData.filter(i => i.status === "Out of Stock").length;

  const handleUpdateStock = () => {
    // In a real app, this would update the database
    setEditingItem(null);
    setNewStock("");
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Inventory</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="kpi-card flex items-center gap-4">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-success" />
          </div>
          <div>
            <span className="text-muted-foreground">In Stock</span>
            <div className="text-2xl font-semibold text-foreground">{inStockCount}</div>
          </div>
        </div>
        <div className="kpi-card flex items-center gap-4">
          <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-warning" />
          </div>
          <div>
            <span className="text-muted-foreground">Low Stock</span>
            <div className="text-2xl font-semibold text-warning">{lowStockCount}</div>
          </div>
        </div>
        <div className="kpi-card flex items-center gap-4">
          <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
            <XCircle className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <span className="text-muted-foreground">Out of Stock</span>
            <div className="text-2xl font-semibold text-destructive">{outOfStockCount}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card-section mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border-light text-foreground"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-44 bg-secondary border-border-light text-foreground">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Stock Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Low Stock">Low Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card-section">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Stock Level</th>
                <th>Reorder Point</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-foreground" />
                      </div>
                      <span className="font-medium text-foreground">{item.name}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground font-mono text-sm">{item.sku}</td>
                  <td className="font-medium text-foreground">{item.stock}</td>
                  <td className="text-muted-foreground">{item.reorderPoint}</td>
                  <td>
                    <span className={`${statusStyles[item.status]} flex items-center gap-1.5`}>
                      {statusIcons[item.status]}
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setEditingItem(item);
                        setNewStock(item.stock.toString());
                      }}
                      className="gap-2 hover:bg-accent text-foreground"
                    >
                      <Edit2 className="h-4 w-4" />
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Stock Modal */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-foreground">Update Stock</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div>
                <span className="text-muted-foreground text-sm">Product</span>
                <div className="font-medium text-foreground">{editingItem.name}</div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Current Stock</span>
                <div className="font-medium text-foreground">{editingItem.stock} units</div>
              </div>
              <div>
                <label className="text-muted-foreground text-sm block mb-1">New Stock Level</label>
                <Input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  className="bg-secondary border-border-light text-foreground"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setEditingItem(null)}
              className="border-border-light bg-secondary text-foreground hover:bg-accent"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateStock}
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              Update Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
