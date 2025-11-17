
import React from 'react';
import Icon from './Icon';

const SynapseView: React.FC = () => {
    return (
        <div className="w-full p-4 rounded-2xl bg-card-bg shadow-lg">
            <h2 className="text-2xl font-bold text-gold mb-4 text-left">Synapse Network</h2>
            <div className="relative w-full h-[600px] bg-radial-gradient(circle at center, #00111a 0%, #000 80%) border border-brand-cyan/20 rounded-xl overflow-hidden">
                <div className="flex justify-center items-center h-full">
                    <p className="text-brand-cyan font-mono">
                        <Icon name="circle-nodes" className="mr-2" />
                        Neural Network Visualization Loading...
                    </p>
                    {/* In a real app, a <canvas> or <svg> would be rendered here */}
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 border border-brand-cyan/30 rounded-full p-2 backdrop-blur-md text-brand-cyan font-mono text-sm shadow-lg shadow-brand-cyan/10">
                    <button className="bg-transparent border border-brand-cyan/50 rounded-full w-8 h-8 transition-colors hover:bg-brand-cyan/20"><Icon name="magnifying-glass-plus" /></button>
                    <button className="bg-transparent border border-brand-cyan/50 rounded-full w-8 h-8 transition-colors hover:bg-brand-cyan/20"><Icon name="magnifying-glass-minus" /></button>
                    <label className="flex items-center gap-2 pl-2">
                        <input type="checkbox" className="accent-brand-cyan" defaultChecked />
                        <span className="text-xs">Labels</span>
                    </label>
                    <div id="readout" className="text-xs text-brand-cyan/80 ml-2 border-l border-brand-cyan/30 pl-3">
                        Nodes: 256 | Connections: 1024
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SynapseView;