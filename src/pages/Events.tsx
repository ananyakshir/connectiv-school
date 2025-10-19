import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Calendar, Plus, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const upcomingEvents = [
  {
    id: 1,
    title: "Inter-house Debate Competition",
    date: "2025-10-25",
    time: "9:00 AM",
    location: "Main Auditorium",
    type: "Competition",
    description: "Annual inter-house debate competition on current affairs",
  },
  {
    id: 2,
    title: "Science Exhibition",
    date: "2025-10-28",
    time: "10:00 AM",
    location: "Science Lab",
    type: "Exhibition",
    description: "Showcase of innovative science projects by students",
  },
  {
    id: 3,
    title: "Sports Day",
    date: "2025-11-05",
    time: "8:00 AM",
    location: "School Ground",
    type: "Sports",
    description: "Annual sports day with various athletic events",
  },
  {
    id: 4,
    title: "Parent-Teacher Meeting",
    date: "2025-11-10",
    time: "2:00 PM",
    location: "Classrooms",
    type: "Meeting",
    description: "Discussion on student progress and development",
  },
];

const Events = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Event Calendar</h1>
          <p className="text-muted-foreground">Stay updated with all school events and activities</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Upcoming Events</h2>
              <Button className="gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Personal Event
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {event.type}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="shadow-glow">
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
                <CardDescription>October 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                    <div key={day} className="text-xs font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <button
                      key={day}
                      className={cn(
                        "rounded-lg p-2 text-sm transition-colors hover:bg-muted",
                        day === new Date().getDate() && "bg-primary text-primary-foreground font-semibold",
                        [25, 28].includes(day) && day !== new Date().getDate() && "bg-accent/10 text-accent font-medium"
                      )}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-primary">4</div>
                  <div className="text-sm text-muted-foreground">Upcoming Events</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">2</div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">3</div>
                  <div className="text-sm text-muted-foreground">Personal Reminders</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
