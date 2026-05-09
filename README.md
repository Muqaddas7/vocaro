# Vocaro — AI Meeting Intelligence Platform

> Stop Taking Notes. Start Taking Action.

Vocaro is a full-stack AI-powered meeting intelligence platform that converts audio recordings into structured summaries, action items, and key decisions using Speech Recognition and Large Language Models.

---

## Live Links

|          | Link                                                                                     |
| -------- | ---------------------------------------------------------------------------------------- |
| Live App | [vocaro.vercel.app](https://vocaro.vercel.app)                                           |
| API Docs | [muqaddas7-vocaro-backend.hf.space/docs](https://muqaddas7-vocaro-backend.hf.space/docs) |
| GitHub   | [github.com/Muqaddas7/vocaro](https://github.com/Muqaddas7/vocaro)                       |

---

## Features

- Upload any meeting audio — Whisper AI transcribes speech to text with high accuracy
- Groq LLaMA 3 analyzes transcripts and generates structured summaries
- Every task, commitment, and decision is automatically identified
- Main discussion points are categorized and displayed
- All sessions are stored and accessible from the dashboard

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
- Docker — Containerization

---

## Architecture

```text
Audio Input
     │
     ▼
┌─────────────────────────────────┐
│         React Frontend          │
│  Landing / Dashboard / Meeting  │
└────────────────┬────────────────┘
                 │ HTTP / REST API
                 ▼
┌─────────────────────────────────┐
│         FastAPI Backend         │
│                                 │
│  ┌─────────┐   ┌─────────────┐  │
│  │ Whisper │──▶│ Groq LLaMA3 │  │
│  │  (STT)  │   │  (Summary)  │  │
│  └─────────┘   └─────────────┘  │
│           │                     │
│           ▼                     │
│    ┌─────────────┐              │
│    │   SQLite    │              │
│    │  Database   │              │
│    └─────────────┘              │
└─────────────────────────────────┘
```

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

```text
vocaro/
├── vocaro-backend/
│   ├── main.py
│   ├── models/
│   ├── routers/
│   └── services/
└── vocaro-frontend/
    └── src/
        ├── pages/
        ├── utils/
        └── types/
```

---

## Built By

**Muqaddas** — AI Engineer | BS Artificial Intelligence
