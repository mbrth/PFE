
# 🌿 EcoOrient — Green E-Learning Platform

EcoOrient is a high-end, low-carbon educational platform designed to train the next generation of responsible developers. It features a real-time carbon impact engine, a sovereign cloud catalog, and a context-aware AI Mentor.

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js** (v18+)
- **Docker Desktop** (for PostgreSQL)
- **Groq API Key** (Free on [Groq Cloud](https://console.groq.com/))

### 2. Setup Database
Run the following command to start your local PostgreSQL instance:
```bash
docker run --name dev-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -v pgdata:/var/lib/postgresql/data -d postgres:latest
```

### 3. Environment Variables
1. Create a `.env` file at the root:
   ```env
   VITE_API_URL=/api
   VITE_API_PROXY=/api/gemini
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecoorient?schema=public"
   ```
2. Create a `server/.env` file:
   ```env
   PORT=3001
   JWT_SECRET=generate_any_long_string
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecoorient?schema=public"
   GROQ_API_KEY=your_key_here
   ```

### 4. Install & Launch
```bash
# Install root dependencies
npm install

# Initialize Database Schema & Seed Data
npx prisma db push
node server/prisma/seed.js

# Launch Frontend & Backend simultaneously
npm run dev:all
```

## 🏗️ Architecture
- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **Backend**: Node.js Express (TypeScript)
- **ORM**: Prisma
- **Database**: PostgreSQL
- **AI**: Groq LPU (Llama 3.1 8B) for ultra-fast, low-carbon inference

## 🍃 Key Features
- **Carbon Tracking**: Real-time calculation of grams of CO2e saved vs standard platforms.
- **Sovereign Curriculum**: Training modules focused on European cloud and ethical tech.
- **Contextual AI**: A mentor that knows exactly which lesson you are reading.
- **Storytelling UX**: A "Notion-like" immersive reading experience.
