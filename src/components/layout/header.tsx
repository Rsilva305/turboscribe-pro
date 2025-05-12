'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { FaMicrophone } from 'react-icons/fa'

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <FaMicrophone className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold">
            TurboScribe Pro
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-sm font-medium hover:underline">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
} 