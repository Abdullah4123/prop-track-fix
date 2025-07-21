import { useState } from "react";
import { Home, MapPin, Bed, Bath, Car, Wind, Lightbulb, Thermometer, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PropertyWebsite = () => {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);

  const properties = [
    {
      id: 1,
      name: "Sunset Villa",
      location: "Austin, Texas",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
      rooms: 4,
      bathrooms: 3,
      garages: 2,
      equipment: {
        "Air Conditioning": 3,
        "Ceiling Fans": 8,
        "Light Fixtures": 12,
        "Heaters": 2,
        "Doors": 15,
        "Windows": 18,
        "Dishwasher": 1,
        "Refrigerator": 1
      },
      price: "$2,400/month"
    },
    {
      id: 2,
      name: "Modern Townhouse",
      location: "Dallas, Texas",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      rooms: 3,
      bathrooms: 2,
      garages: 1,
      equipment: {
        "Air Conditioning": 2,
        "Ceiling Fans": 6,
        "Light Fixtures": 10,
        "Heaters": 1,
        "Doors": 12,
        "Windows": 14,
        "Dishwasher": 1,
        "Refrigerator": 1
      },
      price: "$1,800/month"
    },
    {
      id: 3,
      name: "Family Estate",
      location: "Houston, Texas",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      rooms: 5,
      bathrooms: 4,
      garages: 3,
      equipment: {
        "Air Conditioning": 4,
        "Ceiling Fans": 12,
        "Light Fixtures": 20,
        "Heaters": 3,
        "Doors": 18,
        "Windows": 24,
        "Dishwasher": 2,
        "Refrigerator": 2
      },
      price: "$3,200/month"
    }
  ];

  const navigateToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Premium Property Management
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Comprehensive maintenance and inventory management for residential properties across Texas
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Explore Properties
          </Button>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Properties in Texas</h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <Card key={property.id} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-xl">{property.name}</CardTitle>
                    <Badge variant="secondary">{property.price}</Badge>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{property.location}</span>
                  </div>

                  {/* Property Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Bed className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm font-semibold">{property.rooms}</p>
                      <p className="text-xs text-muted-foreground">Rooms</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Bath className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm font-semibold">{property.bathrooms}</p>
                      <p className="text-xs text-muted-foreground">Bathrooms</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Car className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm font-semibold">{property.garages}</p>
                      <p className="text-xs text-muted-foreground">Garages</p>
                    </div>
                  </div>

                  {/* Equipment Overview */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Equipment Overview:</p>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {Object.entries(property.equipment).map(([item, count]) => (
                        <div key={item} className="flex justify-between">
                          <span className="text-muted-foreground">{item}:</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => setSelectedProperty(property.id)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Information Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Service Portals</h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* Tenant Portal */}
            <Card className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-4">Tenant Portal</CardTitle>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Report maintenance issues with photo/video proof</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Track request status in real-time</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Communicate directly with support team</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">View property equipment and maintenance history</p>
                </div>
              </div>
              
              <Button className="w-full mt-6" onClick={navigateToDashboard}>
                Access Tenant Portal
              </Button>
            </Card>

            {/* Vendor Portal */}
            <Card className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl mb-4">Vendor Portal</CardTitle>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Receive maintenance requests with detailed information</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Provide cost estimates for repairs vs replacements</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Upload completion proof and documentation</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Track performance metrics and ratings</p>
                </div>
              </div>
              
              <Button variant="secondary" className="w-full mt-6" onClick={navigateToDashboard}>
                Access Vendor Portal
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our comprehensive property management system today
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={navigateToDashboard}
          >
            Access Management Dashboard
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PropertyWebsite;