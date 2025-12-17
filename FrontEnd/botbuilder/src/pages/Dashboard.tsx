import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Bot, BarChart3, Settings, Bell, Trash2, LogOut } from "lucide-react";
import CreateAgentWizard from "@/components/CreateAgentWizard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import botLogo from "../assets/BOT_logo.png";

const Dashboard = () => {
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [stats, setStats] = useState({
    requestsUsed: 0,
    requestsLimit: 0,
    plan: "Free",
    active_agents: 0,
    total_agents: 0
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Fetch Stats
    fetch(`http://127.0.0.1:8000/api/dashboard/${parsedUser.id}/`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching stats:", err));

    // Fetch Agents
    fetch(`http://127.0.0.1:8000/api/agents/?user_id=${parsedUser.id}`)
      .then(res => res.json())
      .then(data => setAgents(data))
      .catch(err => console.error("Error fetching agents:", err));

    // Fetch Notifications
    fetch(`http://127.0.0.1:8000/api/notifications/`)
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(err => console.error("Error fetching notifications:", err));

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Use API data or fallback for display
  const displayAgents = agents;


  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={botLogo} alt="BotBuilder Logo" className="w-12 h-12 rounded-lg object-contain" />
              <span className="text-xl font-bold text-foreground">BotBuilder</span>
            </div>

            <div className="flex items-center space-x-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.some(n => !n.read) && (
                      <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Stay updated with your agent activity.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      {notifications.length === 0 ? (
                        <div className="text-sm text-center py-4 text-muted-foreground">No new notifications</div>
                      ) : (
                        notifications.map((n) => (
                          <div key={n.id} className={`p-2 rounded hover:bg-muted/50 cursor-pointer border-b last:border-0 ${!n.read ? 'bg-muted/30' : ''}`}>
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-medium">{n.title}</p>
                              <span className="text-[10px] text-muted-foreground">{new Date(n.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="ghost" size="icon" onClick={() => navigate('/settings')} title="Settings">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut className="h-5 w-5 text-red-500" />
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
                  style={{ width: `${(stats.requestsUsed / (stats.requestsLimit || 1)) * 100}%` }}
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
              <div className="text-2xl font-bold">{stats.active_agents} / {stats.total_agents}</div>
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
            {displayAgents.length === 0 ? (
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
                {displayAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className="flex items-center space-x-4 cursor-pointer"
                      onClick={() => window.open(`/BotBuilder/chat/${agent.id}`, '_blank')}
                    >
                      <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                        <Bot className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold hover:text-primary transition-colors">{agent.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {agent.role_type} • {agent.tone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary">{agent.status}</Badge>
                      <p className="text-sm text-muted-foreground">
                        Last used today
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/agent/${agent.id}`)}
                        title="Agent Settings"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this agent?")) {
                            fetch(`http://127.0.0.1:8000/api/agents/${agent.id}/`, {
                              method: 'DELETE',
                            })
                              .then(res => {
                                if (res.ok) {
                                  setAgents(prev => prev.filter(a => a.id !== agent.id));
                                  // Also update stats
                                  setStats(prev => ({
                                    ...prev,
                                    total_agents: prev.total_agents - 1,
                                    active_agents: agent.status === 'Active' ? prev.active_agents - 1 : prev.active_agents
                                  }));
                                }
                              })
                              .catch(err => console.error("Error deleting agent:", err));
                          }
                        }}
                        title="Delete Agent"
                      >
                        <Trash2 className="h-4 w-4" />
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
