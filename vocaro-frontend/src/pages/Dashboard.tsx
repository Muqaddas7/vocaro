import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  ArrowRight,
  Clock,
  Radio,
  FileText,
  CheckSquare,
} from "lucide-react";
import { meetingsApi } from "../utils/api";
import type { Meeting } from "../types";
import toast from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      const res = await meetingsApi.getAll();
      setMeetings(res.data.meetings);
    } catch (err) {
      toast.error("Failed to load meetings");
    } finally {
      setLoading(false);
    }
  };

  const createMeeting = async () => {
    setCreating(true);
    try {
      const title = `Meeting ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
      const res = await meetingsApi.create(title);
      navigate(`/meeting/${res.data.meeting.id}`);
    } catch (err) {
      toast.error("Failed to create meeting");
    } finally {
      setCreating(false);
    }
  };

  const deleteMeeting = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await meetingsApi.delete(id);
      setMeetings(meetings.filter((m) => m.id !== id));
      toast.success("Meeting deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

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

      {/* Orbs */}
      <div className="fixed top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-5 border-b border-white/[0.04]">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
            <Radio className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-widest">VOCARO</span>
        </div>
        <button
          onClick={createMeeting}
          disabled={creating}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          {creating ? "Creating..." : "New Meeting"}
        </button>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-10 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black mb-1">Meeting Intelligence</h1>
          <p className="text-white/30 text-sm font-mono">
            {meetings.length} session{meetings.length !== 1 ? "s" : ""} recorded
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-32">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && meetings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Radio className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl font-black mb-2">No sessions yet</h2>
            <p className="text-white/30 text-sm mb-8 max-w-xs">
              Create your first meeting session and start extracting
              intelligence from your conversations.
            </p>
            <button
              onClick={createMeeting}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-sm transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              New Meeting
            </button>
          </motion.div>
        )}

        {/* Meetings Grid */}
        {!loading && meetings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {meetings.map((meeting, i) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => navigate(`/meeting/${meeting.id}`)}
                className="group p-6 bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/25 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-9 h-9 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
                    <Radio className="w-4 h-4 text-blue-400" />
                  </div>
                  <button
                    onClick={(e) => deleteMeeting(meeting.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 rounded-lg text-red-400/60 hover:text-red-400 transition-all duration-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="font-semibold text-white mb-3 truncate text-sm">
                  {meeting.title}
                </h3>

                <div className="mb-4">
                  {meeting.summary ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-md font-mono">
                      <CheckSquare className="w-3 h-3" />
                      Summary Ready
                    </span>
                  ) : meeting.transcript ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs rounded-md font-mono">
                      <FileText className="w-3 h-3" />
                      Transcribed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 text-white/30 text-xs rounded-md font-mono">
                      <Clock className="w-3 h-3" />
                      Awaiting Audio
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-white/20 text-xs font-mono">
                  <span>
                    {new Date(meeting.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:text-blue-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
