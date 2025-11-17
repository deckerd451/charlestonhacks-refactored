import React from 'react';
import type { Profile } from '../types';
import Icon from './Icon';

interface UserCardProps {
    profile: Profile;
}

const UserCard: React.FC<UserCardProps> = ({ profile }) => {
    return (
        <div className="bg-card-bg border border-zinc-700 rounded-xl p-4 flex flex-col items-center text-center shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-secondary/20 w-full">
            <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-gold"
            />
            <h3 className="text-lg font-bold text-gold">{profile.name}</h3>
            <a href={`mailto:${profile.email}`} className="text-sm text-zinc-400 mb-2 hover:text-gold transition-colors">{profile.email}</a>
            <p className="text-xs text-green-400 font-semibold">{profile.status}</p>

            <div className="w-full my-3">
                <div className="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gold"
                        style={{ width: `${profile.profileCompletion}%` }}
                    ></div>
                </div>
                <p className="text-xs text-zinc-400 mt-1">Profile {profile.profileCompletion}% Complete</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mt-2">
                {profile.skills.slice(0, 3).map((skill) => (
                    <div key={skill.name} className="flex items-center gap-2 bg-card-bg-light px-3 py-1.5 rounded-md border border-zinc-700 text-xs">
                        <span className="text-white/80">{skill.name}</span>
                        <span className="font-bold text-secondary">{skill.endorsements}</span>
                    </div>
                ))}
            </div>

            <button className="mt-4 w-full bg-gold text-black font-bold py-2 rounded-lg text-sm transition-transform hover:scale-105">
                <Icon name="plus" className="mr-2" /> Endorse Skills
            </button>
        </div>
    );
};

export default UserCard;
