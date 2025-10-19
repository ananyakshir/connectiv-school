import { Navigation } from "@/components/Navigation";
import { FileText, Book, Video, TrendingUp, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const resources = {
  papers: [
    { subject: "Mathematics", year: "2024", chapters: 12 },
    { subject: "Physics", year: "2024", chapters: 10 },
    { subject: "Chemistry", year: "2024", chapters: 11 },
    { subject: "English Literature", year: "2024", chapters: 8 },
  ],
  books: [
    { title: "Julius Caesar - Complete Analysis", author: "Shakespeare Studies", subject: "Literature" },
    { title: "Physics Fundamentals", author: "Dr. Sharma", subject: "Physics" },
    { title: "Organic Chemistry Guide", author: "Prof. Patel", subject: "Chemistry" },
  ],
  videos: [
    { title: "Newton's Laws Explained", subject: "Physics", duration: "15 min" },
    { title: "Chemical Reactions Visualized", subject: "Chemistry", duration: "20 min" },
    { title: "Shakespeare's Works", subject: "Literature", duration: "25 min" },
  ],
};

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Student Resources</h1>
          <p className="text-muted-foreground">Access previous papers, reference books, and educational videos</p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for resources, subjects, or topics..." 
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="papers" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="papers">Question Papers</TabsTrigger>
            <TabsTrigger value="books">Reference Books</TabsTrigger>
            <TabsTrigger value="videos">Video Lessons</TabsTrigger>
            <TabsTrigger value="gk">GK & Current Affairs</TabsTrigger>
          </TabsList>

          <TabsContent value="papers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resources.papers.map((paper, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <FileText className="h-8 w-8 text-primary" />
                      <span className="text-xs text-muted-foreground">{paper.year}</span>
                    </div>
                    <CardTitle className="mt-2">{paper.subject}</CardTitle>
                    <CardDescription>{paper.chapters} chapters available</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Papers</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="books" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resources.books.map((book, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <Book className="h-8 w-8 text-accent" />
                    <CardTitle className="mt-2">{book.title}</CardTitle>
                    <CardDescription>
                      <div>{book.author}</div>
                      <div className="mt-1 text-primary">{book.subject}</div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">Access Book</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resources.videos.map((video, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <Video className="h-8 w-8 text-accent" />
                    <CardTitle className="mt-2">{video.title}</CardTitle>
                    <CardDescription>
                      <div>{video.subject}</div>
                      <div className="mt-1 text-muted-foreground">{video.duration}</div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">Watch Video</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gk" className="space-y-4">
            <Card className="shadow-glow">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-success" />
                <CardTitle className="mt-2">Current Affairs & General Knowledge</CardTitle>
                <CardDescription>Stay updated with the latest news and important topics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">This Week's Highlights</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>International Climate Summit 2025 - Key Decisions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>New Scientific Discovery in Quantum Physics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>India's Economic Growth Report Q3 2025</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full gradient-accent">View All Updates</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Resources;
