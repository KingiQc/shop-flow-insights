import { useState } from "react";
import { Store, User, Bell, Globe, Clock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [storeName, setStoreName] = useState("My E-Commerce Store");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("America/New_York");
  const [userName, setUserName] = useState("John Doe");
  const [userEmail, setUserEmail] = useState("john@store.com");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Settings</h1>
      </div>

      <Tabs defaultValue="store" className="space-y-6">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="store" className="data-[state=active]:bg-card data-[state=active]:text-foreground">
            <Store className="h-4 w-4 mr-2" />
            Store
          </TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-card data-[state=active]:text-foreground">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-card data-[state=active]:text-foreground">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Store Settings */}
        <TabsContent value="store">
          <div className="card-section max-w-2xl">
            <h3 className="section-title mb-6">Store Settings</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="storeName" className="text-foreground">Store Name</Label>
                <Input
                  id="storeName"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="bg-secondary border-border-light text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency" className="text-foreground">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="bg-secondary border-border-light text-foreground">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-foreground">Time Zone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="bg-secondary border-border-light text-foreground">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSave} className="gap-2 bg-foreground text-background hover:bg-foreground/90">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <div className="card-section max-w-2xl">
            <h3 className="section-title mb-6">Profile Settings</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userName" className="text-foreground">Full Name</Label>
                <Input
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-secondary border-border-light text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userEmail" className="text-foreground">Email Address</Label>
                <Input
                  id="userEmail"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="bg-secondary border-border-light text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-secondary border-border-light text-foreground"
                />
                <p className="text-sm text-muted-foreground">Leave blank to keep current password</p>
              </div>

              <Button onClick={handleSave} className="gap-2 bg-foreground text-background hover:bg-foreground/90">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <div className="card-section max-w-2xl">
            <h3 className="section-title mb-6">Notification Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium text-foreground">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium text-foreground">New Order Alerts</div>
                  <div className="text-sm text-muted-foreground">Get notified when a new order is placed</div>
                </div>
                <Switch
                  checked={orderAlerts}
                  onCheckedChange={setOrderAlerts}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium text-foreground">Low Stock Alerts</div>
                  <div className="text-sm text-muted-foreground">Get notified when products are low in stock</div>
                </div>
                <Switch
                  checked={lowStockAlerts}
                  onCheckedChange={setLowStockAlerts}
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium text-foreground">Marketing Emails</div>
                  <div className="text-sm text-muted-foreground">Receive tips and product updates</div>
                </div>
                <Switch
                  checked={marketingEmails}
                  onCheckedChange={setMarketingEmails}
                />
              </div>

              <Button onClick={handleSave} className="gap-2 bg-foreground text-background hover:bg-foreground/90">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
