import React from 'react';

const DesktopIcons: React.FC = () => (
    <div className="hidden lg:flex fixed top-10 right-10 z-50 flex-col items-center gap-6">
        <a href="#" className="w-16 h-16 text-3xl flex justify-center items-center rounded-full text-white bg-black/20 backdrop-blur-sm transition-all hover:bg-zinc-800 hover:text-secondary hover:shadow-lg hover:shadow-secondary/30">
            <i className="fab fa-discord"></i>
        </a>
        <a href="#" className="w-16 h-16 text-3xl flex justify-center items-center rounded-full text-white bg-black/20 backdrop-blur-sm transition-all hover:bg-zinc-800 hover:text-secondary hover:shadow-lg hover:shadow-secondary/30">
            <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="w-16 h-16 text-3xl flex justify-center items-center rounded-full text-white bg-black/20 backdrop-blur-sm transition-all hover:bg-zinc-800 hover:text-secondary hover:shadow-lg hover:shadow-secondary/30">
            <i className="fab fa-github"></i>
        </a>
        <a href="mailto:hello@example.com" className="w-16 h-16 text-3xl flex justify-center items-center rounded-full text-white bg-black/20 backdrop-blur-sm transition-all hover:bg-zinc-800 hover:text-secondary hover:shadow-lg hover:shadow-secondary/30">
            <i className="fas fa-envelope"></i>
        </a>
        <a href="#" className="w-16 h-16 text-3xl flex justify-center items-center rounded-full text-brand-pink bg-black/20 backdrop-blur-sm transition-all hover:bg-zinc-800 hover:shadow-lg hover:shadow-brand-pink/30">
            <i className="fas fa-heart"></i>
        </a>
    </div>
);

const MobileIcons: React.FC = () => (
    <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center p-2 bg-black/30 backdrop-blur-md rounded-t-2xl">
        <a href="#" className="text-3xl p-3 text-brand-cyan transition-colors hover:text-white"><i className="fab fa-discord"></i></a>
        <a href="#" className="text-3xl p-3 text-brand-cyan transition-colors hover:text-white"><i className="fab fa-twitter"></i></a>
        <a href="#" className="text-3xl p-3 text-brand-cyan transition-colors hover:text-white"><i className="fab fa-github"></i></a>
        <a href="mailto:hello@example.com" className="text-3xl p-3 text-brand-cyan transition-colors hover:text-white"><i className="fas fa-envelope"></i></a>
        <a href="#" className="text-3xl p-3 text-brand-pink transition-colors hover:text-white"><i className="fas fa-heart"></i></a>
    </div>
);


const Footer: React.FC = () => {
    return (
        <footer>
            <DesktopIcons />
            <MobileIcons />
        </footer>
    );
};

export default Footer;