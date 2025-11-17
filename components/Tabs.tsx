
import React, { useState } from 'react';
import type { Tab } from '../types';

interface TabsProps {
    tabs: Tab[];
    initialTabId: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, initialTabId }) => {
    const [activeTab, setActiveTab] = useState(initialTabId);

    return (
        <div>
            <nav className="flex justify-center gap-2 mb-4 pb-2 border-b-2 border-zinc-700 flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors duration-300 whitespace-nowrap ${
                            activeTab === tab.id
                                ? 'bg-primary text-white'
                                : 'bg-card-bg-light text-white/70 hover:bg-zinc-700 hover:text-white'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
            <div>
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={activeTab === tab.id ? 'block' : 'hidden'}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tabs;