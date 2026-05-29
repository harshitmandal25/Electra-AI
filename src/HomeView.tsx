import { Bot, Map, ShieldCheck, ChevronRight, Award, Sparkles } from 'lucide-react';

export function HomeView({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700">
      <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium backdrop-blur-md">
        <Sparkles className="w-4 h-4 inline-block mr-2 mb-0.5" />
        AI-Powered Democracy Assistant
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
        Understand Elections <br />
        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
          Smarter & Faster
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
        ElectraAI simplifies complex voting procedures, election timelines, and civic duties through interactive holographic interfaces and real-time AI guidance.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => setActiveTab('timeline')}
          className="px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2"
        >
          Explore Timeline <ChevronRight className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setActiveTab('quiz')}
          className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all backdrop-blur-md flex items-center justify-center gap-2"
        >
          <Award className="w-5 h-5 text-purple-400" /> Take Awareness Quiz
        </button>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl">
        {[
          { icon: <Bot className="w-8 h-8 text-cyan-400" />, title: "AI Chat Assistant", desc: "Ask any election-related question in your language and get instant, simplified answers." },
          { icon: <Map className="w-8 h-8 text-purple-400" />, title: "Interactive Flow", desc: "Visualize the journey of a vote from registration to the final counting day." },
          { icon: <ShieldCheck className="w-8 h-8 text-blue-400" />, title: "Verified Info", desc: "Built with guardrails to provide neutral, factual, and accurate civic information." }
        ].map((feat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors text-left group cursor-default">
            <div className="mb-4 p-3 rounded-lg bg-black/30 inline-block border border-white/5 group-hover:scale-110 transition-transform">
              {feat.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-100">{feat.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
