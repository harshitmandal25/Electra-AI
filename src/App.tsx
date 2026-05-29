import React, { useState } from 'react';
import { Bot, Map, Award, Globe, Volume2, VolumeX, ShieldCheck, AlertTriangle } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { HomeView } from './HomeView';
import { TimelineView } from './TimelineView';
import { QuizView } from './QuizView';
import { ChatWidget } from './ChatWidget';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('English');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Speech Synthesis
  const speakText = (text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to set language
    if (language === 'Hindi') utterance.lang = 'hi-IN';
    else if (language === 'Telugu') utterance.lang = 'te-IN';
    else utterance.lang = 'en-US';

    window.speechSynthesis.speak(utterance);
  };

  const toggleVoice = () => {
    if (voiceEnabled) window.speechSynthesis.cancel();
    setVoiceEnabled(!voiceEnabled);
  };

  const NavButton = ({ id, icon, label }: { id: string, icon: React.ReactNode, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
        activeTab === id 
          ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon}
      <span className="hidden md:inline font-medium tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <ParticleBackground />
      
      {/* GLOWING AMBIENT LIGHTS */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="relative">
              <Bot className="w-8 h-8 text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400 blur-md opacity-50"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text tracking-tighter">
              ElectraAI
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <NavButton id="timeline" icon={<Map className="w-5 h-5" />} label="Timeline" />
            <NavButton id="quiz" icon={<Award className="w-5 h-5" />} label="Quiz" />
            
            <div className="h-6 w-px bg-white/20 mx-2"></div>

            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-300 transition-colors"
                title="Change Language"
              >
                <Globe className="w-5 h-5" />
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-slate-900 border border-white/10 rounded-xl shadow-xl overflow-hidden backdrop-blur-md">
                  {['English', 'Hindi', 'Telugu'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setShowLangMenu(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-cyan-500/20 ${language === lang ? 'text-cyan-400 bg-white/5' : 'text-gray-300'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Voice Toggle */}
            <button 
              onClick={toggleVoice}
              className={`p-2 rounded-lg transition-colors ${voiceEnabled ? 'text-cyan-400 hover:bg-cyan-400/10' : 'text-gray-400 hover:bg-white/10'}`}
              title={voiceEnabled ? "Disable AI Voice" : "Enable AI Voice"}
            >
              {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 pt-24 pb-20 max-w-7xl mx-auto px-4 min-h-[calc(100vh-80px)]">
        {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === 'timeline' && <TimelineView language={language} speakText={speakText} />}
        {activeTab === 'quiz' && <QuizView />}
      </main>

      {/* FLOATING CHATBOT WIDGET */}
      <ChatWidget language={language} speakText={speakText} voiceEnabled={voiceEnabled} />

      {/* FOOTER / EMERGENCY INFO */}
      <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-lg relative z-20">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <ShieldCheck className="w-4 h-4 text-cyan-500" />
            <span>Verified Civic Tech Initiative • Hackathon Edition</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
              <AlertTriangle className="w-4 h-4" /> Election Helpline: 1950
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Report Fake News</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
