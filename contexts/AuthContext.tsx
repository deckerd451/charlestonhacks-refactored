import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import type { Profile } from '../types';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          setLoading(true);
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
            setProfile(null);
          } else if (data) {
            setProfile({
                id: data.id,
                name: data.name,
                email: data.email,
                avatarUrl: data.avatar_url,
                status: data.status,
                badge: data.badge,
                profileCompletion: data.profile_completion,
                skills: [], // Skills for the logged-in user can be fetched separately if needed
            });
          }
        } else {
            setProfile(null);
        }
        setLoading(false);
      }
    );
    
    // Check initial session
    const checkInitialSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        if(!session?.user) setLoading(false);
    }
    checkInitialSession();


    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    profile,
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
