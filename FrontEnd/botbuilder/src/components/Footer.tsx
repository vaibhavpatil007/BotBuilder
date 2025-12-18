const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
              <span className="text-xl font-bold text-foreground">AgentFlow</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The leading multi-tenant AI agent platform for building custom AI assistants
              that transform how businesses operate.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                <span className="text-muted-foreground text-sm">𝕏</span>
              </div>
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                <span className="text-muted-foreground text-sm">in</span>
              </div>
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                <span className="text-muted-foreground text-sm">📧</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Integrations</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">API Docs</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">
            © 2024 AgentFlow. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;