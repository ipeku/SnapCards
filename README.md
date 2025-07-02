# Flashcards App (Frontend + Backend)

A tiny yet complete **flashcards** application with a clean separation of concerns:

- **Frontend:** React + Vite (SPA)
- **Backend:** Node.js + Express + SQLite (file-backed DB)
- **Persistence:** Local SQLite file at `backend/data/app.db`
- **Dev Experience:** Vite dev **proxy** to avoid CORS

> UI copy is **English**. Theme is **navy** background with a colored action bar.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
  - [1) Start the Backend](#1-start-the-backend)
  - [2) Start the Frontend](#2-start-the-frontend)
- [Scripts](#scripts)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Production Notes](#production-notes)
- [Roadmap](#roadmap)
- [License](#license)

---

## Features
- Create flashcards (`term → definition`)
- Click a card to **flip** (client-side only)
- **Search** (client-side)
- **Shuffle** / Ordered view (client-side)
- **Delete** cards
- Data is **persistent** via SQLite file

---

## Tech Stack
- **Frontend:** React 18, Vite, plain CSS
- **Backend:** Node 20 LTS, Express, better-sqlite3, cors, morgan
- **Database:** SQLite (no external service required)

---

## Project Structure
flashcard_app/
├─ README.md
├─ .gitignore
├─ backend/
│ ├─ package.json
│ ├─ src/
│ │ ├─ server.js # Express app + /api mount
│ │ ├─ routes.js # /api/cards CRUD
│ │ └─ db.js # SQLite init (creates cards table)
│ └─ data/
│ └─ app.db # created automatically on first run (ignored by git)
└─ frontend/
├─ package.json
├─ vite.config.js # dev proxy: /api → http://localhost:4000

├─ index.html
└─ src/
├─ main.jsx
├─ App.jsx
└─ styles.css



---

## Requirements
- **Node.js:** Recommended **LTS (v20)**
  - On Windows, Node 22 can require C++ build tools for `better-sqlite3`. Node 20 ships prebuilt binaries.
- **npm** (comes with Node)
- OS: Windows / macOS / Linux

Check:
```bash
node -v
npm -v
```
