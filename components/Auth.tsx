import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Icon from './Icon';

const Auth: React.FC = () => {
  const { profile, signOut } = useAuth();

  if (!profile) {
    return null;
  }

  return (
    <div className="absolute top-4 right-4 flex items-center gap-4 z-20">
      <div className="hidden sm:flex items-center gap-2 bg-card-bg-light text-gold px-4 py-2 rounded-lg text-sm font-bold shadow-md">
        <img src={profile.avatarUrl} alt={profile.name} className="w-6 h-6 rounded-full object-cover" />
        <span>{profile.name}</span>
      </div>
      <button
        onClick={signOut}
        className="bg-primary/80 hover:bg-primary text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 text-sm shadow-md"
      >
        <Icon name="right-from-bracket" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
};

export default Auth;
