import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md mx-4 text-center">
        <AlertCircle className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">404</h1>
        <p className="text-muted-foreground mb-6">
          This page doesn't exist. Let us guide you back.
        </p>
        <Link href="/">
          <Button className="bg-primary text-primary-foreground">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
