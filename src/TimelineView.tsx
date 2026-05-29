import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { ELECTION_STEPS } from './constants';

interface TimelineViewProps {
  language: string;
  speakText: (text: string) => void;
}

export function TimelineView({ speakText }: TimelineViewProps) {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Election Journey</h2>
        <p className="text-gray-400">Step-by-step interactive breakdown of the democratic process.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Holographic Step Viewer (Left) */}
        <div className="flex-1">
          <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-cyan-500/50 to-purple-500/50 overflow-hidden">
            <div className="absolute inset-0 bg-cyan-400/10 blur-xl"></div>
            <div className="relative bg-slate-950 p-8 rounded-3xl h-[400px] flex flex-col justify-center items-center text-center">
              
              <div className="absolute top-4 right-4 flex gap-2">
                 <button 
                    onClick={() => speakText(ELECTION_STEPS[activeStep-1].title + ". " + ELECTION_STEPS[activeStep-1].desc)}
                    className="p-2 rounded-full bg-white/5 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 transition-colors"
                    title="Read Aloud"
                 >
                   <Volume2 className="w-5 h-5" />
                 </button>
              </div>

              {ELECTION_STEPS.map(step => (
                <div 
                  key={step.id} 
                  className={`transition-all duration-500 absolute w-full px-8 flex flex-col items-center
                    ${activeStep === step.id ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 pointer-events-none z-0'}
                  `}
                >
                  <div className="w-24 h-24 rounded-full bg-cyan-900/40 border-2 border-cyan-400/50 flex items-center justify-center mb-6 text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.3)] relative">
                    <div className="absolute inset-0 border-2 border-cyan-400 rounded-full animate-ping opacity-20"></div>
                    {React.cloneElement(step.icon as React.ReactElement<any>, { className: 'w-10 h-10' })}
                  </div>
                  <div className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2">Step {step.id}</div>
                  <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-lg text-gray-300 max-w-md leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Navigation (Right) */}
        <div className="w-full md:w-1/3 relative">
           <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-white/10 rounded-full"></div>
           <div className="flex flex-col gap-2">
             {ELECTION_STEPS.map(step => (
               <button
                 key={step.id}
                 onClick={() => setActiveStep(step.id)}
                 className={`relative flex items-center p-3 rounded-xl transition-all duration-300 text-left group
                   ${activeStep === step.id ? 'bg-white/10' : 'hover:bg-white/5'}
                 `}
               >
                 <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center z-10 transition-colors
                   ${activeStep === step.id ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-slate-800 border border-white/20 text-gray-400 group-hover:text-white'}
                 `}>
                   {step.id}
                 </div>
                 <div className="ml-4">
                   <div className={`font-bold ${activeStep === step.id ? 'text-white' : 'text-gray-400'}`}>
                     {step.title}
                   </div>
                 </div>
               </button>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
