import { Navigation } from "@/components/Navigation";
import { Calendar, BookOpen, Brain, MessageSquare, Award, ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const features = [
  {
    icon: Calendar,
    title: "Event Portal",
    description: "Stay updated with school events, personal reminders, and smart notifications",
    to: "/events",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: BookOpen,
    title: "Resources Library",
    description: "Access previous papers, reference books, educational videos, and current affairs",
    to: "/resources",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Brain,
    title: "Quiz & Practice",
    description: "AI-powered quizzes and flashcards for any topic to enhance your learning",
    to: "/quiz",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    title: "Doubt Clarification",
    description: "Connect with teachers privately to resolve your academic doubts",
    to: "/doubts",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Award,
    title: "Growth & Achievements",
    description: "Track your progress, explore scholarships, and build your student portfolio",
    to: "/achievements",
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end gap-2">
          {user ? (
            <Button variant="outline" onClick={() => signOut()}>
              Logout
            </Button>
          ) : (
            <Button onClick={() => navigate('/auth')}>
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          )}
        </div>
      </div>
      
      <main>
        <section className="container px-4 py-20 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Welcome to{" "}
              <span className="text-gradient-primary">Student Bridge</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your comprehensive digital hub for school events, academic resources, 
              interactive learning, and personal growth tracking
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" className="gradient-primary shadow-glow" asChild>
                <Link to="/events">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/resources">Browse Resources</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container px-4 pb-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.to} to={feature.to}>
                  <Card className="h-full card-hover">
                    <CardHeader>
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}>
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <CardTitle className="mt-4">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="group px-0">
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-t border-border bg-muted/50">
          <div className="container px-4 py-16">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <h2 className="text-3xl font-bold">Empowering Students for Success</h2>
              <p className="text-muted-foreground">
                Student Bridge brings together all the tools you need to stay organized, 
                learn effectively, and achieve your academic goals. Join thousands of students 
                who are making their school life more meaningful and productive.
              </p>
              <div className="grid gap-8 pt-8 sm:grid-cols-3">
                <div>
                  <div className="text-4xl font-bold text-primary">5+</div>
                  <div className="text-sm text-muted-foreground mt-1">Smart Features</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-muted-foreground mt-1">Always Available</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-success">100%</div>
                  <div className="text-sm text-muted-foreground mt-1">Secure & Private</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
