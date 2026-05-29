import { User, ShieldCheck, BookOpen, Volume2, CheckCircle2, Zap, Award } from 'lucide-react';

export const apiKey = ""; // API key is injected by the environment

export const ELECTION_STEPS = [
  { id: 1, title: "Registration", desc: "Register online via the NVSP portal or offline using Form 6 if you are 18+.", icon: <User className="w-6 h-6" /> },
  { id: 2, title: "Voter ID", desc: "Verification by BLO and issuance of EPIC (Electoral Photo Identity Card).", icon: <ShieldCheck className="w-6 h-6" /> },
  { id: 3, title: "Nomination", desc: "Candidates file their nomination papers and affidavits to the Returning Officer.", icon: <BookOpen className="w-6 h-6" /> },
  { id: 4, title: "Campaigning", desc: "Parties share manifestos. Ends 48 hours before polling (Silence Period).", icon: <Volume2 className="w-6 h-6" /> },
  { id: 5, title: "Polling Day", desc: "Voters cast their vote using EVM & VVPAT. You can also choose NOTA.", icon: <CheckCircle2 className="w-6 h-6" /> },
  { id: 6, title: "Counting", desc: "EVMs are opened in secure counting centers under ECI supervision.", icon: <Zap className="w-6 h-6" /> },
  { id: 7, title: "Results", desc: "The candidate with the most votes in a constituency is declared the winner.", icon: <Award className="w-6 h-6" /> },
];

export const QUIZ_QUESTIONS = [
  { q: "What is the minimum age to vote in India?", options: ["16 Years", "18 Years", "21 Years", "25 Years"], ans: 1 },
  { q: "What does NOTA stand for?", options: ["None of the Above", "New Option To Agree", "National Organization of Trade", "No Other True Alternative"], ans: 0 },
  { q: "Which machine is used to cast votes electronically?", options: ["ATM", "EVM", "VVPAT", "POS"], ans: 1 },
  { q: "What is the Model Code of Conduct (MCC)?", options: ["Dress code for politicians", "Guidelines for conduct during elections", "A secret voting protocol", "Rules for news channels only"], ans: 1 },
  { q: "What document is primarily issued to registered voters?", options: ["Passport", "PAN Card", "EPIC (Voter ID)", "Ration Card"], ans: 2 },
];
