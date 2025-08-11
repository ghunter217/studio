import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";

interface SignUpModalProps {
  children: React.ReactNode;
}

const SignUpModal = ({ children }: SignUpModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-secondary border-primary shadow-2xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">Get Started Now</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Create your account to start your free trial.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button type="submit" size="lg" className="w-full shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1 transition-all duration-300">
            <Download className="mr-2 h-5 w-5" />
            Download & Start Trial
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
