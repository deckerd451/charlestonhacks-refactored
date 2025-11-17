import React from 'react';
import Footer from './Footer';
import ProfileCard from './ProfileCard';
import Auth from './Auth';

const MainLayout: React.FC = () => {
    return (
        <div className="relative flex flex-col min-h-screen justify-center items-center p-4">
            <Auth />
            <main className="flex-grow flex justify-center items-center w-full">
                <ProfileCard />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;