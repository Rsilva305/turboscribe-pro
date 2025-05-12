import Link from 'next/link'
import { FaMicrophone } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaMicrophone className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">TurboScribe Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered transcription service
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Product</h3>
              <Link href="/features" className="text-sm text-muted-foreground hover:underline">
                Features
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:underline">
                Pricing
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:underline">
                FAQ
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Company</h3>
              <Link href="/about" className="text-sm text-muted-foreground hover:underline">
                About
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
                Contact
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:underline">
                Blog
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Legal</h3>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} TurboScribe Pro. All rights reserved.
        </div>
      </div>
    </footer>
  )
} 