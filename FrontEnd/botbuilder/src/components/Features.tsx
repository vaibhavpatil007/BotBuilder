import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Building2, Zap, Shield, Puzzle, BarChart3 } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Bot,
      title: "Custom AI Assistants",
      description: "Create specialized AI agents tailored to your business needs with advanced natural language processing."
    },
    {
      icon: Building2,
      title: "Multi-Tenant Architecture",
      description: "Serve multiple clients with isolated, secure environments while maintaining efficiency and scalability."
    },
    {
      icon: Zap,
      title: "Easy Integration",
      description: "Deploy your AI agents anywhere with our simple APIs, SDKs, and pre-built integration options."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption, compliance standards, and data protection."
    },
    {
      icon: Puzzle,
      title: "No-Code Builder",
      description: "Design and deploy AI assistants without coding using our intuitive drag-and-drop interface."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track performance, user engagement, and ROI with comprehensive analytics and reporting."
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Powerful Features for{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Modern Businesses
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to build, deploy, and manage AI assistants that transform how your business operates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;