import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, Brain, CheckSquare, Zap, ArrowRight, Radio } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Mic className="w-5 h-5" />,
      title: "Voice Transcription",
      desc: "Upload any meeting audio. Whisper AI transcribes every word with military-grade precision.",
      accent: "blue",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "AI Analysis",
      desc: "LLaMA 3 processes your transcript and surfaces the insights that matter most.",
      accent: "cyan",
    },
    {
      icon: <CheckSquare className="w-5 h-5" />,
      title: "Action Extraction",
      desc: "Every commitment, task, and decision is automatically identified and organized.",
      accent: "blue",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Instant Delivery",
      desc: "From raw audio to structured intelligence in under 30 seconds.",
      accent: "cyan",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020B18] text-white overflow-hidden font-sans">
      {/* Grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scanlines */}
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)`,
        }}
      />

      {/* Floating orbs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-5 border-b border-white/[0.04]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
            <Radio className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-widest text-white">
            VOCARO
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <span className="text-white/30 text-sm">AI Meeting Intelligence</span>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Open Dashboard
          </button>
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-mono tracking-widest mb-10 uppercase"
        >
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          Powered by Whisper + LLaMA 3
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.1] tracking-tight mb-8 max-w-4xl"
        >
          <span className="text-white">Stop Taking Notes.</span>
          <br />
          <span
            className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent"
            style={{
              backgroundSize: "200% auto",
              animation: "shimmer 4s linear infinite",
            }}
          >
            Start Taking Action.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-white/40 text-lg max-w-xl mb-12 leading-relaxed"
        >
          VOCARO intelligently converts your meeting recordings into structured
          summaries, action items, and decisions in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-16 mt-20 pt-10 border-t border-white/[0.04]"
        >
          {[
            { value: "10x", label: "Faster than manual notes" },
            { value: "< 30s", label: "Time to insights" },
            { value: "100%", label: "Automatic extraction" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-blue-400 mb-1 tabular-nums">
                {stat.value}
              </div>
              <div className="text-white/25 text-xs uppercase tracking-widest font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-10 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400/60 text-xs font-mono tracking-widest uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-4xl font-black text-white">
            Intelligence, Automated.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="group p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-blue-500/20 transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-500/15 transition-colors">
                {f.icon}
              </div>
              <div className="text-[10px] text-white/20 font-mono tracking-widest mb-2">
                0{i + 1}
              </div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 text-center py-24 px-8">
        <div className="max-w-2xl mx-auto p-14 rounded-2xl border border-blue-500/10 bg-gradient-to-b from-blue-500/[0.04] to-transparent">
          <p className="text-blue-400/50 text-xs font-mono tracking-widest uppercase mb-4">
            Get Started Today
          </p>
          <h2 className="text-4xl font-black mb-4 text-white">
            Your meetings deserve better.
          </h2>
          <p className="text-white/30 text-base mb-10 leading-relaxed">
            Join teams who have eliminated manual note-taking forever.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg font-bold text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20"
          >
            Get Started
          </button>
        </div>
      </section>

      <footer className="relative z-10 text-center py-8 border-t border-white/[0.04] text-white/40 text-xs font-mono tracking-widest">
        <p>{"VOCARO AI - Built by Muqaddas - 2026"}</p>
      </footer>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}
