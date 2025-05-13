'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useSupabase } from '@/components/providers/supabase-provider'
import { toast } from 'sonner'

// Define the Transcription type
type Transcription = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  file_size: number;
  file_type: string;
  duration?: number;
};

// Define the UserProfile type
type UserProfile = {
  id: string;
  email: string;
  subscription_tier: string;
  subscription_start_date?: string;
  subscription_end_date?: string;
};

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Helper function to format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function DashboardPage() {
  const { session, signOut } = useSupabase();
  const router = useRouter();
  const [transcriptions, setTranscriptions] = React.useState<Transcription[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);
  
  // Fetch user transcriptions and profile
  React.useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          
          // Fetch user profile
          const profileResponse = await fetch('/api/profile');
          const profileData = await profileResponse.json();
          
          if (profileData.error) throw new Error(profileData.error.message);
          if (profileData.data) {
            setUserProfile(profileData.data);
          }
          
          // Fetch transcriptions
          const transcriptionsResponse = await fetch('/api/transcriptions');
          const transcriptionsData = await transcriptionsResponse.json();
          
          if (transcriptionsData.error) throw new Error(transcriptionsData.error.message);
          if (transcriptionsData.data) {
            setTranscriptions(transcriptionsData.data);
          }
          
        } catch {
          toast.error('Failed to load your data');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchData();
    }
  }, [session]);
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch {
      toast.error('Failed to log out');
    }
  };
  
  // Return loading state or login redirect if no session
  if (!session) {
    return null; // Will be redirected by the useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold">TurboScribe Pro</Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline">Dashboard</Link>
            <Link href="/dashboard/new" className="text-sm font-medium hover:underline">New Transcription</Link>
            <Link href="/settings" className="text-sm font-medium hover:underline">Settings</Link>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm">{session.user.email}</span>
            <Button 
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="container py-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button onClick={() => router.push('/dashboard/new')}>
              New Transcription
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-row items-center justify-between p-6 pb-2">
                <p className="text-sm font-medium">Total Transcriptions</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">{transcriptions.length}</div>
                <p className="text-xs text-muted-foreground">Total transcriptions created</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-row items-center justify-between p-6 pb-2">
                <p className="text-sm font-medium">Total Size</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">
                  {formatFileSize(transcriptions.reduce((total, t) => total + (t.file_size || 0), 0))}
                </div>
                <p className="text-xs text-muted-foreground">Total file size processed</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-row items-center justify-between p-6 pb-2">
                <p className="text-sm font-medium">Subscription</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">{userProfile?.subscription_tier || 'Free'}</div>
                <p className="text-xs text-muted-foreground">
                  {userProfile?.subscription_tier === 'free' 
                    ? '1 transcription per day'
                    : 'Unlimited transcriptions'}
                </p>
              </div>
              {userProfile?.subscription_tier === 'free' && (
                <div className="p-6 pt-0">
                  <Link href="/pricing" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-full">
                    Upgrade Plan
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Recent Transcriptions</h2>
          
          {isLoading ? (
            <div className="border rounded-lg overflow-hidden p-8 text-center">
              <p>Loading your transcriptions...</p>
            </div>
          ) : transcriptions.length === 0 ? (
            <div className="border rounded-lg overflow-hidden p-8 text-center">
              <p className="mb-4">You haven&apos;t created any transcriptions yet.</p>
              <Button onClick={() => router.push('/dashboard/new')}>
                Create Your First Transcription
              </Button>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-5 font-medium p-4 bg-muted">
                <div>Title</div>
                <div>Date</div>
                <div>Status</div>
                <div>Size</div>
                <div className="text-right">Actions</div>
              </div>
              <div className="divide-y">
                {transcriptions.map((transcription) => (
                  <div key={transcription.id} className="grid grid-cols-5 p-4 items-center">
                    <div className="font-medium">{transcription.title}</div>
                    <div className="text-muted-foreground">{formatDate(transcription.created_at)}</div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Completed
                      </span>
                    </div>
                    <div>{formatFileSize(transcription.file_size || 0)}</div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/dashboard/edit/${transcription.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => router.push(`/dashboard/view/${transcription.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="border-t py-8">
        <div className="container">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} TurboScribe Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 