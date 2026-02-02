import { Bell, Search, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

const dateRanges = [
  { label: "Today", value: "today" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "Custom", value: "custom" },
];

export function TopBar() {
  const [selectedRange, setSelectedRange] = useState("7d");
  const selectedLabel = dateRanges.find(r => r.value === selectedRange)?.label || "Last 7 days";

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search orders, products, customers..." 
            className="pl-10 w-80 bg-secondary border-border-light text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 border-border-light bg-secondary text-foreground hover:bg-accent">
              <Calendar className="h-4 w-4" />
              {selectedLabel}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            {dateRanges.map((range) => (
              <DropdownMenuItem 
                key={range.value}
                onClick={() => setSelectedRange(range.value)}
                className="text-foreground hover:bg-accent cursor-pointer"
              >
                {range.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-full">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
          <span className="text-sm text-success font-medium">Live</span>
        </div>

        <Button variant="outline" size="icon" className="relative border-border-light bg-secondary text-foreground hover:bg-accent">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 hover:bg-accent">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-foreground text-background text-sm">JD</AvatarFallback>
              </Avatar>
              <span className="text-foreground font-medium">John Doe</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            <DropdownMenuItem className="text-foreground hover:bg-accent cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-foreground hover:bg-accent cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive hover:bg-accent cursor-pointer">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
