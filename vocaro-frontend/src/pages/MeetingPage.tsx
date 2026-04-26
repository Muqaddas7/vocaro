import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mic,
  ArrowLeft,
  Upload,
  Brain,
  CheckSquare,
  FileText,
  Loader,
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
    } catch (err) {
      toast.error("Meeting nahi mili!");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    toast.loading("Audio upload ho raha hai...", { id: "upload" });
    try {
      await audioApi.upload(id!, file);
      toast.success("Audio transcribe ho gaya!", { id: "upload" });
      await loadMeeting();
      window.location.reload();
    } catch (err) {
      toast.error("Upload fail ho gaya!", { id: "upload" });
    } finally {
      setUploading(false);
    }
  };

  const handleSummarize = async () => {
    setSummarizing(true);
    toast.loading("AI summary bana raha hai...", { id: "summarize" });
    try {
      const res = await meetingsApi.summarize(id!);
      setSummary({
        summary: res.data.summary,
        action_items: res.data.action_items,
        decisions: res.data.decisions,
        key_topics: res.data.key_topics,
      });
      toast.success("Summary ready!", { id: "summarize" });
      await loadMeeting();
    } catch (err) {
      toast.error("Summary fail ho gayi!", { id: "summarize" });
    } finally {
      setSummarizing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-slate-800 rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Mic className="w-6 h-6 text-violet-400" />
            <span className="font-semibold">{meeting?.title}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-10 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-slate-900 border border-slate-800 rounded-2xl"
        >
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Upload className="w-5 h-5 text-violet-400" />
            Upload Meeting Audio
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            MP3, WAV, MP4, M4A formats supported
          </p>
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-700 hover:border-violet-500 rounded-xl cursor-pointer transition-all bg-slate-800/50">
            <div className="flex flex-col items-center gap-3">
              {uploading ? (
                <Loader className="w-10 h-10 text-violet-400 animate-spin" />
              ) : (
                <Upload className="w-10 h-10 text-slate-500" />
              )}
              <span className="text-slate-400 text-sm">
                {uploading ? "Uploading..." : "Click to upload audio file"}
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

        {meeting?.transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-slate-900 border border-slate-800 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-violet-400" />
                Transcript
              </h2>
              <button
                onClick={handleSummarize}
                disabled={summarizing}
                className="flex items-center gap-2 px-5 py-2 bg-violet-600 hover:bg-violet-700 rounded-full text-sm font-medium transition-all disabled:opacity-50"
              >
                {summarizing ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Brain className="w-4 h-4" />
                )}
                {summarizing ? "Analyzing..." : "Generate Summary"}
              </button>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 max-h-48 overflow-y-auto">
              <p className="text-slate-300 text-sm leading-relaxed">
                {meeting.transcript}
              </p>
            </div>
          </motion.div>
        )}

        {(summary || meeting?.summary) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5 text-violet-400" />
                AI Summary
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {summary?.summary || meeting?.summary}
              </p>
            </div>

            {summary?.action_items && summary.action_items.length > 0 && (
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-green-400" />
                  Action Items
                </h3>
                <ul className="space-y-2">
                  {summary.action_items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-400 text-xs">{i + 1}</span>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {summary?.key_topics && summary.key_topics.length > 0 && (
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Key Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {summary.key_topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-sm"
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
