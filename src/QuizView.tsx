import { useState } from 'react';
import { Award } from 'lucide-react';
import { QUIZ_QUESTIONS } from './constants';

export function QuizView() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    
    if (idx === QUIZ_QUESTIONS[currentQ].ans) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQ < QUIZ_QUESTIONS.length - 1) {
        setCurrentQ(q => q + 1);
        setSelectedOpt(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOpt(null);
    setIsAnswered(false);
  };

  return (
    <div className="max-w-2xl mx-auto pt-10 animate-in fade-in duration-500">
      <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        
        {!showResult ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <span className="text-cyan-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <Award className="w-4 h-4" /> Civic Awareness
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-medium">
                {currentQ + 1} / {QUIZ_QUESTIONS.length}
              </span>
            </div>

            <div className="w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500"
                style={{ width: `${((currentQ) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-6 leading-relaxed">
              {QUIZ_QUESTIONS[currentQ].q}
            </h3>

            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentQ].options.map((opt, idx) => {
                let btnClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-400/50 text-gray-300";
                
                if (isAnswered) {
                  if (idx === QUIZ_QUESTIONS[currentQ].ans) {
                    btnClass = "bg-green-500/20 border-green-500/50 text-green-300";
                  } else if (idx === selectedOpt) {
                    btnClass = "bg-red-500/20 border-red-500/50 text-red-300";
                  } else {
                    btnClass = "bg-white/5 border-white/5 text-gray-500 opacity-50";
                  }
                } else if (selectedOpt === idx) {
                  btnClass = "bg-cyan-500/20 border-cyan-400/50 text-cyan-300";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 font-medium ${btnClass}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-10 animate-in zoom-in duration-500">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center p-1 mb-6 shadow-[0_0_40px_rgba(6,182,212,0.4)]">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-4xl font-black">
                {score}/{QUIZ_QUESTIONS.length}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h3>
            <p className="text-gray-400 mb-8">
              {score === QUIZ_QUESTIONS.length ? "Perfect score! You are a master citizen." : "Great effort! Keep learning about democracy."}
            </p>
            <button 
              onClick={restart}
              className="px-8 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow-lg"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
