import OpenAI from 'openai';

// Initialize OpenAI client
// IMPORTANT: The API key should be set in environment variables, not hardcoded
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-dummy-key-for-development',
});

export async function transcribeAudio(audioBuffer: Buffer, fileName: string): Promise<string> {
  try {
    // For development or tests without an API key, return a mock transcription
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-dummy-key-for-development') {
      console.warn('Using mock transcription because no OpenAI API key is provided');
      return "This is a mock transcription for development purposes.";
    }
    
    // Create a File object from the audio buffer
    const file = new File([audioBuffer], fileName, { 
      type: getContentType(fileName)
    });

    // Create a transcription using OpenAI's Whisper model
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      language: "en", // You can make this dynamic for multi-language support
    });

    return transcription.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
}

// Helper function to determine content type based on file extension
function getContentType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'mp3':
      return 'audio/mpeg';
    case 'wav':
      return 'audio/wav';
    case 'ogg':
      return 'audio/ogg';
    case 'flac':
      return 'audio/flac';
    case 'mp4':
      return 'video/mp4';
    case 'mov':
      return 'video/quicktime';
    default:
      return 'application/octet-stream';
  }
} 