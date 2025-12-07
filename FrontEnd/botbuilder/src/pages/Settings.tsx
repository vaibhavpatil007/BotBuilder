
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon,
  Building, 
  Users, 
  CreditCard, 
  Key, 
  Save,
  Upload,
  Trash2
} from "lucide-react";

const Settings = () => {
  const [companyProfile, setCompanyProfile] = useState({
    name: "SANS Systems",
    website: "https://sanssystems.com",
    description: "Leading software development company",
    logo: null as File | null
  });

  const [billing] = useState({
    plan: "Pro Plan",
    status: "Active",
    nextBilling: "March 15, 2024",
    usage: {
      requests: 1250,
      limit: 5000
    }
  });

  const teamMembers = [
    { id: 1, name: "Vaibhav Singh", email: "vaibhav@sanssystems.com", role: "Owner", status: "Active" },
    { id: 2, name: "John Doe", email: "john@sanssystems.com", role: "Admin", status: "Active" },
    { id: 3, name: "Jane Smith", email: "jane@sanssystems.com", role: "Member", status: "Pending" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center">
            <SettingsIcon className="mr-3 h-6 w-6" />
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList>
            <TabsTrigger value="company">
              <Building className="mr-2 h-4 w-4" />
              Company
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="mr-2 h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="api">
              <Key className="mr-2 h-4 w-4" />
              API Keys
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>
                  Manage your company information and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyProfile.name}
                    onChange={(e) => setCompanyProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={companyProfile.website}
                    onChange={(e) => setCompanyProfile(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={companyProfile.description}
                    onChange={(e) => setCompanyProfile(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Company Logo</Label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Building className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div className="space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setCompanyProfile(prev => ({ ...prev, logo: e.target.files![0] }));
                          }
                        }}
                        className="hidden"
                        id="logo"
                      />
                      <Label htmlFor="logo" className="cursor-pointer">
                        <Button variant="outline" asChild>
                          <span>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Logo
                          </span>
                        </Button>
                      </Label>
                      {companyProfile.logo && (
                        <Button
                          variant="outline"
                          onClick={() => setCompanyProfile(prev => ({ ...prev, logo: null }))}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Management</CardTitle>
                    <CardDescription>
                      Manage user roles and access permissions
                    </CardDescription>
                  </div>
                  <Button>
                    <Users className="mr-2 h-4 w-4" />
                    Invite Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-accent-foreground">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{member.role}</Badge>
                        <Badge variant={member.status === 'Active' ? 'secondary' : 'outline'}>
                          {member.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>
                    Manage your subscription and usage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{billing.plan}</h3>
                        <p className="text-sm text-muted-foreground">
                          Next billing: {billing.nextBilling}
                        </p>
                      </div>
                      <Badge variant="secondary">{billing.status}</Badge>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>API Requests</span>
                        <span>{billing.usage.requests.toLocaleString()} / {billing.usage.limit.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(billing.usage.requests / billing.usage.limit) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-renewal</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically renew your subscription
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Usage alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when approaching limits
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline">View Invoices</Button>
                    <Button variant="outline">Update Payment Method</Button>
                    <Button>Upgrade Plan</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Manage API keys for custom integrations
                    </CardDescription>
                  </div>
                  <Button>
                    <Key className="mr-2 h-4 w-4" />
                    Generate New Key
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Production API Key</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          sk_prod_••••••••••••••••••••••••••••3f2a
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Created on Jan 15, 2024 • Last used 2 hours ago
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Development API Key</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          sk_dev_••••••••••••••••••••••••••••8b1c
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Created on Jan 10, 2024 • Last used yesterday
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Usage Guidelines</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Keep your API keys secure and never expose them in client-side code</li>
                      <li>• Use different keys for development and production environments</li>
                      <li>• Rotate keys regularly for enhanced security</li>
                      <li>• Monitor API usage through the dashboard</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
