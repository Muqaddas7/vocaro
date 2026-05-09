import axios from "axios";

// Backend ka address
const BASE_URL = "https://muqaddas7-vocaro-backend.hf.space";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Meetings API calls
export const meetingsApi = {
  // Sari meetings lao
  getAll: () => api.get("/meetings/"),

  // Ek meeting lao
  getOne: (id: string) => api.get(`/meetings/${id}`),

  // Nai meeting banao
  create: (title: string) => api.post(`/meetings/create?title=${title}`),

  // Meeting delete karo
  delete: (id: string) => api.delete(`/meetings/${id}`),

  // AI summary banao
  summarize: (id: string) => api.post(`/meetings/${id}/summarize`),
};

// Audio API calls
export const audioApi = {
  // Audio upload karo
  upload: (meetingId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post(`/audio/upload/${meetingId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
