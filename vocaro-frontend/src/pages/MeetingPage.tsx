import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  Brain,
  CheckSquare,
  FileText,
  Loader,
  Radio,
} from "lucide-react";
import { meetingsApi, audioApi } from "../utils/api";
import type { Meeting, MeetingSummary } from "../types";
import toast from "react-hot-toast";

export default function MeetingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [summary, setSummary] = useState<MeetingSummary | null>(null);

  useEffect(() => {
    loadMeeting();
  }, [id]);

  const loadMeeting = async () => {
    try {
      const res = await meetingsApi.getOne(id!);
      setMeeting(res.data);
    } catch {
      toast.error("Session not found");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    toast.loading("Processing audio...", { id: "upload" });
    try {
      await audioApi.upload(id!, file);
      toast.success("Transcription complete", { id: "upload" });
      await loadMeeting();
      window.location.reload();
    } catch {
      toast.error("Upload failed", { id: "upload" });
    } finally {
      setUploading(false);
    }
  };

  const handleSummarize = async () => {
    setSummarizing(true);
    toast.loading("Generating intelligence...", { id: "summarize" });
    try {
      const res = await meetingsApi.summarize(id!);
      setSummary({
        summary: res.data.summary,
        action_items: res.data.action_items,
        decisions: res.data.decisions,
        key_topics: res.data.key_topics,
      });
      toast.success("Analysis complete", { id: "summarize" });
      await loadMeeting();
    } catch {
      toast.error("Analysis failed", { id: "summarize" });
    } finally {
      setSummarizing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020B18] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020B18] text-white">
      {/* Grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center gap-4 px-10 py-5 border-b border-white/[0.06]">
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 hover:bg-white/[0.06] rounded-lg transition-all duration-200 text-white/60 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
            <Radio className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-base font-black tracking-widest">VOCARO</span>
        </div>
        <span className="text-white/30 text-xs font-mono">/</span>
        <span className="text-white/60 text-xs font-mono">
          {meeting?.title}
        </span>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-10 py-10 space-y-4">
        {/* Upload */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-xl border border-white/[0.08] bg-white/[0.02]"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1 font-mono">
            Audio Input
          </h2>
          <p className="text-white/60 text-xs mb-6">
            MP3, WAV, MP4, M4A supported
          </p>

          <label className="flex flex-col items-center justify-center w-full h-36 border border-dashed border-white/[0.10] hover:border-blue-500/40 rounded-xl cursor-pointer transition-all duration-200 bg-white/[0.01] hover:bg-blue-500/[0.03] group">
            <div className="flex flex-col items-center gap-3">
              {uploading ? (
                <Loader className="w-8 h-8 text-blue-400 animate-spin" />
              ) : (
                <Upload className="w-8 h-8 text-white/30 group-hover:text-blue-400 transition-colors duration-200" />
              )}
              <span className="text-white/50 text-xs group-hover:text-white/70 transition-colors">
                {uploading
                  ? "Processing..."
                  : "Drop audio file or click to browse"}
              </span>
            </div>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </motion.div>

        {/* Transcript */}
        {meeting?.transcript && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-xl border border-white/[0.08] bg-white/[0.02]"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/70 font-mono">
                  Transcript
                </h2>
              </div>
              <button
                onClick={handleSummarize}
                disabled={summarizing}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/20"
              >
                {summarizing ? (
                  <Loader className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Brain className="w-3.5 h-3.5" />
                )}
                {summarizing ? "Analyzing..." : "Generate Intelligence"}
              </button>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 max-h-44 overflow-y-auto">
              <p className="text-white/75 text-sm leading-relaxed">
                {meeting.transcript}
              </p>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {(summary || meeting?.summary) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* AI Summary */}
            <div className="p-8 rounded-xl border border-blue-500/20 bg-blue-500/[0.04]">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 font-mono">
                  AI Summary
                </h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {summary?.summary || meeting?.summary}
              </p>
            </div>

            {/* Action Items */}
            {summary?.action_items && summary.action_items.length > 0 && (
              <div className="p-8 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03]">
                <div className="flex items-center gap-2 mb-5">
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 font-mono">
                    Action Items
                  </h3>
                </div>
                <ul className="space-y-3">
                  {summary.action_items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-white/75 text-sm"
                    >
                      <span className="text-emerald-400/70 font-mono text-xs mt-0.5 w-5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Topics */}
            {summary?.key_topics && summary.key_topics.length > 0 && (
              <div className="p-8 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <div className="flex items-center gap-2 mb-5">
                  <FileText className="w-4 h-4 text-white/50" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 font-mono">
                    Key Topics
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {summary.key_topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white/[0.05] border border-white/[0.10] text-white/60 rounded-lg text-xs font-mono"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
