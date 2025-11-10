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
import { StickyNote, Plus, Trash2, Edit } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { toast } from "sonner";

interface Note {
  id: string;
  title: string;
  content: string | null;
  subject: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

const Notes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    subject: "",
    tags: "",
  });

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      toast.error("Failed to load notes");
      console.error(error);
    } else {
      setNotes(data as Note[]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const noteData = {
      user_id: user.id,
      title: formData.title,
      content: formData.content || null,
      subject: formData.subject || null,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : null,
    };

    if (editingNote) {
      const { error } = await supabase
        .from("notes")
        .update(noteData)
        .eq("id", editingNote.id);

      if (error) {
        toast.error("Failed to update note");
        console.error(error);
      } else {
        toast.success("Note updated successfully");
        fetchNotes();
        resetForm();
      }
    } else {
      const { error } = await supabase.from("notes").insert([noteData]);

      if (error) {
        toast.error("Failed to create note");
        console.error(error);
      } else {
        toast.success("Note created successfully");
        fetchNotes();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete note");
      console.error(error);
    } else {
      toast.success("Note deleted successfully");
      fetchNotes();
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content || "",
      subject: note.subject || "",
      tags: note.tags ? note.tags.join(", ") : "",
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", subject: "", tags: "" });
    setEditingNote(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Notes Organization</h1>
          <p className="text-muted-foreground">Keep your study notes organized and accessible</p>
        </div>

        {!user ? (
          <Card className="max-w-2xl mx-auto shadow-glow">
            <CardContent className="text-center py-12">
              <StickyNote className="h-16 w-16 mx-auto mb-4 opacity-50 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Organize Your Notes</h3>
              <p className="text-muted-foreground mb-6">
                Sign in to create, organize, and manage your study notes with tags and subjects
              </p>
              <Button onClick={() => navigate("/auth")} className="gradient-primary">
                Sign In to Continue
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Your Notes</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-primary" onClick={() => setEditingNote(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Note
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingNote ? "Edit Note" : "Create New Note"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={6}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="math, important, exam"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {editingNote ? "Update" : "Create"}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.map((note) => (
                <Card key={note.id} className="hover:shadow-glow transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <span className="flex-1">{note.title}</span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(note)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(note.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {note.subject && (
                      <Badge variant="secondary" className="mb-2">
                        {note.subject}
                      </Badge>
                    )}
                    {note.content && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        {note.content}
                      </p>
                    )}
                    {note.tags && note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {notes.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <StickyNote className="h-12 w-12 mx-auto mb-4 opacity-50 text-muted-foreground" />
                  <p className="text-muted-foreground">No notes yet. Create your first note to get started!</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
