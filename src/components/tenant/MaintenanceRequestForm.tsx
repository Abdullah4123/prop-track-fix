import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Camera, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MaintenanceRequestForm = () => {
  const [formData, setFormData] = useState({
    property: "",
    component: "",
    priority: "",
    description: "",
    images: [] as File[]
  });
  const { toast } = useToast();

  const components = [
    "Air Conditioning Unit",
    "Refrigerator", 
    "Dish Washer",
    "Light Fixtures",
    "Blind Door Openers",
    "Plumbing",
    "Electrical",
    "Other"
  ];

  const priorities = [
    { value: "low", label: "Low - Non-urgent", color: "text-muted-foreground" },
    { value: "medium", label: "Medium - Needs attention", color: "text-warning" },
    { value: "high", label: "High - Important", color: "text-destructive" },
    { value: "emergency", label: "Emergency - Urgent!", color: "text-destructive font-bold" }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5) // Max 5 images
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.component || !formData.description || !formData.priority) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Request Submitted",
      description: "Your maintenance request has been submitted successfully. You'll receive updates via email.",
      variant: "default"
    });

    // Reset form
    setFormData({
      property: "",
      component: "",
      priority: "",
      description: "",
      images: []
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-warning" />
          Submit Maintenance Request
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Component Selection */}
          <div className="space-y-2">
            <Label htmlFor="component">Equipment/Component *</Label>
            <Select value={formData.component} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, component: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="What needs repair?" />
              </SelectTrigger>
              <SelectContent>
                {components.map((component) => (
                  <SelectItem key={component} value={component}>
                    {component}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority Selection */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level *</Label>
            <Select value={formData.priority} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, priority: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="How urgent is this?" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <span className={priority.color}>{priority.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Problem Description *</Label>
            <Textarea
              id="description"
              placeholder="Please describe the issue in detail..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Upload Photos/Videos (Optional)</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, MP4 up to 10MB each (max 5 files)
                  </p>
                </div>
              </label>
            </div>

            {/* Preview uploaded images */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-20 object-cover rounded border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Submit Maintenance Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MaintenanceRequestForm;