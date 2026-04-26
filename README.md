# 🎙️ Vocaro — AI Meeting Intelligence Platform

> Every Word. Every Action. Every Outcome.

Vocaro is a full-stack AI-powered meeting intelligence platform that converts audio recordings into actionable insights using Speech Recognition and Large Language Models.

## ✨ Features

- 🎙️ **Audio Transcription** — Upload meeting audio, get instant text using OpenAI Whisper
- 🤖 **AI Summary** — Groq LLaMA generates concise meeting summaries
- ✅ **Action Items** — Automatically extracts tasks and action items
- 📊 **Key Topics** — Identifies main discussion points
- 🗂️ **Meeting History** — All meetings stored and searchable

## 🛠️ Tech Stack

### Frontend

- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- React Router

### Backend

- FastAPI (Python)
- SQLite + SQLAlchemy
- OpenAI Whisper (Speech-to-Text)
- Groq LLaMA (AI Summary)

## 🚀 Getting Started

### Backend

```bash
cd vocaro-backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd vocaro-frontend
npm install
npm run dev
```

## 📁 Project Structure

vocaro/
├── vocaro-backend/
│ ├── main.py
│ ├── models/
│ ├── routers/
│ └── services/
└── vocaro-frontend/
└── src/
├── pages/
├── components/
└── utils/

## 👩‍💻 Built By

Muqaddas — AI Engineer | BS Artificial Intelligence
