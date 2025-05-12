'use client'

import { useState } from 'react'

export default function NewTranscriptionPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) return
    
    setUploading(true)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 300)
    
    // Simulate API call
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
      // In a real app, you would handle the response and redirect
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1000)
    }, 3000)
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="text-xl font-bold">TurboScribe Pro</a>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/dashboard" className="text-sm font-medium hover:underline">Dashboard</a>
            <a href="/dashboard/new" className="text-sm font-medium hover:underline">New Transcription</a>
            <a href="/settings" className="text-sm font-medium hover:underline">Settings</a>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm">John Doe</span>
            <a 
              href="/logout" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              Logout
            </a>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="container py-10">
          <div className="flex items-center mb-8">
            <a 
              href="/dashboard" 
              className="mr-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </a>
            <h1 className="text-3xl font-bold">New Transcription</h1>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Upload Audio File</h3>
                <p className="text-sm text-muted-foreground">
                  Upload an audio or video file to transcribe. Supported formats: MP3, WAV, MP4, M4A.
                </p>
              </div>
              <div className="p-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="title">
                      Title
                    </label>
                    <input 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="title" 
                      placeholder="Enter a title for your transcription" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="file">
                      Audio File
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                      <input
                        id="file"
                        type="file"
                        className="hidden"
                        accept=".mp3,.wav,.mp4,.m4a"
                        onChange={handleFileChange}
                        required
                      />
                      <label htmlFor="file" className="cursor-pointer flex flex-col items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-muted-foreground">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" x2="12" y1="3" y2="15"></line>
                        </svg>
                        <span className="font-medium">
                          {file ? file.name : 'Click to upload or drag and drop'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          MP3, WAV, MP4, M4A up to 500MB
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  {uploading && (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        Uploading... {uploadProgress}%
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                    disabled={!file || uploading}
                  >
                    {uploading ? 'Uploading...' : 'Upload and Transcribe'}
                  </button>
                </form>
              </div>
              <div className="flex items-center justify-between p-6 border-t">
                <p className="text-sm text-muted-foreground">
                  Free plan: 10 minutes of audio per month
                </p>
                <a href="/pricing" className="text-sm text-primary hover:underline">
                  Upgrade for more
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-8">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TurboScribe Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
} 