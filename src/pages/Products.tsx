import { useState } from "react";
import { Search, Filter, Package, Eye, MoreHorizontal } from "lucide-react";
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
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const productsData = [
  { id: 1, name: "Wireless Earbuds Pro", price: 49.99, sold: 1234, revenue: 61700, stock: 156, status: "In Stock", salesHistory: [45, 52, 48, 65, 58, 72, 80] },
  { id: 2, name: "Smart Watch Series X", price: 299.99, sold: 892, revenue: 89200, stock: 89, status: "In Stock", salesHistory: [30, 35, 42, 38, 48, 55, 52] },
  { id: 3, name: "USB-C Hub 7-in-1", price: 89.50, sold: 756, revenue: 37800, stock: 234, status: "In Stock", salesHistory: [25, 28, 32, 35, 30, 38, 42] },
  { id: 4, name: "Portable Charger 20K", price: 79.00, sold: 645, revenue: 25800, stock: 312, status: "In Stock", salesHistory: [20, 25, 22, 28, 32, 30, 35] },
  { id: 5, name: "Bluetooth Speaker Mini", price: 156.75, sold: 534, revenue: 26700, stock: 12, status: "Low Stock", salesHistory: [40, 45, 38, 50, 42, 55, 48] },
  { id: 6, name: "Wireless Mouse Pro", price: 89.99, sold: 423, revenue: 18900, stock: 0, status: "Out of Stock", salesHistory: [15, 18, 22, 20, 25, 28, 24] },
  { id: 7, name: "Mechanical Keyboard", price: 199.99, sold: 387, revenue: 38700, stock: 67, status: "In Stock", salesHistory: [28, 32, 35, 30, 38, 42, 45] },
  { id: 8, name: "Laptop Stand Adjustable", price: 129.00, sold: 298, revenue: 19350, stock: 145, status: "In Stock", salesHistory: [18, 22, 25, 28, 24, 30, 32] },
];

const stockStyles: Record<string, string> = {
  "In Stock": "status-badge-success",
  "Low Stock": "status-badge-warning",
  "Out of Stock": "status-badge-destructive",
};

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<typeof productsData[0] | null>(null);

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = stockFilter === "all" || product.status === stockFilter;
    return matchesSearch && matchesStock;
  });

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Products</h1>
        <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90">
          <Package className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="kpi-card">
          <span className="text-muted-foreground">Total Products</span>
          <div className="text-2xl font-semibold text-foreground mt-1">{productsData.length}</div>
        </div>
        <div className="kpi-card">
          <span className="text-muted-foreground">Total Revenue</span>
          <div className="text-2xl font-semibold text-foreground mt-1">$318,150</div>
        </div>
        <div className="kpi-card">
          <span className="text-muted-foreground">Units Sold</span>
          <div className="text-2xl font-semibold text-foreground mt-1">5,169</div>
        </div>
        <div className="kpi-card">
          <span className="text-muted-foreground">Low Stock Items</span>
          <div className="text-2xl font-semibold text-warning mt-1">2</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card-section mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border-light text-foreground"
            />
          </div>
          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-44 bg-secondary border-border-light text-foreground">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Stock Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Low Stock">Low Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Table */}
      <div className="card-section">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Sold</th>
                <th>Revenue</th>
                <th>Stock</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-foreground" />
                      </div>
                      <span className="font-medium text-foreground">{product.name}</span>
                    </div>
                  </td>
                  <td className="font-medium text-foreground">${product.price.toFixed(2)}</td>
                  <td className="text-foreground">{product.sold.toLocaleString()}</td>
                  <td className="font-medium text-foreground">${product.revenue.toLocaleString()}</td>
                  <td className="text-foreground">{product.stock}</td>
                  <td>
                    <span className={stockStyles[product.status] || "status-badge"}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem onClick={() => setSelectedProduct(product)} className="cursor-pointer hover:bg-accent">
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

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-muted-foreground text-sm">Price</span>
                  <div className="font-semibold text-foreground">${selectedProduct.price.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Stock</span>
                  <div className="font-semibold text-foreground">{selectedProduct.stock} units</div>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Units Sold</span>
                  <div className="font-semibold text-foreground">{selectedProduct.sold.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Revenue</span>
                  <div className="font-semibold text-foreground">${selectedProduct.revenue.toLocaleString()}</div>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <h4 className="font-medium mb-3 text-foreground">Sales Trend (7 days)</h4>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedProduct.salesHistory.map((val, idx) => ({ day: idx + 1, sales: val }))}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'hsl(0, 0%, 11%)', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(0, 0%, 11%)', fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(220, 13%, 85%)', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="sales" stroke="hsl(0, 0%, 11%)" fill="hsl(0, 0%, 11%)" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
