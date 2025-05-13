-- TurboScribe Pro Database Schema

-- Step 1: Set up the profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_tier TEXT DEFAULT 'free',
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE
);

-- Set up Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid errors when re-running the script
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Create a policy that allows users to view only their own profile
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- Create a policy that allows users to update only their own profile
CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Create a function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if trigger exists before creating it
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;

-- Step 2: Set up the transcriptions table
CREATE TABLE IF NOT EXISTS transcriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  file_name TEXT,
  file_type TEXT,
  file_size INTEGER,
  duration INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE transcriptions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid errors when re-running the script
DROP POLICY IF EXISTS "Users can view their own transcriptions" ON transcriptions;
DROP POLICY IF EXISTS "Users can insert their own transcriptions" ON transcriptions;
DROP POLICY IF EXISTS "Users can update their own transcriptions" ON transcriptions;
DROP POLICY IF EXISTS "Users can delete their own transcriptions" ON transcriptions;

-- Create a policy that allows users to view only their own transcriptions
CREATE POLICY "Users can view their own transcriptions" 
  ON transcriptions FOR SELECT 
  USING (auth.uid() = user_id);

-- Create a policy that allows users to insert their own transcriptions
CREATE POLICY "Users can insert their own transcriptions" 
  ON transcriptions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create a policy that allows users to update only their own transcriptions
CREATE POLICY "Users can update their own transcriptions" 
  ON transcriptions FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create a policy that allows users to delete only their own transcriptions
CREATE POLICY "Users can delete their own transcriptions" 
  ON transcriptions FOR DELETE 
  USING (auth.uid() = user_id);

-- Step 3: Set up the usage_logs table (FIXED version)
CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  transcription_id UUID REFERENCES transcriptions(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  resource_consumed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  date_key TEXT -- We'll populate this with a trigger instead of a generated column
);

-- Set up Row Level Security (RLS)
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid errors when re-running the script
DROP POLICY IF EXISTS "Users can view their own usage logs" ON usage_logs;
DROP POLICY IF EXISTS "Users can insert their own usage logs" ON usage_logs;

-- Create a policy that allows users to view only their own usage logs
CREATE POLICY "Users can view their own usage logs" 
  ON usage_logs FOR SELECT 
  USING (auth.uid() = user_id);

-- Create a policy that allows users to insert their own usage logs
CREATE POLICY "Users can insert their own usage logs" 
  ON usage_logs FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create a function to populate date_key on insert/update
CREATE OR REPLACE FUNCTION set_date_key() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.date_key := TO_CHAR(NEW.created_at, 'YYYY-MM-DD');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS set_usage_logs_date_key ON usage_logs;

-- Create a trigger to call the function when a record is inserted or updated
CREATE TRIGGER set_usage_logs_date_key
  BEFORE INSERT OR UPDATE ON usage_logs
  FOR EACH ROW EXECUTE FUNCTION set_date_key();

-- Create indexes for faster querying
CREATE INDEX IF NOT EXISTS idx_usage_logs_date_key ON usage_logs(date_key);
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id_date ON usage_logs(user_id, date_key);

-- Step 4: Create a function to check daily usage limit
CREATE OR REPLACE FUNCTION public.check_daily_transcription_limit(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    user_tier TEXT;
    daily_limit INTEGER;
    current_usage INTEGER;
    today TEXT := TO_CHAR(NOW() AT TIME ZONE 'UTC', 'YYYY-MM-DD');
BEGIN
    -- Get user's subscription tier
    SELECT subscription_tier INTO user_tier FROM profiles WHERE id = user_id;
    
    -- Set daily limit based on subscription tier
    IF user_tier = 'free' THEN
        daily_limit := 1; -- 1 free transcription per day
    ELSIF user_tier = 'pro' THEN
        daily_limit := 1000; -- Essentially unlimited for paid users
    ELSE
        daily_limit := 0; -- Default case
    END IF;
    
    -- Count today's transcriptions
    SELECT COUNT(*) INTO current_usage
    FROM usage_logs
    WHERE user_id = check_daily_transcription_limit.user_id
    AND date_key = today
    AND action_type = 'transcription';
    
    -- Return true if user is under the limit, false if they've exceeded it
    RETURN current_usage < daily_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 