
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, X, ArrowLeft, ArrowRight, Sparkles, Bot } from "lucide-react";

interface CreateAgentWizardProps {
  onClose: () => void;
}

const CreateAgentWizard = ({ onClose }: CreateAgentWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    roleType: "general",
    tone: "friendly",
    documents: [] as File[],
    faqs: [{ question: "", answer: "" }],
    companyName: "",
    companyLogo: null as File | null,
    integrationType: "subdomain",
    subdomain: "",
    avatar: null as File | null
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (files: FileList | null, type: 'documents' | 'logo' | 'avatar') => {
    if (!files) return;
    
    if (type === 'documents') {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(files)]
      }));
    } else if (type === 'logo') {
      setFormData(prev => ({ ...prev, companyLogo: files[0] }));
    } else if (type === 'avatar') {
      setFormData(prev => ({ ...prev, avatar: files[0] }));
    }
  };

  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }]
    }));
  };

  const removeFAQ = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => 
        i === index ? { ...faq, [field]: value } : faq
      )
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="agentName">Agent Name</Label>
              <Input
                id="agentName"
                placeholder="e.g., HR Buddy"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <Label>Role Type</Label>
              <RadioGroup
                value={formData.roleType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, roleType: value }))}
                className="mt-2"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "hr", label: "HR Assistant" },
                    { value: "it", label: "IT Support" },
                    { value: "general", label: "General Assistant" },
                    { value: "custom", label: "Custom" }
                  ].map((role) => (
                    <Label key={role.value} className="flex items-center space-x-2 cursor-pointer">
                      <RadioGroupItem value={role.value} />
                      <span>{role.label}</span>
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Agent Tone</Label>
              <RadioGroup
                value={formData.tone}
                onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}
                className="mt-2"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "friendly", label: "Friendly" },
                    { value: "formal", label: "Formal" },
                    { value: "playful", label: "Playful" },
                    { value: "custom", label: "Custom" }
                  ].map((tone) => (
                    <Label key={tone.value} className="flex items-center space-x-2 cursor-pointer">
                      <RadioGroupItem value={tone.value} />
                      <span>{tone.label}</span>
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label>Upload Documents</Label>
              <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports PDF, DOCX, TXT files
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => handleFileUpload(e.target.files, 'documents')}
                  className="hidden"
                  id="documents"
                />
                <Label htmlFor="documents" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span>Choose Files</span>
                  </Button>
                </Label>
              </div>
              
              {formData.documents.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.documents.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          documents: prev.documents.filter((_, i) => i !== index)
                        }))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label>Custom FAQs</Label>
                <Button variant="outline" size="sm" onClick={addFAQ}>
                  Add FAQ
                </Button>
              </div>
              <div className="mt-2 space-y-4">
                {formData.faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Label className="text-sm">FAQ #{index + 1}</Label>
                        {formData.faqs.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFAQ(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Input
                          placeholder="Question"
                          value={faq.question}
                          onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                        />
                        <Textarea
                          placeholder="Answer"
                          value={faq.answer}
                          onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Your Company"
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              />
            </div>

            <div>
              <Label>Company Logo</Label>
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files, 'logo')}
                  className="hidden"
                  id="logo"
                />
                <Label htmlFor="logo" className="cursor-pointer">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {formData.companyLogo ? formData.companyLogo.name : "Upload company logo"}
                    </p>
                  </div>
                </Label>
              </div>
            </div>

            <div>
              <Label>Integration Type</Label>
              <RadioGroup
                value={formData.integrationType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, integrationType: value }))}
                className="mt-2"
              >
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <RadioGroupItem value="subdomain" />
                  <span>Hosted Subdomain</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <RadioGroupItem value="widget" />
                  <span>Embed Widget</span>
                </Label>
              </RadioGroup>
            </div>

            {formData.integrationType === 'subdomain' && (
              <div>
                <Label htmlFor="subdomain">Subdomain</Label>
                <div className="flex mt-2">
                  <Input
                    id="subdomain"
                    placeholder="hrbot"
                    value={formData.subdomain}
                    onChange={(e) => setFormData(prev => ({ ...prev, subdomain: e.target.value }))}
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-2 bg-muted border border-l-0 rounded-r-md text-sm text-muted-foreground">
                    .agentflow.com
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label>Agent Avatar (Optional)</Label>
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files, 'avatar')}
                  className="hidden"
                  id="avatar"
                />
                <Label htmlFor="avatar" className="cursor-pointer">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <Bot className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {formData.avatar ? formData.avatar.name : "Upload agent avatar"}
                    </p>
                  </div>
                </Label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Preview & Deploy</h3>
              <p className="text-muted-foreground">
                Your agent is ready! Test it out before deploying.
              </p>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Agent Name:</span>
                    <span className="text-sm font-medium">{formData.name || "Untitled Agent"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Role:</span>
                    <Badge variant="secondary">{formData.roleType}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tone:</span>
                    <span className="text-sm font-medium capitalize">{formData.tone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Documents:</span>
                    <span className="text-sm font-medium">{formData.documents.length} files</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Company:</span>
                    <span className="text-sm font-medium">{formData.companyName || "Not set"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted/50 rounded-lg p-4 min-h-[200px] border-2 border-dashed border-muted-foreground/25">
              <div className="text-center text-muted-foreground">
                <Bot className="mx-auto h-8 w-8 mb-2" />
                <p className="text-sm">Live chat preview would appear here</p>
                <p className="text-xs mt-1">Test your agent before deployment</p>
              </div>
            </div>

            {formData.integrationType === 'widget' && (
              <Card>
                <CardContent className="p-4">
                  <Label className="text-sm font-medium">Embed Code</Label>
                  <div className="mt-2 p-3 bg-muted rounded text-sm font-mono text-muted-foreground">
                    {'<script src="https://agentflow.com/widget.js" data-agent="' + (formData.name || 'agent') + '"></script>'}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5" />
            Create New AI Agent
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {['Agent Basics', 'Knowledge Base', 'Branding & Integration', 'Preview & Deploy'][currentStep - 1]}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-6">
          {renderStepContent()}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="space-x-2">
            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <div className="space-x-2">
                <Button variant="outline">Test Agent</Button>
                <Button variant="hero" onClick={onClose}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Save & Deploy
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAgentWizard;
