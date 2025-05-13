import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SupabaseProvider } from "@/components/providers/supabase-provider";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TurboScribe Pro - AI-powered Audio Transcription",
  description: "Transform audio and video files into accurate text with our powerful AI transcription service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SupabaseProvider>
            <ReactQueryProvider>
              {children}
              <Toaster position="bottom-right" />
            </ReactQueryProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
