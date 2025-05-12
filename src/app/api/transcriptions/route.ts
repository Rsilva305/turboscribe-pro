import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
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
    
    // Fetch transcriptions for the authenticated user
    const { data: transcriptions, error } = await supabase
      .from('transcriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching transcriptions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch transcriptions' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      data: transcriptions
    });
    
  } catch (error) {
    console.error('API error:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch transcriptions' },
      { status: 500 }
    );
  }
} 