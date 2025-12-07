
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Bot, BarChart3, Settings, Bell } from "lucide-react";
import CreateAgentWizard from "@/components/CreateAgentWizard";

const Dashboard = () => {
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  
  // Mock data for demonstration
  const mockAgents = [
    {
      id: 1,
      name: "HR Buddy",
      role: "HR",
      status: "Active",
      conversations: 42,
      lastUsed: "2 hours ago"
    },
    {
      id: 2,
      name: "IT Support Bot",
      role: "IT Support",
      status: "Active",
      conversations: 128,
      lastUsed: "15 minutes ago"
    }
  ];

  const stats = {
    requestsUsed: 1250,
    requestsLimit: 5000,
    plan: "Pro Plan"
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
              <span className="text-xl font-bold text-foreground">AgentFlow</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-gradient-accent rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome, Vaibhav 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Ready to create your AI Agent?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Requests Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.requestsUsed.toLocaleString()} / {stats.requestsLimit.toLocaleString()}
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(stats.requestsUsed / stats.requestsLimit) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAgents.length}</div>
              <p className="text-sm text-muted-foreground">All systems running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.plan}</div>
              <Badge variant="secondary" className="mt-1">Active</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Create Agent CTA */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Create Your Next AI Agent</h3>
                <p className="text-muted-foreground">
                  Set up a new AI agent in minutes with our step-by-step wizard
                </p>
              </div>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => setShowCreateWizard(true)}
                className="ml-4"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create New Agent
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Agents List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Your AI Agents
            </CardTitle>
            <CardDescription>
              Manage and monitor your AI agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockAgents.length === 0 ? (
              <div className="text-center py-8">
                <Bot className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No agents yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first AI agent to get started
                </p>
                <Button onClick={() => setShowCreateWizard(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Agent
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {mockAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                        <Bot className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{agent.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {agent.role} • {agent.conversations} conversations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary">{agent.status}</Badge>
                      <p className="text-sm text-muted-foreground">
                        Last used {agent.lastUsed}
                      </p>
                      <Button variant="ghost" size="icon">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Agent Wizard Modal */}
      {showCreateWizard && (
        <CreateAgentWizard onClose={() => setShowCreateWizard(false)} />
      )}
    </div>
  );
};

export default Dashboard;
