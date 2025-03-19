-- Drop existing user policies if they exist
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Allow public user creation" ON users;

-- Create new user policies
-- Allow public user creation
CREATE POLICY "Allow public user creation"
    ON users FOR INSERT
    TO public
    WITH CHECK (true);

-- Users can view their own data
CREATE POLICY "Users can view their own data"
    ON users FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update their own data"
    ON users FOR UPDATE
    USING (auth.uid() = id); 