import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, Plus, Trash2, ArrowRight, Clock } from "lucide-react";
import { meetingsApi } from "../utils/api";
import type { Meeting } from "../types";
import toast from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // Sari meetings load karo
  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      const res = await meetingsApi.getAll();
      setMeetings(res.data.meetings);
    } catch (err) {
      toast.error("Meetings load nahi hui!");
    } finally {
      setLoading(false);
    }
  };

  // Nai meeting banao
  const createMeeting = async () => {
    setCreating(true);
    try {
      const title = `Meeting ${new Date().toLocaleDateString()}`;
      const res = await meetingsApi.create(title);
      const newMeeting = res.data.meeting;
      toast.success("Nai meeting bana li! 🎉");
      navigate(`/meeting/${newMeeting.id}`);
    } catch (err) {
      toast.error("Meeting nahi bani!");
    } finally {
      setCreating(false);
    }
  };

  // Meeting delete karo
  const deleteMeeting = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await meetingsApi.delete(id);
      setMeetings(meetings.filter((m) => m.id !== id));
      toast.success("Meeting delete ho gayi!");
    } catch (err) {
      toast.error("Delete nahi hua!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Mic className="w-7 h-7 text-violet-400" />
          <span className="text-xl font-bold">Vocaro</span>
        </div>
        <button
          onClick={createMeeting}
          disabled={creating}
          className="flex items-center gap-2 px-5 py-2 bg-violet-600 hover:bg-violet-700 rounded-full text-sm font-medium transition-all disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          {creating ? "Creating..." : "New Meeting"}
        </button>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Meetings</h1>
          <p className="text-slate-400">
            {meetings.length} meeting{meetings.length !== 1 ? "s" : ""} total
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && meetings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 bg-violet-500/10 rounded-full flex items-center justify-center mb-6">
              <Mic className="w-10 h-10 text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Koi meeting nahi!</h2>
            <p className="text-slate-400 mb-8">Pehli meeting shuru karo</p>
            <button
              onClick={createMeeting}
              className="flex items-center gap-2 px-8 py-3 bg-violet-600 hover:bg-violet-700 rounded-full font-medium transition-all"
            >
              <Plus className="w-5 h-5" />
              New Meeting
            </button>
          </motion.div>
        )}

        {/* Meetings Grid */}
        {!loading && meetings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {meetings.map((meeting, i) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/meeting/${meeting.id}`)}
                className="p-6 bg-slate-900 border border-slate-800 hover:border-violet-500/50 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] group"
              >
                {/* Title */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center">
                    <Mic className="w-5 h-5 text-violet-400" />
                  </div>
                  <button
                    onClick={(e) => deleteMeeting(meeting.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-semibold text-lg mb-2 truncate">
                  {meeting.title}
                </h3>

                {/* Status */}
                <div className="flex items-center gap-2 mb-4">
                  {meeting.summary ? (
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                      ✅ Summary Ready
                    </span>
                  ) : meeting.transcript ? (
                    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full">
                      📝 Transcribed
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded-full">
                      🎙️ No Audio Yet
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center justify-between text-slate-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(meeting.created_at).toLocaleDateString()}
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:text-violet-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
