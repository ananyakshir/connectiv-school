import { Navigation } from "@/components/Navigation";
import { Award, Trophy, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Achievements = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Achievements & Growth</h1>
          <p className="text-muted-foreground">Track your progress, explore scholarships, and build your portfolio</p>
        </div>

        <Tabs defaultValue="portfolio" className="max-w-4xl mx-auto space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="shadow-glow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Star className="h-6 w-6 text-accent" />
                  <CardTitle>Student Mini-Resume</CardTitle>
                </div>
                <CardDescription>Build your academic and extracurricular profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">8</div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">5</div>
                    <div className="text-sm text-muted-foreground">Certifications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success">12</div>
                    <div className="text-sm text-muted-foreground">Activities</div>
                  </div>
                </div>
                <Button className="w-full gradient-primary">Build My Resume</Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-success" />
                  <CardTitle>Annual Progress</CardTitle>
                </div>
                <CardDescription>Track your growth year by year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">2024-2025</span>
                    <span className="text-sm text-muted-foreground">Current Year</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">2023-2024</span>
                    <Button variant="outline" size="sm">View Progress</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">2022-2023</span>
                    <Button variant="outline" size="sm">View Progress</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scholarships" className="space-y-4">
            <Card className="shadow-glow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-accent" />
                  <CardTitle>Available Scholarships</CardTitle>
                </div>
                <CardDescription>Explore opportunities for financial aid and recognition</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors">
                    <h4 className="font-semibold">National Merit Scholarship</h4>
                    <p className="text-sm text-muted-foreground mt-1">For students with exceptional academic performance</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Academic</span>
                      <span className="text-xs text-muted-foreground">Deadline: Nov 30, 2025</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors">
                    <h4 className="font-semibold">International Study Program</h4>
                    <p className="text-sm text-muted-foreground mt-1">Opportunities to study abroad with full funding</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">International</span>
                      <span className="text-xs text-muted-foreground">Deadline: Dec 15, 2025</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors">
                    <h4 className="font-semibold">Sports Excellence Award</h4>
                    <p className="text-sm text-muted-foreground mt-1">Recognition and support for outstanding athletes</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Sports</span>
                      <span className="text-xs text-muted-foreground">Deadline: Jan 10, 2026</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full gradient-accent">Request Guidance</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Achievements;
