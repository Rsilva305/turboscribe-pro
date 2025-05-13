'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useSupabase } from '@/components/providers/supabase-provider'

export default function NewTranscriptionPage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [file, setFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [transcription, setTranscription] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please select a file to transcribe');
      return;
    }

    // Check file size (limit to 25MB for example)
    if (file.size > 25 * 1024 * 1024) {
      toast.error('File size exceeds the limit (25MB)');
      return;
    }

    // Check file type
    const supportedTypes = [
      'audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/ogg', 'audio/flac',
      'video/mp4', 'video/quicktime', 'video/mpeg', 'video/webm', 'video/ogg'
    ];
    
    if (!supportedTypes.includes(file.type)) {
      toast.error('Unsupported file type. Please upload an audio or video file.');
      return;
    }

    try {
      setIsUploading(true);
      setTranscription(null);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      
      // Send file to API endpoint for transcription
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to transcribe file');
      }
      
      // Set the transcription result
      setTranscription(data.transcription);
      toast.success('Transcription completed successfully!');
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to transcribe file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">New Transcription</h1>
          <Button onClick={() => router.push('/dashboard')} variant="outline">
            Back to Dashboard
          </Button>
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Upload Audio or Video</CardTitle>
            <CardDescription>
              Supported formats: MP3, M4A, MP4, WAV, OGG, FLAC, WEBM, and more
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="flex flex-col gap-3">
                <label htmlFor="file" className="text-sm font-medium">
                  File
                </label>
                <Input
                  id="file"
                  type="file"
                  accept="audio/*,video/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
                <div className="text-xs text-muted-foreground">
                  Maximum file size: 25MB
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={!file || isUploading}>
                {isUploading ? 'Transcribing...' : 'Transcribe'}
              </Button>
            </form>
          </CardContent>
          
          {transcription && (
            <CardFooter className="flex flex-col">
              <h3 className="font-medium mb-2">Transcription Result:</h3>
              <div className="p-4 border rounded-md w-full bg-muted whitespace-pre-wrap">
                {transcription}
              </div>
              <div className="flex gap-2 mt-4 self-end">
                <Button variant="outline" onClick={() => navigator.clipboard.writeText(transcription)}>
                  Copy
                </Button>
                <Button onClick={() => setTranscription(null)}>
                  New Transcription
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </MainLayout>
  );
} 