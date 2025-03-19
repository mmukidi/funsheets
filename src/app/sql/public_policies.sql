-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public access" ON documents;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;

-- Allow public access to documents
CREATE POLICY "Allow public access"
ON documents FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Allow public access to storage
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'worksheets');

CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'worksheets'); 