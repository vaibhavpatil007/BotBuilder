
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  MessageSquare, 
  BookOpen, 
  Settings, 
  BarChart3, 
  Globe, 
  Upload,
  Trash2,
  Edit,
  Copy,
  ExternalLink
} from "lucide-react";

const AgentDashboard = () => {
  const { agentId } = useParams();
  const [activeTab, setActiveTab] = useState("conversations");

  // Mock data
  const agent = {
    id: agentId,
    name: "HR Buddy",
    role: "HR",
    status: "Active",
    subdomain: "hrbuddy.agentflow.com",
    conversations: 128,
    totalQuestions: 450,
    avgRating: 4.7
  };

  const conversations = [
    {
      id: 1,
      user: "john.doe@company.com",
      lastMessage: "Thanks for helping with the leave policy!",
      timestamp: "2 hours ago",
      rating: 5,
      status: "resolved"
    },
    {
      id: 2,
      user: "jane.smith@company.com", 
      lastMessage: "Can you help me with benefits enrollment?",
      timestamp: "4 hours ago",
      rating: null,
      status: "active"
    }
  ];

  const knowledgeBase = [
    { id: 1, name: "Employee Handbook.pdf", type: "document", size: "2.4 MB", uploaded: "2 days ago" },
    { id: 2, name: "Leave Policy FAQ", type: "faq", questions: 12, uploaded: "1 week ago" },
    { id: 3, name: "Benefits Overview.docx", type: "document", size: "1.8 MB", uploaded: "3 days ago" }
  ];

  const analytics = {
    topQuestions: [
      { question: "What is the leave policy?", count: 45 },
      { question: "How do I enroll in benefits?", count: 32 },
      { question: "What are the working hours?", count: 28 }
    ],
    satisfactionRating: 4.7,
    responseTime: "2.3s",
    resolutionRate: 89
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{agent.name}</h1>
                <p className="text-sm text-muted-foreground">{agent.role} Assistant</p>
              </div>
              <Badge variant="secondary">{agent.status}</Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Conversations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agent.conversations}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Questions Answered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agent.totalQuestions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agent.avgRating}/5</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Response Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.responseTime}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="conversations">
              <MessageSquare className="mr-2 h-4 w-4" />
              Conversations
            </TabsTrigger>
            <TabsTrigger value="knowledge">
              <BookOpen className="mr-2 h-4 w-4" />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Widget Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="conversations">
            <Card>
              <CardHeader>
                <CardTitle>Recent Conversations</CardTitle>
                <CardDescription>
                  View and manage chat logs from your AI agent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{conversation.user}</p>
                        <p className="text-sm text-muted-foreground">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={conversation.status === 'resolved' ? 'secondary' : 'default'}>
                          {conversation.status}
                        </Badge>
                        {conversation.rating && (
                          <Badge variant="outline">
                            ⭐ {conversation.rating}
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Knowledge Base</CardTitle>
                    <CardDescription>
                      Manage documents and FAQs that power your AI agent
                    </CardDescription>
                  </div>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Content
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {knowledgeBase.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded flex items-center justify-center">
                          {item.type === 'document' ? (
                            <BookOpen className="h-4 w-4 text-primary-foreground" />
                          ) : (
                            <MessageSquare className="h-4 w-4 text-primary-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.type === 'document' ? 
                              `${item.size} • Uploaded ${item.uploaded}` :
                              `${item.questions} questions • Added ${item.uploaded}`
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Questions</CardTitle>
                  <CardDescription>
                    Most frequently asked questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.topQuestions.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <p className="text-sm">{item.question}</p>
                        <Badge variant="outline">{item.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>
                    Key performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Satisfaction Rating</span>
                      <span className="font-semibold">{analytics.satisfactionRating}/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Avg Response Time</span>
                      <span className="font-semibold">{analytics.responseTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Resolution Rate</span>
                      <span className="font-semibold">{analytics.resolutionRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Widget Appearance</CardTitle>
                  <CardDescription>
                    Customize how your chatbot looks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Primary Color</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-8 h-8 bg-primary rounded border"></div>
                        <span className="text-sm text-muted-foreground">#3b82f6</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Position</label>
                      <p className="text-sm text-muted-foreground mt-1">Bottom Right</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subdomain Settings</CardTitle>
                  <CardDescription>
                    Manage your hosted agent page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Subdomain URL</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {agent.subdomain}
                        </p>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentDashboard;
