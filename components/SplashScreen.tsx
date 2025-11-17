
import React from 'react';

interface SplashScreenProps {
    isVisible: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isVisible }) => {
    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col justify-center items-center bg-black text-white transition-opacity duration-700 ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="relative w-full h-full">
                 <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20 blur-sm"
                    style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}
                ></div>
            </div>
            <div id="splash-content" className="absolute flex flex-col items-center justify-center max-w-4/5 mx-auto text-center gap-5">
                <img
                    id="splash-logo"
                    src="https://i.picsum.photos/id/40/4106/2806.jpg?hmac=MY3_aVJoa9v_sIKi_vA_LR0-p2w-upf_hMQR3L6a_0U"
                    alt="Logo"
                    className="w-[clamp(180px,30vw,300px)] animate-bounce-in rounded-full"
                />
                <h1 id="splash-title" className="text-3xl font-bold opacity-0 animate-fade-in-up [animation-delay:0.3s]">
                    AI Innovation Hub
                </h1>
                <p id="splash-desc" className="text-lg max-w-xl opacity-0 animate-fade-in-up [animation-delay:0.6s]">
                    Connecting minds, skills, and opportunities through a decentralized professional network.
                </p>
            </div>
        </div>
    );
};

export default SplashScreen;