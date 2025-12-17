import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  ExternalLink,
  ArrowLeft
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const AgentDashboard = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("conversations");
  const [agent, setAgent] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState({
    conversations: 0,
    avgRating: 0,
    responseTime: "-",
    topQuestions: [],
    satisfactionRating: 0,
    resolutionRate: 0
  });
  const [selectedConversation, setSelectedConversation] = useState<any>(null);

  useEffect(() => {
    if (!agentId) return;

    // Fetch Agent Details
    fetch(`http://127.0.0.1:8000/api/agents/${agentId}/`)
      .then(res => res.json())
      .then(data => setAgent(data));

    // Fetch Analytics (Mock endpoint in backend for now)
    // Fetch Analytics (Mock endpoint in backend for now)
    fetch(`http://127.0.0.1:8000/api/agents/${agentId}/analytics/`)
      .then(res => res.json())
      .then(data => setAnalytics(prev => ({ ...prev, ...data })));

    // Fetch Conversations
    fetch(`http://127.0.0.1:8000/api/conversations/?agent_id=${agentId}`)
      .then(res => res.json())
      .then(data => setConversations(data));

    // Fetch Knowledge Base
    fetch(`http://127.0.0.1:8000/api/knowledge/?agent_id=${agentId}`)
      .then(res => res.json())
      .then(data => setKnowledgeBase(data));

  }, [agentId]);

  if (!agent) return <div className="p-8 text-center">Loading agent...</div>;


  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{agent.name}</h1>
                <p className="text-sm text-muted-foreground">{agent.role_type} Assistant</p>
              </div>
            </div>
            <Button
              variant={agent.status === 'Active' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => {
                const newStatus = agent.status === 'Active' ? 'Inactive' : 'Active';
                fetch(`http://127.0.0.1:8000/api/agents/${agentId}/`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ status: newStatus })
                })
                  .then(res => res.json())
                  .then(updated => setAgent(updated));
              }}
            >
              {agent.status}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigate(`/chat/${agent.id}`)}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Preview Chat
            </Button>
            <Button variant="outline" size="sm" onClick={() => setActiveTab("settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </header >

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
              <div className="text-2xl font-bold">{analytics.conversations}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.avgRating}/5</div>
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
                        <p className="font-medium">{conversation.user_identifier}</p>
                        <p className="text-sm text-muted-foreground">
                          {conversation.status}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(conversation.created_at).toLocaleString()}
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

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedConversation(conversation)}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <Dialog open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Conversation with {selectedConversation?.user_identifier}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {selectedConversation?.messages && selectedConversation.messages.map((msg: any) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                        }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {(!selectedConversation?.messages || selectedConversation.messages.length === 0) && (
                  <p className="text-center text-muted-foreground py-8">No messages in this conversation.</p>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <TabsContent value="knowledge">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Knowledge Base</CardTitle>
                  <CardDescription>
                    Manage documents and FAQs that power your AI agent
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    id="kb-upload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const formData = new FormData();
                      formData.append('agent', agentId || '');
                      formData.append('type', 'document');
                      formData.append('file', file);

                      fetch('http://127.0.0.1:8000/api/knowledge/', {
                        method: 'POST',
                        body: formData,
                      })
                        .then(res => {
                          if (res.ok) return res.json();
                          throw new Error('Upload failed');
                        })
                        .then(newDoc => {
                          setKnowledgeBase(prev => [newDoc, ...prev]);
                          alert("Document uploaded successfully!");
                        })
                        .catch(err => alert("Error uploading document"));
                    }}
                  />
                  <Button onClick={() => document.getElementById('kb-upload')?.click()}>
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
                          <p className="font-medium">{item.type === 'document' ? item.file_name : item.question}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.type === 'document' ?
                              `Document • Added ${new Date(item.uploaded_at).toLocaleDateString()}` :
                              `FAQ • Added ${new Date(item.uploaded_at).toLocaleDateString()}`
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
                    {(analytics.topQuestions || []).map((item: any, index: number) => (
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
                  <CardTitle>Embed Widget</CardTitle>
                  <CardDescription>
                    Use this code to add the chat widget to your website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg relative group">
                      <pre className="text-xs overflow-x-auto whitespace-pre-wrap font-mono text-muted-foreground p-2">
                        {`<script 
  src="${window.location.origin}/widget.js" 
  data-agent-id="${agent?.id}"
></script>`}
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          const code = `<script src="${window.location.origin}/widget.js" data-agent-id="${agent?.id}"></script>`;
                          navigator.clipboard.writeText(code);
                          alert("Copied to clipboard!");
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Subdomain URL</h4>
                      <div className="flex items-center space-x-2">
                        <Input
                          value={`${window.location.origin}/BotBuilder/chat/${agent?.id}`}
                          readOnly
                          className="bg-muted"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/BotBuilder/chat/${agent?.id}`);
                            alert("Copied!");
                          }}
                        >
                          <Copy className="h-4 w-4" />
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
    </div >
  );
};

export default AgentDashboard;
