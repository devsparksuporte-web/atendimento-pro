'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await fetchUserProfile(session.user);
            }
            setLoading(false);
        };

        getSession();

        // Listen for changes on auth state (sign in, sign out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session) {
                await fetchUserProfile(session.user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserProfile = async (authUser) => {
        try {
            const { data: profile, error } = await supabase
                .from('profiles')
                .select(`
          id,
          full_name,
          avatar_url,
          role,
          empresa_id,
          empresas (
            nome,
            tipo_negocio,
            theme_config,
            plano
          )
        `)
                .eq('id', authUser.id)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
                // Fallback for demo if profile doesn't exist yet but user is in Auth
                setUser({
                    id: authUser.id,
                    email: authUser.email,
                    name: authUser.email.split('@')[0],
                    role: 'owner',
                });
            } else {
                setUser({
                    id: authUser.id,
                    email: authUser.email,
                    name: profile.full_name,
                    avatar: profile.avatar_url,
                    role: profile.role,
                    empresaId: profile.empresa_id,
                    empresa: profile.empresas
                });
            }
        } catch (err) {
            console.error('Auth error:', err);
        }
    };

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { success: false, message: error.message };
        }
        return { success: true };
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error logging out:', error.message);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
