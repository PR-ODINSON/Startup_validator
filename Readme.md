# 🚀 Autonomous Startup Validator (Build-an-Idea Agent)

The **Autonomous Startup Validator** is a full-stack SaaS platform that uses AI agents to evaluate startup ideas. Think of it as your instant expert panel—market analysts, investors, product managers—ready to analyze and validate your idea in just a few minutes.

---

## 🎯 Purpose

Founders spend weeks on research, planning, and validation. This tool cuts that down to minutes using AI.

- Submit your idea in plain text or PDF.
- Get a full analysis: market size, competition, MVP roadmap, pitch deck, and more.
- Ideal for hackathon teams, startup accelerators, VCs, and aspiring entrepreneurs.

---

## 🧠 Key Features (MVP)

- 📝 **Idea Submission Interface** (text, PDF, or Notion upload)
- 🤖 **Multi-Agent AI Engine** powered by LangChain
  - Research, Market, Investor, PM, Pitch, and Validation Agents
- 📊 **Auto-Generated Reports**
  - 100-point scorecard, TAM/SAM/SOM graphs, MVP roadmap, GTM plan, Pitch Deck
- 🖥️ **Clean Dashboard Interface** for founders and mentors

---

## 🏗️ Project Structure

```bash
autonomous-startup-validator/
│
├── backend/                # Node.js + Express API
│   ├── controllers/        # Logic for each route
│   ├── routes/             # API endpoints
│   ├── services/           # External APIs (Notion, Google Search)
│   ├── middleware/         # Auth, error handling
│   ├── utils/              # Utility functions
│   ├── config/             # DB/Auth/API config
│   ├── app.js              # Express setup
│   └── server.js           # Entry point
│
├── frontend/               # React + Tailwind frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main pages (Submit, Dashboard, Report)
│   │   ├── api/            # API integration
│   │   ├── assets/         # Images/icons
│   │   ├── styles/         # Tailwind and custom CSS
│   │   └── App.jsx         # Main entry
│   └── public/             # Static files
│
├── ai_agents/              # Python-based LangChain AI agents
│   ├── agents/             # Modular expert agents
│   ├── orchestrator.py     # Orchestration logic
│   ├── utils.py            # Common tools
│   └── requirements.txt    # Python dependencies
│
├── shared/                 # Shared constants and types
│   ├── constants/          # Static values (tags, scoring metrics)
│   └── types/              # Shared types/interfaces
│
├── docs/                   # PRD, API docs, diagrams
│
├── .env                    # Environment variables
├── .gitignore
├── package.json            # Node project info
├── README.md
└── docker-compose.yml      # Dev container (optional)
