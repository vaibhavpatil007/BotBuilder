import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Headphones, FileText, Calendar, ArrowRight } from "lucide-react";

const UseCases = () => {
  const useCases = [
    {
      icon: Users,
      title: "HR Assistant",
      description: "Automate employee onboarding, answer policy questions, and streamline HR processes.",
      benefits: ["24/7 employee support", "Automated onboarding", "Policy compliance"],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Provide instant customer support with intelligent ticket routing and resolution.",
      benefits: ["Instant responses", "Ticket escalation", "Multi-language support"],
      color: "from-green-500 to-teal-600"
    },
    {
      icon: FileText,
      title: "Admin Assistant",
      description: "Handle administrative tasks, document management, and workflow automation.",
      benefits: ["Document processing", "Task automation", "Workflow optimization"],
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Calendar,
      title: "Sales Assistant",
      description: "Qualify leads, schedule meetings, and support your sales team's productivity.",
      benefits: ["Lead qualification", "Meeting scheduling", "CRM integration"],
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section id="use-cases" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transform Every{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Department
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deploy specialized AI assistants across your organization to automate workflows and enhance productivity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 overflow-hidden group">
              <CardHeader className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${useCase.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${useCase.color} rounded-lg flex items-center justify-center`}>
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-foreground mb-2">{useCase.title}</CardTitle>
                    <p className="text-muted-foreground mb-4">{useCase.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2 mb-6">
                  {useCase.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="text-accent hover:text-accent group/btn">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;