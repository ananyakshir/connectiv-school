import { Navigation } from "@/components/Navigation";
import { Brain, Sparkles, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Quiz = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Quiz & Flashcard Corner</h1>
          <p className="text-muted-foreground">Practice and test your knowledge on any topic</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="shadow-glow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-accent" />
                <CardTitle>AI-Powered Quizzes</CardTitle>
              </div>
              <CardDescription>Enter any topic and get instant quizzes generated for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Enter a topic (e.g., Newton's Laws, Julius Caesar, etc.)" />
              <Button className="w-full gradient-primary">Generate Quiz</Button>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="card-hover">
              <CardHeader>
                <Brain className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Recent Quizzes</CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Physics - Motion</span>
                    <span className="text-primary">75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Chemistry - Reactions</span>
                    <span className="text-primary">90%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Literature - Shakespeare</span>
                    <span className="text-primary">85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <Trophy className="h-8 w-8 text-accent mb-2" />
                <CardTitle>Your Stats</CardTitle>
                <CardDescription>Track your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Quizzes Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">83%</div>
                  <div className="text-sm text-muted-foreground">Average Score</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
