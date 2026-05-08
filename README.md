---
title: Vocaro Backend
emoji: 🎙️
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
---

# VOCARO — AI Meeting Intelligence Platform

> Stop Taking Notes. Start Taking Action.

VOCARO is a full-stack AI-powered meeting intelligence platform that converts audio recordings into structured summaries, action items, and key decisions using Speech Recognition and Large Language Models.

---

## Architecture

Audio Input
│
▼
┌─────────────────────────────────────────────────────┐
│ React Frontend │
│ Landing Page / Dashboard / Meeting View │
└─────────────────────┬───────────────────────────────┘
│ HTTP / REST API
▼
┌─────────────────────────────────────────────────────┐
│ FastAPI Backend │
│ │
│ ┌─────────────┐ ┌──────────────────────┐ │
│ │ Whisper │ │ Groq LLaMA 3 │ │
│ │ (STT) │───────▶│ (Summarization) │ │
│ └─────────────┘ └──────────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ ┌──────────────────────────────────────────────┐ │
│ │ SQLite Database │ │
│ │ Meetings / Transcripts / Summaries │ │
│ └──────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘

---

## Features

- **Voice Transcription** — Upload any meeting audio. Whisper AI transcribes speech to text with high accuracy.
- **AI Intelligence** — Groq LLaMA 3 analyzes transcripts and generates structured summaries.
- **Action Extraction** — Every task, commitment, and decision is automatically identified.
- **Key Topics** — Main discussion points are categorized and displayed.
- **Meeting History** — All sessions are stored and accessible from the dashboard.

---

## Tech Stack

**Frontend**

- React 18 + TypeScript
- Tailwind CSS + Framer Motion
- React Router + Zustand

**Backend**

- FastAPI (Python)
- SQLite + SQLAlchemy
- OpenAI Whisper — Speech to Text
- Groq LLaMA 3 — AI Summarization

---

## Getting Started

**Backend**

```bash
cd vocaro-backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend**

```bash
cd vocaro-frontend
npm install
npm run dev
```

---

## Project Structure

vocaro/
├── vocaro-backend/
│ ├── main.py
│ ├── models/
│ │ └── database.py
│ ├── routers/
│ │ ├── meetings.py
│ │ └── audio.py
│ └── services/
│ ├── audio_service.py
│ └── ai_service.py
└── vocaro-frontend/
└── src/
├── pages/
│ ├── LandingPage.tsx
│ ├── Dashboard.tsx
│ └── MeetingPage.tsx
├── utils/
│ └── api.ts
└── types/
└── index.ts

---

## Built By

**Muqaddas** — AI Engineer | BS Artificial Intelligence
