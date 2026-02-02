import { Package } from "lucide-react";

const products = [
  { name: "Wireless Earbuds Pro", sold: 1234, revenue: 61700, stock: 156 },
  { name: "Smart Watch Series X", sold: 892, revenue: 89200, stock: 89 },
  { name: "USB-C Hub 7-in-1", sold: 756, revenue: 37800, stock: 234 },
  { name: "Portable Charger 20K", sold: 645, revenue: 25800, stock: 312 },
  { name: "Bluetooth Speaker Mini", sold: 534, revenue: 26700, stock: 67 },
];

export function TopProducts() {
  const maxSold = Math.max(...products.map(p => p.sold));

  return (
    <div className="card-section">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title">Top Products</h3>
        <span className="text-sm text-muted-foreground">By units sold</span>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.name} className="flex items-center gap-4">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shrink-0">
              <Package className="h-5 w-5 text-foreground" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground truncate">{product.name}</span>
                <span className="text-sm text-muted-foreground ml-2">{product.sold} sold</span>
              </div>
              <div className="h-2 bg-accent rounded-full overflow-hidden">
                <div 
                  className="h-full bg-foreground rounded-full transition-all"
                  style={{ width: `${(product.sold / maxSold) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="font-medium text-foreground">${(product.revenue / 1000).toFixed(1)}k</div>
              <div className="text-sm text-muted-foreground">{product.stock} in stock</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
