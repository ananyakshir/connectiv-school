import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ListChecks, Plus, Trash2, Edit } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { toast } from "sonner";

interface SyllabusItem {
  id: string;
  subject: string;
  topic: string;
  description: string | null;
  progress: number;
  status: "not_started" | "in_progress" | "completed";
  created_at: string;
  updated_at: string;
}

const SyllabusProgress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<SyllabusItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SyllabusItem | null>(null);
  const [formData, setFormData] = useState<{
    subject: string;
    topic: string;
    description: string;
    progress: number;
    status: "not_started" | "in_progress" | "completed";
  }>({
    subject: "",
    topic: "",
    description: "",
    progress: 0,
    status: "not_started",
  });

  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user]);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("syllabus_items")
      .select("*")
      .order("subject", { ascending: true });

    if (error) {
      toast.error("Failed to load syllabus items");
      console.error(error);
    } else {
      setItems(data as SyllabusItem[]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const itemData = {
      user_id: user.id,
      subject: formData.subject,
      topic: formData.topic,
      description: formData.description || null,
      progress: formData.progress,
      status: formData.status,
    };

    if (editingItem) {
      const { error } = await supabase
        .from("syllabus_items")
        .update(itemData)
        .eq("id", editingItem.id);

      if (error) {
        toast.error("Failed to update syllabus item");
        console.error(error);
      } else {
        toast.success("Syllabus item updated successfully");
        fetchItems();
        resetForm();
      }
    } else {
      const { error } = await supabase.from("syllabus_items").insert([itemData]);

      if (error) {
        toast.error("Failed to create syllabus item");
        console.error(error);
      } else {
        toast.success("Syllabus item created successfully");
        fetchItems();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("syllabus_items").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete syllabus item");
      console.error(error);
    } else {
      toast.success("Syllabus item deleted successfully");
      fetchItems();
    }
  };

  const handleEdit = (item: SyllabusItem) => {
    setEditingItem(item);
    setFormData({
      subject: item.subject,
      topic: item.topic,
      description: item.description || "",
      progress: item.progress,
      status: item.status,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      subject: "",
      topic: "",
      description: "",
      progress: 0,
      status: "not_started",
    });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in_progress":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.subject]) {
      acc[item.subject] = [];
    }
    acc[item.subject].push(item);
    return acc;
  }, {} as Record<string, SyllabusItem[]>);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Syllabus Progress</h1>
          <p className="text-muted-foreground">Track your learning progress across all subjects</p>
        </div>

        {!user ? (
          <Card className="max-w-2xl mx-auto shadow-glow">
            <CardContent className="text-center py-12">
              <ListChecks className="h-16 w-16 mx-auto mb-4 opacity-50 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
              <p className="text-muted-foreground mb-6">
                Sign in to track your syllabus progress, set goals, and monitor your learning journey
              </p>
              <Button onClick={() => navigate("/auth")} className="gradient-primary">
                Sign In to Continue
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Your Progress</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-primary" onClick={() => setEditingItem(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Topic
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? "Edit Syllabus Item" : "Add Syllabus Item"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="topic">Topic</Label>
                      <Input
                        id="topic"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not_started">Not Started</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="progress">Progress: {formData.progress}%</Label>
                      <Slider
                        id="progress"
                        value={[formData.progress]}
                        onValueChange={([value]) => setFormData({ ...formData, progress: value })}
                        max={100}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {editingItem ? "Update" : "Create"}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-6">
              {Object.entries(groupedItems).map(([subject, subjectItems]) => (
                <Card key={subject}>
                  <CardHeader>
                    <CardTitle className="text-xl">{subject}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {subjectItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.topic}</h4>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            )}
                          </div>
                          <div className="flex gap-1 ml-4">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status.replace("_", " ")}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">{item.progress}% complete</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {items.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <ListChecks className="h-12 w-12 mx-auto mb-4 opacity-50 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No syllabus items yet. Add your first topic to start tracking!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SyllabusProgress;
