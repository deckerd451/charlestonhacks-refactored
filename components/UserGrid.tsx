import React, { useState, useEffect } from 'react';
import type { Profile } from '../types';
import UserCard from './UserCard';
import { supabase } from '../lib/supabaseClient';
import { getErrorMessage } from '../lib/errorUtils';

// Helper to map Supabase data (snake_case) to our app's Profile type (camelCase)
const mapSupabaseProfileToAppProfile = (supabaseUser: any): Profile => {
    // The query fetches related `user_skills` which has `endorsements` and a nested `skills` object with `name`.
    const skills = supabaseUser.user_skills.map((userSkill: any) => ({
        name: userSkill.skills.name,
        endorsements: userSkill.endorsements,
    }));

    return {
        id: supabaseUser.id,
        name: supabaseUser.name,
        email: supabaseUser.email,
        avatarUrl: supabaseUser.avatar_url,
        status: supabaseUser.status,
        badge: supabaseUser.badge,
        profileCompletion: supabaseUser.profile_completion,
        skills: skills,
    };
};


const UserGrid: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);
    
                // Fetch profiles and their related skills via the user_skills join table.
                const { data, error } = await supabase
                    .from('profiles')
                    .select(`
                        *,
                        user_skills (
                            endorsements,
                            skills (name)
                        )
                    `);
    
                if (error) throw error;
    
                if (data) {
                    const mappedProfiles = data.map(mapSupabaseProfileToAppProfile);
                    setProfiles(mappedProfiles);
                }
            } catch (err: unknown) {
                console.error('Error fetching users:', err);
                setError(`Failed to load team directory: ${getErrorMessage(err)}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    return (
        <div className="w-full p-4 rounded-2xl bg-card-bg shadow-lg">
             <h2 className="text-2xl font-bold text-gold mb-4">Team Directory</h2>
             {loading && <p className="text-center text-zinc-400">Loading Team...</p>}
             {error && <p className="text-center text-red-500 break-words">{error}</p>}
             {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {profiles.map(profile => (
                        <UserCard key={profile.id} profile={profile} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserGrid;