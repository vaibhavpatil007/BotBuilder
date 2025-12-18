import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import botLogo from "../assets/BOT_logo_removebg.png";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border/50 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={botLogo} alt="BotBuilder Logo" className="w-12 h-12 rounded-lg object-contain" />
            <span className="text-xl font-bold text-foreground">BotBuilder</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-accent transition-colors">Features</a>
            <a href="#use-cases" className="text-foreground hover:text-accent transition-colors">Use Cases</a>
            <a href="#pricing" className="text-foreground hover:text-accent transition-colors">Pricing</a>
            <a href="#contact" className="text-foreground hover:text-accent transition-colors">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/get-started">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;