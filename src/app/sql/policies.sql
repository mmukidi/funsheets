-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own worksheets" ON worksheets;
DROP POLICY IF EXISTS "Users can insert their own worksheets" ON worksheets;
DROP POLICY IF EXISTS "Users can update their own worksheets" ON worksheets;
DROP POLICY IF EXISTS "Users can delete their own worksheets" ON worksheets;
DROP POLICY IF EXISTS "Users can upload their own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own files" ON storage.objects;

-- Enable RLS (Row Level Security) for the worksheets table
ALTER TABLE worksheets ENABLE ROW LEVEL SECURITY;

-- Allow public access to view worksheets
CREATE POLICY "Allow public read access"
ON worksheets FOR SELECT
TO public
USING (true);

-- Allow public access to insert worksheets
CREATE POLICY "Allow public insert access"
ON worksheets FOR INSERT
TO public
WITH CHECK (true);

-- Allow users to update their own worksheets
CREATE POLICY "Users can update their own worksheets"
ON worksheets FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own worksheets
CREATE POLICY "Users can delete their own worksheets"
ON worksheets FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Storage Bucket Policies
-- Allow users to upload files to their own folder
CREATE POLICY "Users can upload their own files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'worksheets');

-- Allow users to view their own files
CREATE POLICY "Users can view their own files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'worksheets');

-- Storage policies
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'worksheets');

CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'worksheets'); 