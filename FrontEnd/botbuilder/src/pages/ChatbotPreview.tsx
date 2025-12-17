
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, ThumbsUp, ThumbsDown, Bot, User } from "lucide-react";

const TypewriterEffect = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) clearInterval(interval);
    }, 15); // Adjust speed here
    return () => clearInterval(interval);
  }, [text]);

  return <p className="text-sm whitespace-pre-wrap">{displayedText}</p>;
};

const ChatbotPreview = () => {
  const { agentId } = useParams();
  const [message, setMessage] = useState("");
  const [agent, setAgent] = useState<any>(null);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
      rating: null
    }
  ]);



  useEffect(() => {
    if (agentId) {
      fetch(`http://127.0.0.1:8000/api/agents/${agentId}/`)
        .then(res => res.json())
        .then(data => setAgent(data));
    }
  }, [agentId]);

  const sendMessage = async () => {
    if (!message.trim() || !agentId) return;

    const currentMessage = message;
    setMessage("");

    const userMessage = {
      id: Date.now(),
      type: "user" as const,
      content: currentMessage,
      timestamp: new Date(),
      rating: null
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/chat/${agentId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: currentMessage,
          conversation_id: conversationId,
          user_identifier: "visitor" // or from auth
        })
      });

      const data = await res.json();
      setIsTyping(false);

      if (data.conversation_id) {
        setConversationId(data.conversation_id);
      }

      const botResponse = {
        id: Date.now() + 1,
        type: "bot" as const,
        content: data.message || "Sorry, I encountered an error.",
        timestamp: new Date(),
        rating: null
      };

      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  const rateMessage = (messageId: number, rating: 'positive' | 'negative') => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, rating } : msg
      )
    );
  };

  if (!agent) return <div className="p-8 text-center bg-gradient-subtle min-h-screen">Loading preview...</div>;

  const isWidget = new URLSearchParams(window.location.search).get("widget") === "true";

  if (isWidget) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <div className="flex items-center p-3 border-b bg-primary text-primary-foreground">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm">{agent.name}</h1>
            <p className="text-xs opacity-90">Online</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'user'
                  ? 'bg-primary'
                  : 'bg-muted'
                  }`}>
                  {msg.type === 'user' ? (
                    <User className="h-3 w-3 text-primary-foreground" />
                  ) : (
                    <Bot className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className={`p-2.5 rounded-lg text-sm ${msg.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                    }`}>
                    {msg.type === 'bot' && msg.id === messages[messages.length - 1].id && Date.now() - msg.timestamp.getTime() < 30000 ? (
                      <TypewriterEffect text={msg.content} />
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[85%]">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-muted shrink-0">
                  <Bot className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
              className="flex-1 h-9 text-sm"
            />
            <Button onClick={sendMessage} disabled={!message.trim()} size="sm" className="h-9 w-9 p-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 text-center">
            <p className="text-[10px] text-muted-foreground">Powered by BotBuilder</p>
          </div>
        </div>
      </div>
    );
  }

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
                <p className="text-sm text-muted-foreground">{agent.subdomain}</p>
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
                  <div className={`flex items-start space-x-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.type === 'user'
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
                      <div className={`p-3 rounded-lg ${msg.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                        }`}>
                        {msg.type === 'bot' && msg.id === messages[messages.length - 1].id && Date.now() - msg.timestamp.getTime() < 30000 ? (
                          <TypewriterEffect text={msg.content} />
                        ) : (
                          <p className="text-sm">{msg.content}</p>
                        )}
                      </div>

                      {msg.type === 'bot' && (
                        <div className="flex items-center space-x-2 px-1">
                          <span className="text-xs text-muted-foreground">
                            Was this helpful?
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-6 w-6 p-0 ${msg.rating === 'positive' ? 'text-green-600' : ''
                              }`}
                            onClick={() => rateMessage(msg.id, 'positive')}
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-6 w-6 p-0 ${msg.rating === 'negative' ? 'text-red-600' : ''
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

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-accent">
                      <Bot className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
