
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="py-8 text-center opacity-0 animate-fade-in-up">
            <h1 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-gold to-orange-500 bg-clip-text text-transparent">
                Innovation Engine
            </h1>
            <p className="text-xl text-white/80">
                Discover and Connect with Top Talent
            </p>
        </header>
    );
};

export default Header;