import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { transcribeAudio } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication (using Supabase Auth)
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized request' },
        { status: 401 }
      );
    }
    
    // Get the user ID from the session
    const userId = session.user.id;
    
    // Check if the user has exceeded their free tier daily limit
    const { data: isUnderLimit, error: limitCheckError } = await supabase
      .rpc('check_daily_transcription_limit', { user_id: userId });
    
    if (limitCheckError) {
      console.error('Error checking usage limit:', limitCheckError);
      return NextResponse.json(
        { error: 'Unable to verify usage limits' },
        { status: 500 }
      );
    }
    
    if (!isUnderLimit) {
      return NextResponse.json(
        { error: 'Daily transcription limit reached. Please upgrade your plan for unlimited transcriptions.' },
        { status: 403 }
      );
    }
    
    // Get form data from the request
    const formData = await request.formData();
    const audioFile = formData.get('file') as File;
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Convert file to buffer
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    
    // Transcribe the audio
    const transcription = await transcribeAudio(buffer, audioFile.name);
    
    // Store the transcription in the database
    const { data: transcriptionData, error: transcriptionError } = await supabase
      .from('transcriptions')
      .insert({
        user_id: userId,
        title: audioFile.name,
        content: transcription,
        file_name: audioFile.name,
        file_type: audioFile.type,
        file_size: audioFile.size
      })
      .select()
      .single();
    
    if (transcriptionError) {
      console.error('Error storing transcription:', transcriptionError);
      return NextResponse.json(
        { error: 'Failed to store transcription' },
        { status: 500 }
      );
    }
    
    // Log the usage
    const { error: usageLogError } = await supabase
      .from('usage_logs')
      .insert({
        user_id: userId,
        transcription_id: transcriptionData.id,
        action_type: 'transcription',
        resource_consumed: buffer.length // Track file size as resource consumed
      });
    
    if (usageLogError) {
      console.error('Error logging usage:', usageLogError);
      // Continue anyway as this is non-critical
    }
    
    return NextResponse.json({
      success: true,
      transcription,
      id: transcriptionData.id
    });
    
  } catch (error) {
    console.error('Transcription API error:', error);
    
    return NextResponse.json(
      { error: 'Failed to process transcription' },
      { status: 500 }
    );
  }
} 