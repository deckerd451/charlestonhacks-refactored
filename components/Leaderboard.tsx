import React, { useState, useEffect } from 'react';
import type { LeaderboardEntry, Tab } from '../types';
import Tabs from './Tabs';
import { supabase } from '../lib/supabaseClient';
import { getErrorMessage } from '../lib/errorUtils';


const LeaderboardTable: React.FC<{ data: LeaderboardEntry[], isLoading: boolean, error: string | null }> = ({ data, isLoading, error }) => {
    if (isLoading) {
        return <p className="text-center text-zinc-400 py-4">Loading Rankings...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 py-4 break-words">{error}</p>;
    }
    
    return (
        <div className="space-y-2">
            {data.map((item) => (
                <div key={item.rank} className="grid grid-cols-[30px_1fr_auto] items-center p-2 rounded-lg bg-black/20 text-sm">
                    <span className="font-bold text-gold">{item.rank}</span>
                    <span className="text-left text-white/90 pl-2">{item.name}</span>
                    <span className="font-bold text-right text-secondary">{item.value}</span>
                </div>
            ))}
        </div>
    );
};


const Leaderboard: React.FC = () => {
    const [topSkills, setTopSkills] = useState<LeaderboardEntry[]>([]);
    const [topContributors, setTopContributors] = useState<LeaderboardEntry[]>([]);
    const [skillsLoading, setSkillsLoading] = useState(true);
    const [contributorsLoading, setContributorsLoading] = useState(true);
    const [skillsError, setSkillsError] = useState<string | null>(null);
    const [contributorsError, setContributorsError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopSkills = async () => {
            try {
                setSkillsLoading(true);
                setSkillsError(null);
                const { data, error } = await supabase.rpc('get_top_skills');
                if (error) throw error;

                const formattedSkills = data.map((s: any, index: number) => ({
                    rank: index + 1,
                    name: s.name,
                    value: s.total_endorsements,
                }));
                setTopSkills(formattedSkills);
            } catch (err: unknown) {
                console.error('Error fetching top skills:', err);
                setSkillsError(`Could not load skills data: ${getErrorMessage(err)}`);
            } finally {
                setSkillsLoading(false);
            }
        };

        const fetchTopContributors = async () => {
            try {
                setContributorsLoading(true);
                setContributorsError(null);
                const { data, error } = await supabase.rpc('get_top_contributors');
                if (error) throw error;
                
                const formattedContributors = data.map((c: any, index: number) => ({
                    rank: index + 1,
                    name: c.name,
                    value: `${c.total_endorsements} endorsements`,
                }));
                setTopContributors(formattedContributors);
            } catch (err: unknown) {
                console.error('Error fetching top contributors:', err);
                setContributorsError(`Could not load contributors data: ${getErrorMessage(err)}`);
            } finally {
                setContributorsLoading(false);
            }
        };

        fetchTopSkills();
        fetchTopContributors();
    }, []);


    const tabs: Tab[] = [
        {
            id: 'skills',
            label: 'Top Skills',
            content: <LeaderboardTable data={topSkills} isLoading={skillsLoading} error={skillsError} />
        },
        {
            id: 'contributors',
            label: 'Top Contributors',
            content: <LeaderboardTable data={topContributors} isLoading={contributorsLoading} error={contributorsError} />
        }
    ];

    return (
        <div className="w-full p-4 rounded-2xl bg-card-bg shadow-lg">
            <h2 className="text-2xl font-bold text-gold mb-4">Leaderboard</h2>
            <Tabs tabs={tabs} initialTabId="skills" />
        </div>
    );
};

export default Leaderboard;