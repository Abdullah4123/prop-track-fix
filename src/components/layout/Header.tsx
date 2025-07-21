import { Bell, User, Settings, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  currentPortal: "tenant" | "management" | "vendor";
  onPortalSwitch: (portal: "tenant" | "management" | "vendor") => void;
}

const Header = ({ currentPortal, onPortalSwitch }: HeaderProps) => {
  const getPortalTitle = () => {
    switch (currentPortal) {
      case "tenant":
        return "Tenant Portal";
      case "management":
        return "Management Dashboard";
      case "vendor":
        return "Vendor Portal";
      default:
        return "Property Management";
    }
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Building2 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-foreground">PropertyCare</h1>
            <p className="text-sm text-muted-foreground">{getPortalTitle()}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Portal Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Switch Portal
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              <DropdownMenuLabel>Available Portals</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onPortalSwitch("tenant")}>
                Tenant Portal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPortalSwitch("management")}>
                Management Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPortalSwitch("vendor")}>
                Vendor Portal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;