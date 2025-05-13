# Supabase Setup Guide for TurboScribe Pro

This document provides instructions for setting up the Supabase backend for TurboScribe Pro.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in the project details:
   - Name: TurboScribe Pro
   - Database Password: Create a secure password
   - Region: Choose the region closest to your users
4. Click "Create New Project" and wait for it to be provisioned (may take a few minutes)

## Step 2: Set Up Database Schema

1. In your Supabase dashboard, navigate to the "SQL Editor" in the sidebar
2. Click "New Query"
3. Copy and paste the contents of `schema.sql` file (from this directory) into the query editor
4. Run the query

## Step 3: Get Your API Keys

1. In your Supabase dashboard, go to "Project Settings" (gear icon in bottom left)
2. Go to the "API" tab
3. Copy the following values:
   - Project URL
   - anon/public key

## Step 4: Set Up Environment Variables

Create a `.env.local` file in the root of your project with the following content:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_FREE_TIER_TRANSCRIPTIONS_PER_DAY=1
```

Replace the placeholders with your actual values.

## Step 5: Configure Authentication

1. In your Supabase dashboard, go to "Authentication" > "Providers"
2. Make sure "Email" is enabled for sign-up
3. Optionally, configure "Site URL" under "URL Configuration" to your production URL

## Step 6: Set Up Storage (Optional)

If you want to store the audio files:

1. In your Supabase dashboard, go to "Storage"
2. Create a new bucket called "audio-files"
3. Set the bucket to "Private"
4. Add the following RLS policy to allow authenticated users to upload:

```sql
CREATE POLICY "Allow authenticated users to upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'audio-files' AND owner = auth.uid());
```

## Troubleshooting

If you encounter issues with the schema setup:

1. Try running each section of the schema (tables, policies, functions) separately
2. Check for error messages in the SQL Editor
3. Verify that the Supabase client in your application has the correct URL and anon key 