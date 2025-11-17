import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';

const ClickableArea: React.FC<{ position: string; icon: string; sizeClass: string; onClick?: () => void }> = ({ position, icon, sizeClass, onClick }) => {
    const positionClasses: { [key: string]: string } = {
        'top-left': 'top-[3%] left-[5%]',
        'top-right': 'top-[3%] right-[5%]',
        'bottom-left': 'bottom-[3%] left-[5%]',
        'bottom-right': 'bottom-[3%] right-[5%]',
        'top-center': 'top-[2%] left-1/2 -translate-x-1/2',
        'bottom-center': 'bottom-[2%] left-1/2 -translate-x-1/2',
        'middle-left': 'top-1/2 left-[5%] -translate-y-1/2',
        'middle-right': 'top-1/2 right-[5%] -translate-y-1/2',
        'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    };

    return (
        <button onClick={onClick} className={`absolute z-10 aspect-square rounded-full shadow-lg bg-black/30 backdrop-blur-sm opacity-0 animate-fade-in-scale-up transition-all hover:opacity-100 hover:shadow-2xl hover:bg-black/50 ${positionClasses[position]} ${sizeClass}`}>
            <img src={icon} alt={`${position} icon`} className="w-full h-full p-2 object-contain" />
        </button>
    );
};

const Countdown: React.FC = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2025-01-01") - +new Date();
        let timeLeft: { [key: string]: number } = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map(interval => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return null;
        }
        return (
            <span key={interval}>
                {String(timeLeft[interval]).padStart(2, '0')}{interval.charAt(0)}
            </span>
        );
    });

    return (
        <div className="absolute top-[17%] left-1/2 -translate-x-1/2 text-sm md:text-base font-bold text-secondary bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm whitespace-nowrap space-x-1">
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    );
};

const BTCPrice: React.FC = () => {
    // In a real app, this would fetch from an API
    const [price, setPrice] = useState(69420.69);

     useEffect(() => {
        const interval = setInterval(() => {
            setPrice(p => p + (Math.random() - 0.5) * 100);
        }, 2000);
        return () => clearInterval(interval);
    }, []);


    return (
         <div className="absolute bottom-[17%] left-1/2 -translate-x-1/2 text-sm md:text-base font-bold text-secondary bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm">
            BTC: ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
    )
}

const ProfileCard: React.FC = () => {
    const { session, profile } = useAuth();
    const [isFlipped, setIsFlipped] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleFlip = () => {
        setIsFlipped(prev => !prev);
    };

    useEffect(() => {
        if (isFlipped) {
            videoRef.current?.play().catch(error => {
                console.error("Video play failed:", error);
            });
        } else {
            videoRef.current?.pause();
        }
    }, [isFlipped]);


    const cardContent = () => {
        if (!session || !profile) {
            return <Login />;
        }

        return (
            <div className={`relative w-full h-full transition-transform duration-1000 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Card Front */}
                <div className="absolute w-full h-full backface-hidden">
                    <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                    
                    <Countdown />
                    <BTCPrice />

                    {/* Clickable Areas */}
                    <ClickableArea position="top-left" icon="https://picsum.photos/id/10/100/100" sizeClass="w-[15%]" />
                    <ClickableArea position="top-right" icon="https://picsum.photos/id/20/100/100" sizeClass="w-[15%]" />
                    <ClickableArea position="bottom-left" icon="https://picsum.photos/id/30/100/100" sizeClass="w-[15%]" />
                    <ClickableArea position="bottom-right" icon="https://picsum.photos/id/40/100/100" sizeClass="w-[15%]" />
                    <ClickableArea position="top-center" icon="https://picsum.photos/id/50/100/100" sizeClass="w-[20%]" />
                    <ClickableArea position="bottom-center" icon="https://picsum.photos/id/60/100/100" sizeClass="w-[20%]" />
                    <ClickableArea position="center" icon="https://picsum.photos/id/70/100/100" sizeClass="w-[25%]" onClick={handleFlip} />
                </div>

                {/* Card Back */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <video
                        ref={videoRef}
                        src="https://videos.pexels.com/video-files/3214434/3214434-hd_1920_1080_25fps.mp4"
                        className="w-full h-full object-cover"
                        loop
                        muted
                        playsInline
                    />
                     <ClickableArea position="center" icon="https://picsum.photos/id/77/100/100" sizeClass="w-[25%]" onClick={handleFlip} />
                </div>
            </div>
        );
    }


    return (
        <div className="panel w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-md mx-auto perspective-1000">
            <div className="media-container relative aspect-[3/4] shadow-2xl rounded-2xl overflow-hidden bg-zinc-900">
                {cardContent()}
            </div>
        </div>
    );
};

export default ProfileCard;