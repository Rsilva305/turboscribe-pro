'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Session, AuthResponse, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// Define the context types
type SupabaseContextType = {
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<{ error: AuthError | null }>;
};

// Create the context
const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

// Provider component
export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get the initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setIsLoading(false);
      
      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    getSession();
  }, []);

  // Auth methods
  const signUp = (email: string, password: string) => {
    return supabase.auth.signUp({ email, password });
  };

  const signIn = (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = () => {
    return supabase.auth.signOut();
  };

  const value = {
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

// Custom hook to use the Supabase context
export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
} 