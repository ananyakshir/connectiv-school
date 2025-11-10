-- Create enum for syllabus status
CREATE TYPE public.syllabus_status AS ENUM ('not_started', 'in_progress', 'completed');

-- Create notes table
CREATE TABLE public.notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  subject TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on notes
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for notes
CREATE POLICY "Users can view their own notes"
  ON public.notes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notes"
  ON public.notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes"
  ON public.notes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes"
  ON public.notes FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for notes updated_at
CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON public.notes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create syllabus_items table
CREATE TABLE public.syllabus_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  description TEXT,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status syllabus_status NOT NULL DEFAULT 'not_started',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on syllabus_items
ALTER TABLE public.syllabus_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for syllabus_items
CREATE POLICY "Users can view their own syllabus items"
  ON public.syllabus_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own syllabus items"
  ON public.syllabus_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own syllabus items"
  ON public.syllabus_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own syllabus items"
  ON public.syllabus_items FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for syllabus_items updated_at
CREATE TRIGGER update_syllabus_items_updated_at
  BEFORE UPDATE ON public.syllabus_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();