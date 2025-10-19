import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Copy, UserPlus, LogOut } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { z } from 'zod';

const teacherSchema = z.object({
  fullName: z.string().trim().min(1, { message: 'Name is required' }).max(100),
  teacherId: z.string().trim().min(3, { message: 'Teacher ID must be at least 3 characters' }).max(50),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole(user?.id);
  const [loading, setLoading] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{ teacherId: string; password: string } | null>(null);

  // Redirect if not admin
  if (!authLoading && !roleLoading && role !== 'admin') {
    navigate('/');
    return null;
  }

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const handleGenerateTeacher = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('fullName') as string;
    const teacherId = formData.get('teacherId') as string;
    const password = formData.get('password') as string;

    try {
      teacherSchema.parse({ fullName, teacherId, password });

      // Create auth user
      const email = `${teacherId}@teacher.school`;
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user');

      // Add teacher role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: 'teacher'
        });

      if (roleError) throw roleError;

      // Add teacher details
      const { error: teacherError } = await supabase
        .from('teachers')
        .insert({
          user_id: authData.user.id,
          teacher_id: teacherId,
          full_name: fullName
        });

      if (teacherError) throw teacherError;

      setGeneratedCredentials({ teacherId, password });
      toast.success('Teacher account created successfully!');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground mt-1">Manage teacher accounts</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Create Teacher Account
              </CardTitle>
              <CardDescription>
                Generate login credentials for a new teacher
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerateTeacher} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    required
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacherId">Teacher ID</Label>
                  <Input
                    id="teacherId"
                    name="teacherId"
                    placeholder="TCH001"
                    required
                    maxLength={50}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating...' : 'Generate Teacher Account'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {generatedCredentials && (
            <Card className="shadow-elegant border-primary/20">
              <CardHeader>
                <CardTitle>Generated Credentials</CardTitle>
                <CardDescription>
                  Share these credentials with the teacher securely
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Teacher ID</Label>
                  <div className="flex gap-2">
                    <Input
                      value={generatedCredentials.teacherId}
                      readOnly
                      className="bg-muted"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(generatedCredentials.teacherId, 'Teacher ID')}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="flex gap-2">
                    <Input
                      value={generatedCredentials.password}
                      readOnly
                      type="password"
                      className="bg-muted"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(generatedCredentials.password, 'Password')}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    Teacher login email: {generatedCredentials.teacherId}@teacher.school
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
