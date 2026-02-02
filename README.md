# AI Smart Agenda 🤖📅

A modern, AI-powered agenda application built with **Next.js 14**, **TypeScript**, and **TailwindCSS**. This project demonstrates the integration of Large Language Models (LLMs) into a practical productivity tool.

## ✨ Features

- **Natural Language Input**: Type "Lunch with Sarah tomorrow at 12:30pm" and let AI handle the parsing.
- **Smart Scheduling**: Automatically detects start/end times, titles, and descriptions.
- **Premium UI**: Built with Shadcn UI for a polished, accessible, and responsive design.
- **Modern Stack**: Server Actions, Prisma ORM, SQLite, and Vercel AI SDK.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: SQLite (via Prisma)
- **AI Integration**: Vercel AI SDK (OpenAI Provider)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed.
- An OpenAI API Key (or other Vercel AI SDK compatible provider).

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd ai-agenda-app
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="sk-..." # Your OpenAI API Key
```

### 3. Database Setup

Initialize the SQLite database:

```bash
npx prisma migrate dev --name init
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to stand witness to the efficient future of scheduling!

## 📸 Screenshots

*(Add screenshots of your "Smart Input" and "Agenda View" here)*

## 🧩 Architecture

The app uses **Server Actions** to handle the AI processing securely on the server.
1. User inputs text in `SmartInput.tsx`.
2. `parseEventFromText` action calls OpenAI to extract structured JSON.
3. Event is saved to SQLite via Prisma.
4. UI automatically refreshes to show the new event in `AgendaView.tsx`.
