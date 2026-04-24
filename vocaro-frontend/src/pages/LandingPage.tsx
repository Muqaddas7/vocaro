import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, Brain, CheckSquare, Zap, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Record & Upload",
      desc: "Upload any meeting audio or record directly",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Transcription",
      desc: "Whisper AI converts speech to text instantly",
    },
    {
      icon: <CheckSquare className="w-6 h-6" />,
      title: "Smart Summary",
      desc: "GPT-4 extracts key points and action items",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Results",
      desc: "Get meeting insights in seconds",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Mic className="w-8 h-8 text-violet-400" />
          <span className="text-2xl font-bold text-white">Vocaro</span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded-full text-sm font-medium transition-all"
        >
          Open App
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm mb-6">
            🎙️ AI Meeting Intelligence
          </div>

          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Every Word. <span className="text-violet-400">Every Action.</span>
            <br />
            Every Outcome.
          </h1>

          <p className="text-slate-400 text-xl max-w-2xl mb-10">
            Vocaro turns your meetings into actionable insights. Upload audio,
            get AI-powered summaries and action items instantly.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-full font-medium text-lg transition-all hover:scale-105"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 border border-slate-700 hover:border-violet-500 rounded-full font-medium text-lg transition-all"
            >
              View Demo
            </button>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <div className="px-8 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          How Vocaro Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-slate-900 border border-slate-800 hover:border-violet-500/50 rounded-2xl transition-all"
            >
              <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400 mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-slate-800 text-slate-500 text-sm">
        Built with ❤️ by Muqaddas — Vocaro AI © 2026
      </footer>
    </div>
  );
}
