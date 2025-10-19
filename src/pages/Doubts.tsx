import { Navigation } from "@/components/Navigation";
import { MessageSquare, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Doubts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Doubt Clarification</h1>
          <p className="text-muted-foreground">Ask your teachers directly without sharing contact details</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-glow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                <CardTitle>Start a Conversation</CardTitle>
              </div>
              <CardDescription>Select a teacher and send your doubt securely</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Authentication required to access doubt clarification</p>
                <Button className="mt-4 gradient-primary">
                  <Send className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Doubts;
