import { useState } from "react";
import { Home, Wrench, Building, Calendar, Users, AlertTriangle } from "lucide-react";
import Header from "@/components/layout/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import MaintenanceRequestForm from "@/components/tenant/MaintenanceRequestForm";
import PropertyInventory from "@/components/management/PropertyInventory";
import VendorDashboard from "@/components/vendor/VendorDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [currentPortal, setCurrentPortal] = useState("management");

  const renderTenantPortal = () => (
    <div className="space-y-6">
      {/* Tenant Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Open Requests"
          value={2}
          icon={AlertTriangle}
          color="warning"
        />
        <StatsCard
          title="Completed Requests"
          value={8}
          icon={Wrench}
          color="success"
        />
        <StatsCard
          title="Avg Response Time"
          value="2.3 days"
          icon={Calendar}
          color="primary"
        />
        <StatsCard
          title="Property Rating"
          value="4.8/5"
          icon={Home}
          color="success"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Report New Issue
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Wrench className="mr-2 h-4 w-4" />
              View Request History
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Property Information
            </Button>
          </CardContent>
        </Card>

        <MaintenanceRequestForm />
      </div>
    </div>
  );

  const renderManagementPortal = () => (
    <div className="space-y-6">
      {/* Management Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Properties"
          value={24}
          icon={Building}
          color="primary"
          trend={{ value: 3, isPositive: true }}
        />
        <StatsCard
          title="Active Requests"
          value={12}
          icon={AlertTriangle}
          color="warning"
        />
        <StatsCard
          title="Equipment Items"
          value={156}
          icon={Wrench}
          color="primary"
        />
        <StatsCard
          title="Active Vendors"
          value={8}
          icon={Users}
          color="success"
        />
      </div>

      {/* Property Inventory */}
      <PropertyInventory />
    </div>
  );

  const renderVendorPortal = () => <VendorDashboard />;

  const renderPortalContent = () => {
    switch (currentPortal) {
      case "tenant":
        return renderTenantPortal();
      case "management":
        return renderManagementPortal();
      case "vendor":
        return renderVendorPortal();
      default:
        return renderManagementPortal();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPortal={currentPortal} onPortalSwitch={setCurrentPortal} />
      
      <main className="container mx-auto px-6 py-8">
        {renderPortalContent()}
      </main>
    </div>
  );
};

export default Index;
