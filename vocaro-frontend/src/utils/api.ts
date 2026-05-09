import axios from "axios";

const BASE_URL = "https://muqaddas7-vocaro-backend.hf.space";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const meetingsApi = {
  getAll: () => api.get("/meetings/"),
  getOne: (id: string) => api.get(`/meetings/${id}`),
  create: (title: string) => api.post(`/meetings/create?title=${title}`),
  delete: (id: string) => api.delete(`/meetings/${id}`),
  summarize: (id: string) => api.post(`/meetings/${id}/summarize`),
};

export const audioApi = {
  upload: (meetingId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post(`/audio/upload/${meetingId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
