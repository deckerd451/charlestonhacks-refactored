export interface Profile {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
    status: string;
    badge: string;
    profileCompletion: number;
    skills: Skill[];
}

export interface Skill {
    name: string;
    endorsements: number;
}

export interface LeaderboardEntry {
    rank: number;
    name: string;
    value: number | string;
}

export interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}
