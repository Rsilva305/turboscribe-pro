'use client'

import * as React from 'react'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FaPlus, FaFileAlt, FaHistory } from 'react-icons/fa'

// Mock data for transcriptions
const mockTranscriptions = [
  { id: '1', title: 'Interview with John Doe', date: '2023-05-10', status: 'Completed', duration: '45:22' },
  { id: '2', title: 'Team Meeting', date: '2023-05-08', status: 'Completed', duration: '32:15' },
  { id: '3', title: 'Product Presentation', date: '2023-05-05', status: 'Completed', duration: '28:44' },
]

export default function DashboardPage() {
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <a 
              href="/dashboard/new" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              New Transcription
            </a>
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
                <div className="text-2xl font-bold">{mockTranscriptions.length}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-row items-center justify-between p-6 pb-2">
                <p className="text-sm font-medium">Total Hours</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">1.8</div>
                <p className="text-xs text-muted-foreground">+0.5 from last month</p>
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
                <div className="text-2xl font-bold">Free</div>
                <p className="text-xs text-muted-foreground">Upgrade for more features</p>
              </div>
              <div className="p-6 pt-0">
                <a href="/pricing" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-full">
                  Upgrade Plan
                </a>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Recent Transcriptions</h2>
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 font-medium p-4 bg-muted">
              <div>Title</div>
              <div>Date</div>
              <div>Status</div>
              <div>Duration</div>
              <div className="text-right">Actions</div>
            </div>
            <div className="divide-y">
              {mockTranscriptions.map((transcription) => (
                <div key={transcription.id} className="grid grid-cols-5 p-4 items-center">
                  <div className="font-medium">{transcription.title}</div>
                  <div className="text-muted-foreground">{transcription.date}</div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {transcription.status}
                    </span>
                  </div>
                  <div>{transcription.duration}</div>
                  <div className="flex justify-end gap-2">
                    <a 
                      href={`/dashboard/edit/${transcription.id}`} 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-16"
                    >
                      Edit
                    </a>
                    <a 
                      href={`/dashboard/view/${transcription.id}`} 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 w-16"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
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