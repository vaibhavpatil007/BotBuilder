
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, ThumbsUp, ThumbsDown, Bot, User } from "lucide-react";

const ChatbotPreview = () => {
  const { agentId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm HR Buddy, your AI assistant. How can I help you today?",
      timestamp: new Date(),
      rating: null
    }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: message,
      timestamp: new Date(),
      rating: null
    };

    const botResponse = {
      id: messages.length + 2,
      type: "bot" as const,
      content: "Thanks for your question! I'm a demo version, so I can't provide real responses yet. In the full version, I would analyze your question using the knowledge base and provide a helpful answer.",
      timestamp: new Date(),
      rating: null
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setMessage("");
  };

  const rateMessage = (messageId: number, rating: 'positive' | 'negative') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, rating } : msg
      )
    );
  };

  // Mock agent data
  const agent = {
    name: "HR Buddy",
    company: "SANS Systems",
    logo: null,
    avatar: null,
    subdomain: "hrbuddy.agentflow.com"
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header with branding */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{agent.name}</h1>
                <p className="text-sm text-muted-foreground">{agent.company}</p>
              </div>
            </div>
            <Badge variant="secondary">Live Demo</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Chat with {agent.name}</h2>
          <p className="text-muted-foreground">
            This is a live preview of your AI agent. Test it out and see how it responds!
          </p>
        </div>

        <Card className="mx-auto max-w-2xl">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center">
              <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center mr-3">
                <Bot className="h-4 w-4 text-accent-foreground" />
              </div>
              {agent.name}
              <Badge variant="outline" className="ml-2">Online</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.type === 'user' 
                        ? 'bg-gradient-primary' 
                        : 'bg-gradient-accent'
                    }`}>
                      {msg.type === 'user' ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Bot className="h-4 w-4 text-accent-foreground" />
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <div className={`p-3 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      
                      {msg.type === 'bot' && (
                        <div className="flex items-center space-x-2 px-1">
                          <span className="text-xs text-muted-foreground">
                            Was this helpful?
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-6 w-6 p-0 ${
                              msg.rating === 'positive' ? 'text-green-600' : ''
                            }`}
                            onClick={() => rateMessage(msg.id, 'positive')}
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-6 w-6 p-0 ${
                              msg.rating === 'negative' ? 'text-red-600' : ''
                            }`}
                            onClick={() => rateMessage(msg.id, 'negative')}
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Integration Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><strong>Subdomain:</strong> {agent.subdomain}</p>
                <p><strong>Widget:</strong> Embed on your website</p>
                <p><strong>API:</strong> Custom integrations available</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Rate responses with 👍 or 👎 to help improve the AI agent's performance.
                All feedback is collected for analysis.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPreview;
