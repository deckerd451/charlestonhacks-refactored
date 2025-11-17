import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import MainLayout from './components/MainLayout';
import { AuthProvider } from './contexts/AuthContext';
import NeuralNetworkBackground from './components/NeuralNetworkBackground';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500); // Simulate loading time
        return () => clearTimeout(timer);
    }, []);

    return (
        <AuthProvider>
            <div className="relative min-h-screen w-full overflow-x-hidden font-sans text-white text-center bg-black">
                <NeuralNetworkBackground />

                <SplashScreen isVisible={loading} />

                <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                    {!loading && <MainLayout />}
                </div>
            </div>
        </AuthProvider>
    );
};

export default App;