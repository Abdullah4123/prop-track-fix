import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Wrench, Calendar, DollarSign, AlertTriangle } from "lucide-react";

// Equipment object structure:
// { id, name, type, age, lastService, nextService, condition, replacementCost, propertyId, propertyAddress }

const PropertyInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const equipment = [
    {
      id: "eq-001",
      name: "Central AC Unit",
      type: "Air Conditioning Unit",
      age: 7,
      lastService: "2024-06-15",
      nextService: "2024-12-15",
      condition: "good",
      replacementCost: 4500,
      propertyId: "prop-001",
      propertyAddress: "123 Main St, Apt 4B"
    },
    {
      id: "eq-002", 
      name: "Kitchen Refrigerator",
      type: "Refrigerator",
      age: 3,
      lastService: "2024-05-20",
      nextService: "2025-05-20",
      condition: "excellent",
      replacementCost: 1200,
      propertyId: "prop-001",
      propertyAddress: "123 Main St, Apt 4B"
    },
    {
      id: "eq-003",
      name: "Bathroom Light Fixture",
      type: "Light Fixtures",
      age: 12,
      lastService: "2023-03-10",
      nextService: "2024-09-10",
      condition: "poor",
      replacementCost: 150,
      propertyId: "prop-002",
      propertyAddress: "456 Oak Ave, Unit 2A"
    }
  ];

  const getConditionBadge = (condition) => {
    const variants = {
      excellent: "bg-success/10 text-success border-success/20",
      good: "bg-primary/10 text-primary border-primary/20", 
      fair: "bg-warning/10 text-warning border-warning/20",
      poor: "bg-destructive/10 text-destructive border-destructive/20",
      critical: "bg-destructive text-destructive-foreground"
    };
    return variants[condition] || variants.good;
  };

  const isServiceDue = (nextService) => {
    const today = new Date();
    const serviceDate = new Date(nextService);
    const daysDiff = Math.ceil((serviceDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysDiff <= 30;
  };

  const filteredEquipment = equipment.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Equipment Inventory</h2>
          <p className="text-muted-foreground">Track and manage property equipment</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search equipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEquipment.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{item.type}</p>
                </div>
                <Badge className={getConditionBadge(item.condition)}>
                  {item.condition}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Property Location */}
              <div className="text-sm">
                <p className="font-medium text-foreground">{item.propertyAddress}</p>
              </div>

              {/* Equipment Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{item.age} years old</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${item.replacementCost.toLocaleString()}</span>
                </div>
              </div>

              {/* Service Information */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Service:</span>
                  <span>{new Date(item.lastService).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Service:</span>
                  <span className={isServiceDue(item.nextService) ? "text-warning font-medium" : ""}>
                    {new Date(item.nextService).toLocaleDateString()}
                  </span>
                </div>
                {isServiceDue(item.nextService) && (
                  <div className="flex items-center gap-1 text-warning text-sm">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Service due soon</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Wrench className="mr-1 h-3 w-3" />
                  Service
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No equipment found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default PropertyInventory;