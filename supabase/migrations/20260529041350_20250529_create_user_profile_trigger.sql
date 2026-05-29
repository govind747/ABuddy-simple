/*
  # Create User Profile Trigger

  1. Purpose
    - Automatically create a user_profile entry when a new user signs up
    - Syncs auth.users with public.user_profiles table
  
  2. Changes
    - Create a function `handle_new_user()` that inserts into user_profiles
    - Create a trigger on auth.users that fires after INSERT
    - The trigger uses the SECURITY DEFINER to bypass RLS for the insert
  
  3. Security
    - The function runs with elevated privileges (SECURITY DEFINER)
    - Only inserts data for the newly created user
    - Uses ON CONFLICT DO NOTHING to prevent duplicates
*/

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, email, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO anon, authenticated;
GRANT ALL ON FUNCTION public.handle_new_user() TO anon, authenticated;
