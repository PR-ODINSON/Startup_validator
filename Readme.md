autonomous-startup-validator/
│
├── backend/                # Node.js + Express API
│   ├── controllers/        # Logic for each route
│   ├── routes/             # API endpoints
│   ├── services/           # External APIs (e.g., Notion, Google Search)
│   ├── middleware/         # Auth, error handling
│   ├── utils/              # Utility functions
│   ├── config/             # DB/Auth/API config
│   ├── app.js              # Express setup
│   └── server.js           # Entry point
│
├── frontend/               # React + Tailwind frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page views
│   │   ├── api/            # Frontend API calls
│   │   ├── assets/         # Images, icons
│   │   ├── styles/         # Tailwind/custom CSS
│   │   ├── utils/          # Helper functions
│   │   └── App.jsx         # Main app
│   └── public/
│
├── ai_agents/              # Python-based LangChain agents
│   ├── agents/
│   │   ├── research_agent.py
│   │   ├── market_agent.py
│   │   ├── investor_agent.py
│   │   ├── pm_agent.py
│   │   ├── pitch_agent.py
│   │   └── validation_agent.py
│   ├── orchestrator.py     # LangChain chain/flow
│   ├── utils.py            # Helper functions
│   └── requirements.txt    # Python deps
│
├── shared/                 # Common files (if needed)
│   ├── types/              # Shared types/interfaces
│   └── constants/          # Static values (tags, scoring metrics, etc.)
│
├── docs/                   # PRD, API docs, guides
│
├── .env                    # Environment variables
├── .gitignore
├── package.json            # Node project info
├── README.md
└── docker-compose.yml      # Optional: full-stack dev container
