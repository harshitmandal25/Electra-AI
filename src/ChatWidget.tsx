import { useState, useEffect, useRef } from 'react';
import { Bot, ChevronRight, Mic, Send } from 'lucide-react';
import { callGemini } from './helpers';

interface ChatWidgetProps {
  language: string;
  speakText: (text: string) => void;
  voiceEnabled: boolean;
}

export function ChatWidget({ language, speakText, voiceEnabled }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hello! I am Electra, your AI democracy assistant. Ask me anything about elections, voter IDs, or political processes!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const newMsgs = [...messages, { role: 'user', text: textToSend }];
    setMessages(newMsgs);
    setInput("");
    setIsLoading(true);

    const reply = await callGemini(textToSend, messages.slice(-4), language);
    
    setMessages([...newMsgs, { role: 'model', text: reply }]);
    setIsLoading(false);

    if (voiceEnabled) {
      speakText(reply);
    }
  };

  const toggleListen = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) return;

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'Hindi' ? 'hi-IN' : language === 'Telugu' ? 'te-IN' : 'en-US';
    recognition.continuous = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  const commonPrompts = ["What is the Model Code of Conduct?", "How do I check my Voter ID?", "What is NOTA?"];

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] z-50 transition-all duration-500 hover:scale-110 flex items-center justify-center
          ${isOpen ? 'bg-red-500 rotate-90 shadow-red-500/50' : 'bg-gradient-to-r from-purple-600 to-blue-600'}
        `}
      >
        {isOpen ? <ChevronRight className="w-6 h-6 text-white" /> : <Bot className="w-8 h-8 text-white" />}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[70vh] bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col z-40 transition-all duration-300 origin-bottom-right overflow-hidden
        ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-black/20 flex items-center gap-3">
          <div className="relative">
            <Bot className="w-8 h-8 text-purple-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
          </div>
          <div>
            <h3 className="font-bold text-white leading-tight">Electra Assistant</h3>
            <p className="text-xs text-green-400 font-medium">Online • AI Ready</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {commonPrompts.map((p, i) => (
                <button key={i} onClick={() => handleSend(p)} className="text-xs bg-white/5 border border-white/10 hover:border-cyan-400 text-gray-300 px-3 py-1.5 rounded-full transition-colors">
                  {p}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-md
                ${msg.role === 'user' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none' 
                  : 'bg-white/10 text-gray-200 border border-white/5 rounded-tl-none'
                }
              `}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 border border-white/5 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center h-10 w-16">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-black/30 border-t border-white/10">
          <div className="relative flex items-center bg-slate-800 rounded-xl border border-white/10 focus-within:border-cyan-500/50 transition-colors">
            <button 
              onClick={toggleListen}
              className={`p-3 transition-colors ${isListening ? 'text-red-400 animate-pulse' : 'text-gray-400 hover:text-cyan-400'}`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about elections..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-gray-500 py-3"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="p-3 text-cyan-400 hover:text-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
