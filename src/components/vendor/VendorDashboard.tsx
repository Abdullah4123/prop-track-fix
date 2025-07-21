import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, MapPin, Camera, DollarSign, Phone } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";

interface ServiceRequest {
  id: string;
  propertyAddress: string;
  equipmentType: string;
  priority: "low" | "medium" | "high" | "emergency";
  status: "assigned" | "in-progress" | "completed" | "rejected";
  description: string;
  submittedDate: string;
  tenantContact: string;
  estimatedCost?: number;
  images: string[];
}

const VendorDashboard = () => {
  // Mock data
  const requests: ServiceRequest[] = [
    {
      id: "req-001",
      propertyAddress: "123 Main St, Apt 4B",
      equipmentType: "Air Conditioning Unit",
      priority: "high",
      status: "assigned",
      description: "AC unit not cooling properly, making strange noises",
      submittedDate: "2024-01-15",
      tenantContact: "(555) 123-4567",
      images: []
    },
    {
      id: "req-002", 
      propertyAddress: "456 Oak Ave, Unit 2A",
      equipmentType: "Refrigerator",
      priority: "medium",
      status: "in-progress",
      description: "Refrigerator not maintaining temperature",
      submittedDate: "2024-01-14",
      tenantContact: "(555) 987-6543",
      estimatedCost: 250,
      images: []
    }
  ];

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: "bg-muted/50 text-muted-foreground",
      medium: "bg-warning/10 text-warning border-warning/20",
      high: "bg-destructive/10 text-destructive border-destructive/20", 
      emergency: "bg-destructive text-destructive-foreground animate-pulse"
    };
    return variants[priority as keyof typeof variants] || variants.medium;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      assigned: "bg-pending/10 text-pending border-pending/20",
      "in-progress": "bg-warning/10 text-warning border-warning/20",
      completed: "bg-success/10 text-success border-success/20",
      rejected: "bg-muted/50 text-muted-foreground"
    };
    return variants[status as keyof typeof variants] || variants.assigned;
  };

  const handleAcceptRequest = (requestId: string) => {
    console.log("Accepting request:", requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    console.log("Rejecting request:", requestId);
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Pending Requests"
          value={3}
          icon={Clock}
          color="pending"
        />
        <StatsCard
          title="In Progress"
          value={2}
          icon={Clock}
          color="warning"
        />
        <StatsCard
          title="Completed This Month"
          value={15}
          icon={CheckCircle}
          color="success"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Earnings"
          value="$3,450"
          icon={DollarSign}
          color="success"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Service Requests */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Service Requests</h2>
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {request.propertyAddress}
                    </CardTitle>
                    <p className="text-muted-foreground">{request.equipmentType}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getPriorityBadge(request.priority)}>
                      {request.priority}
                    </Badge>
                    <Badge className={getStatusBadge(request.status)}>
                      {request.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Description */}
                <div>
                  <h4 className="font-medium mb-2">Problem Description</h4>
                  <p className="text-sm text-muted-foreground">{request.description}</p>
                </div>

                {/* Request Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Submitted:</span>
                    <p className="font-medium">{new Date(request.submittedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Contact:</span>
                    <p className="font-medium flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {request.tenantContact}
                    </p>
                  </div>
                  {request.estimatedCost && (
                    <div>
                      <span className="text-muted-foreground">Estimated Cost:</span>
                      <p className="font-medium text-success">${request.estimatedCost}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {request.status === "assigned" && (
                    <>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        Accept Request
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        Decline
                      </Button>
                    </>
                  )}
                  {request.status === "in-progress" && (
                    <>
                      <Button variant="default" size="sm">
                        <Camera className="mr-1 h-3 w-3" />
                        Upload Progress
                      </Button>
                      <Button variant="outline" size="sm">
                        Update Status
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;