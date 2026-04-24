// Meeting ka type — har meeting mein yeh data hoga
export interface Meeting {
  id: string;
  title: string;
  transcript: string | null;
  summary: string | null;
  action_items: string | null;
  duration: string | null;
  created_at: string;
}

// API response ka type
export interface ApiResponse<T> {
  message: string;
  data?: T;
  error?: string;
}

// Summary ka type
export interface MeetingSummary {
  summary: string;
  action_items: string[];
  decisions: string[];
  key_topics: string[];
}
